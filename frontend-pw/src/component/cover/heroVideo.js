export const DEFAULT_ROTATION_HOURS = 6;

const HOUR_MS = 60 * 60 * 1000;
const REDUCED_DATA_CONNECTIONS = new Set(['slow-2g', '2g', '3g']);

export const DEFAULT_HERO_MANIFEST = {
    rotationHours: DEFAULT_ROTATION_HOURS,
    videos: [
        {
            id: 'local-fallback',
            poster: '/media/hero-poster.jpg',
            hls: null,
            mp4: [
                {
                    src: '/media/hero-mobile.mp4',
                    width: 480,
                    label: 'compact',
                },
                {
                    src: '/media/hero-desktop.mp4',
                    width: 640,
                    label: 'standard',
                },
            ],
        },
    ],
};

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const normalizeMp4Source = (source) => {
    if (!source || !isNonEmptyString(source.src)) {
        return null;
    }

    const width = Number(source.width);
    const bitrate = Number(source.bitrate);

    return {
        src: source.src.trim(),
        width: Number.isFinite(width) && width > 0 ? width : null,
        bitrate: Number.isFinite(bitrate) && bitrate > 0 ? bitrate : null,
        label: isNonEmptyString(source.label) ? source.label.trim() : 'mp4',
    };
};

const normalizeVideo = (video, index) => {
    if (!video || !Array.isArray(video.mp4)) {
        return null;
    }

    const mp4 = video.mp4.map(normalizeMp4Source).filter(Boolean);
    const hls = isNonEmptyString(video.hls) ? video.hls.trim() : null;

    if (!hls && mp4.length === 0) {
        return null;
    }

    return {
        id: isNonEmptyString(video.id) ? video.id.trim() : `hero-video-${index + 1}`,
        poster: isNonEmptyString(video.poster)
            ? video.poster.trim()
            : DEFAULT_HERO_MANIFEST.videos[0].poster,
        hls,
        mp4,
    };
};

export function normalizeHeroManifest(manifest) {
    const rotationHours = Number(manifest?.rotationHours);
    const videos = Array.isArray(manifest?.videos)
        ? manifest.videos.map(normalizeVideo).filter(Boolean)
        : [];

    if (videos.length === 0) {
        return DEFAULT_HERO_MANIFEST;
    }

    return {
        rotationHours: Number.isFinite(rotationHours) && rotationHours > 0
            ? rotationHours
            : DEFAULT_ROTATION_HOURS,
        videos,
    };
}

export function getRotationIntervalMs(rotationHours = DEFAULT_ROTATION_HOURS) {
    const hours = Number(rotationHours);
    return (Number.isFinite(hours) && hours > 0 ? hours : DEFAULT_ROTATION_HOURS) * HOUR_MS;
}

export function getRotationIndex(nowMs, videoCount, rotationHours = DEFAULT_ROTATION_HOURS) {
    if (!Number.isInteger(videoCount) || videoCount <= 0) {
        return 0;
    }

    const intervalMs = getRotationIntervalMs(rotationHours);
    const bucket = Math.floor(Number(nowMs) / intervalMs);
    return ((bucket % videoCount) + videoCount) % videoCount;
}

export function getTimeUntilNextRotation(nowMs, rotationHours = DEFAULT_ROTATION_HOURS) {
    const intervalMs = getRotationIntervalMs(rotationHours);
    const elapsed = ((Number(nowMs) % intervalMs) + intervalMs) % intervalMs;
    return intervalMs - elapsed;
}

export function selectMp4Source(video, environment = {}) {
    const sources = Array.isArray(video?.mp4)
        ? video.mp4.filter((source) => isNonEmptyString(source?.src))
        : [];

    if (sources.length === 0) {
        return null;
    }

    const ordered = [...sources].sort((left, right) => {
        const leftWidth = Number.isFinite(left.width) ? left.width : 0;
        const rightWidth = Number.isFinite(right.width) ? right.width : 0;
        return leftWidth - rightWidth;
    });
    const connection = environment.connection || {};

    if (connection.saveData || REDUCED_DATA_CONNECTIONS.has(connection.effectiveType)) {
        return ordered[0];
    }

    const viewportWidth = Number(environment.viewportWidth) || 1;
    const viewportHeight = Number(environment.viewportHeight) || 1;
    const pixelRatio = Math.min(Math.max(Number(environment.devicePixelRatio) || 1, 1), 3);
    const targetWidth = Math.min(3840, Math.ceil(Math.max(viewportWidth, viewportHeight) * pixelRatio));
    const downlinkMbps = Number(connection.downlink);
    const bandwidthBudget = Number.isFinite(downlinkMbps) && downlinkMbps > 0
        ? downlinkMbps * 1000000 * 0.65
        : Number.POSITIVE_INFINITY;
    const bandwidthEligible = ordered.filter((source) => (
        !Number.isFinite(source.bitrate) || source.bitrate <= bandwidthBudget
    ));
    const candidates = bandwidthEligible.length > 0 ? bandwidthEligible : [ordered[0]];

    return candidates.find((source) => Number.isFinite(source.width) && source.width >= targetWidth)
        || candidates[candidates.length - 1];
}
