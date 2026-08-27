import React, { useEffect, useMemo, useRef, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../../firebase';
import './cover.css';
import {
    DEFAULT_HERO_MANIFEST,
    getRotationIndex,
    getTimeUntilNextRotation,
    normalizeHeroManifest,
    selectMp4Source,
} from './heroVideo';

const REDUCED_DATA_CONNECTIONS = new Set(['slow-2g', '2g']);
const HLS_MIME_TYPE = 'application/vnd.apple.mpegurl';

const getConnection = () => (
    navigator.connection || navigator.mozConnection || navigator.webkitConnection || {}
);

const getManifestUrl = () => (
    process.env.REACT_APP_HERO_MANIFEST_URL
    || `${process.env.PUBLIC_URL || ''}/media/hero-manifest.json`
);

function Cover() {
    const [viewCount, setViewCount] = useState(0);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const [manifest, setManifest] = useState(null);
    const [rotationTime, setRotationTime] = useState(() => Date.now());
    const [playbackMode, setPlaybackMode] = useState('poster');
    const videoRef = useRef(null);

    const activeVideo = useMemo(() => {
        if (!manifest?.videos?.length) {
            return null;
        }

        const index = getRotationIndex(
            rotationTime,
            manifest.videos.length,
            manifest.rotationHours,
        );
        return manifest.videos[index];
    }, [manifest, rotationTime]);

    const fallbackSource = useMemo(() => {
        if (!activeVideo) {
            return null;
        }

        return selectMp4Source(activeVideo, {
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio,
            connection: getConnection(),
        });
    }, [activeVideo]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const connection = getConnection();
        const shouldSaveData = connection?.saveData || REDUCED_DATA_CONNECTIONS.has(connection?.effectiveType);

        if (prefersReducedMotion || shouldSaveData) {
            return undefined;
        }

        let idleCallback;
        let fallbackTimer;

        const beginLoading = () => {
            if ('requestIdleCallback' in window) {
                idleCallback = window.requestIdleCallback(() => setShouldLoadVideo(true), { timeout: 1200 });
            } else {
                fallbackTimer = window.setTimeout(() => setShouldLoadVideo(true), 250);
            }
        };

        if (document.readyState === 'complete') {
            beginLoading();
        } else {
            window.addEventListener('load', beginLoading, { once: true });
        }

        return () => {
            window.removeEventListener('load', beginLoading);
            if (idleCallback) {
                window.cancelIdleCallback(idleCallback);
            }
            if (fallbackTimer) {
                window.clearTimeout(fallbackTimer);
            }
        };
    }, []);

    useEffect(() => {
        if (!shouldLoadVideo) {
            return undefined;
        }

        const controller = new AbortController();

        fetch(getManifestUrl(), {
            cache: 'no-cache',
            signal: controller.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Hero manifest request failed with ${response.status}.`);
                }
                return response.json();
            })
            .then((nextManifest) => setManifest(normalizeHeroManifest(nextManifest)))
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.warn('Unable to load the hero video manifest; using local fallback.', error);
                    setManifest(DEFAULT_HERO_MANIFEST);
                }
            });

        return () => controller.abort();
    }, [shouldLoadVideo]);

    useEffect(() => {
        if (!manifest?.videos?.length) {
            return undefined;
        }

        const delay = getTimeUntilNextRotation(Date.now(), manifest.rotationHours);
        const timer = window.setTimeout(() => setRotationTime(Date.now()), delay + 50);
        return () => window.clearTimeout(timer);
    }, [manifest, rotationTime]);

    useEffect(() => {
        const video = videoRef.current;

        if (!video || !shouldLoadVideo || !activeVideo || !fallbackSource) {
            return undefined;
        }

        let disposed = false;
        let hlsInstance = null;
        let usingFallback = false;

        const attemptPlay = () => {
            const playRequest = video.play();
            if (playRequest?.catch) {
                playRequest.catch(() => {
                    // Muted autoplay can still be blocked; the poster remains visible.
                });
            }
        };

        const loadFallback = () => {
            if (disposed) {
                return;
            }

            usingFallback = true;
            setPlaybackMode(`mp4-${fallbackSource.label}`);
            video.src = fallbackSource.src;
            video.load();
            attemptPlay();
        };

        const handleLoadedData = () => setVideoReady(true);
        const handleVideoError = () => {
            if (!usingFallback) {
                hlsInstance?.destroy();
                hlsInstance = null;
                loadFallback();
                return;
            }

            setVideoReady(false);
            setPlaybackMode('poster');
        };

        setVideoReady(false);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleVideoError);

        if (!activeVideo.hls) {
            loadFallback();
        } else if (video.canPlayType(HLS_MIME_TYPE)) {
            setPlaybackMode('hls-native');
            video.src = activeVideo.hls;
            video.load();
            attemptPlay();
        } else {
            import('hls.js')
                .then(({ default: Hls }) => {
                    if (disposed || !Hls.isSupported()) {
                        loadFallback();
                        return;
                    }

                    hlsInstance = new Hls({
                        enableWorker: true,
                        startLevel: -1,
                        capLevelToPlayerSize: false,
                        maxBufferLength: 30,
                        backBufferLength: 30,
                    });
                    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
                        setPlaybackMode('hls-adaptive');
                        attemptPlay();
                    });
                    hlsInstance.on(Hls.Events.ERROR, (_event, data) => {
                        if (data.fatal) {
                            hlsInstance?.destroy();
                            hlsInstance = null;
                            loadFallback();
                        }
                    });
                    hlsInstance.loadSource(activeVideo.hls);
                    hlsInstance.attachMedia(video);
                })
                .catch(loadFallback);
        }

        return () => {
            disposed = true;
            hlsInstance?.destroy();
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleVideoError);
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, [activeVideo, fallbackSource, shouldLoadVideo]);

    useEffect(() => {
        const fetchViewCount = async () => {
            try {
                const snapshot = await get(ref(database, 'viewCount'));
                if (snapshot.exists()) {
                    setViewCount(snapshot.val());
                }
            } catch (error) {
                // The counter is decorative; the hero remains usable if Firebase is unavailable.
                console.warn('Unable to load view count.', error);
            }
        };

        fetchViewCount();
    }, []);

    return (
        <section
            className="cover"
            aria-labelledby="cover-quote"
            style={{
                '--hero-poster': `url("${activeVideo?.poster || DEFAULT_HERO_MANIFEST.videos[0].poster}")`,
            }}
        >
            {shouldLoadVideo && activeVideo && (
                <video
                    ref={videoRef}
                    className={`cover-video ${videoReady ? 'is-ready' : ''}`}
                    autoPlay
                    loop
                    playsInline
                    muted
                    crossOrigin="anonymous"
                    poster={activeVideo.poster}
                    preload="metadata"
                    data-hero-video={activeVideo.id}
                    data-playback-mode={playbackMode}
                    data-selected-width={fallbackSource?.width || ''}
                    aria-hidden="true"
                />
            )}

            <div className="cover-overlay" aria-hidden="true" />

            <blockquote className="cover-text">
                <h1 id="cover-quote">“In matters of principle, stand like a rock.”</h1>
                <footer>— Thomas Jefferson</footer>
            </blockquote>

            <div className="viewCounterCover" aria-label={`${viewCount.toLocaleString()} views`}>
                <span aria-hidden="true">◉</span> {viewCount.toLocaleString()} views
            </div>
        </section>
    );
}

export default Cover;
