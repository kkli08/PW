import {
    DEFAULT_HERO_MANIFEST,
    getRotationIndex,
    getTimeUntilNextRotation,
    normalizeHeroManifest,
    selectMp4Source,
} from './heroVideo';

const HOUR_MS = 60 * 60 * 1000;

describe('hero video strategy', () => {
    test('cycles through all eight videos in consecutive six-hour buckets', () => {
        const indices = Array.from(
            { length: 9 },
            (_, index) => getRotationIndex(index * 6 * HOUR_MS, 8, 6),
        );

        expect(indices).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 0]);
    });

    test('schedules the next update at the next rotation boundary', () => {
        expect(getTimeUntilNextRotation((6 * HOUR_MS) + 1000, 6)).toBe((6 * HOUR_MS) - 1000);
    });

    test('keeps the safe local fallback for an invalid manifest', () => {
        expect(normalizeHeroManifest({ videos: [] })).toBe(DEFAULT_HERO_MANIFEST);
    });

    test('allows a fast high-density phone to select a 4K fallback', () => {
        const source = selectMp4Source({
            mp4: [
                { src: '/720.mp4', width: 1280, bitrate: 3000000, label: '720p' },
                { src: '/1080.mp4', width: 1920, bitrate: 6000000, label: '1080p' },
                { src: '/4k.mp4', width: 3840, bitrate: 18000000, label: '4k' },
            ],
        }, {
            viewportWidth: 430,
            viewportHeight: 932,
            devicePixelRatio: 3,
            connection: { effectiveType: '4g', downlink: 50 },
        });

        expect(source.label).toBe('4k');
    });

    test('uses the smallest fallback when data saving is requested', () => {
        const source = selectMp4Source({
            mp4: [
                { src: '/720.mp4', width: 1280, label: '720p' },
                { src: '/4k.mp4', width: 3840, label: '4k' },
            ],
        }, {
            viewportWidth: 430,
            viewportHeight: 932,
            devicePixelRatio: 3,
            connection: { saveData: true, effectiveType: '4g', downlink: 50 },
        });

        expect(source.label).toBe('720p');
    });
});
