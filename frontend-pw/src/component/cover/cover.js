import React, { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../../firebase';
import './cover.css';

const REDUCED_DATA_CONNECTIONS = new Set(['slow-2g', '2g']);

function Cover() {
    const [viewCount, setViewCount] = useState(0);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
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
            style={{ '--hero-poster': 'url("/media/hero-poster.jpg")' }}
        >
            {shouldLoadVideo && (
                <video
                    className={`cover-video ${videoReady ? 'is-ready' : ''}`}
                    autoPlay
                    loop
                    playsInline
                    muted
                    poster="/media/hero-poster.jpg"
                    preload="metadata"
                    onLoadedData={() => setVideoReady(true)}
                    aria-hidden="true"
                >
                    <source src="/media/hero-mobile.mp4" media="(max-width: 780px)" type="video/mp4" />
                    <source src="/media/hero-desktop.mp4" type="video/mp4" />
                </video>
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
