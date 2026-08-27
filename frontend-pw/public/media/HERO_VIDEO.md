# Hero video manifest

`hero-manifest.json` is loaded at runtime after the page becomes idle. The site
continues to use the poster when reduced motion or reduced data is requested.

Add one entry to `videos` for every rotating background. Entries rotate in
six-hour time buckets, so an eight-entry manifest uses every video over two days.

Each entry accepts:

- `id`: stable identifier used for diagnostics.
- `poster`: lightweight image displayed immediately.
- `hls`: optional HLS master-playlist URL. Native HLS is preferred; other
  supported browsers lazy-load `hls.js` only when this value is present.
- `mp4`: ordered fallback renditions with `src`, pixel `width`, optional
  `bitrate` in bits per second, and a human-readable `label`.

HLS adaptive bitrate selection is not capped by the CSS player size, allowing a
fast high-density phone to reach a 4K rendition when the player and device can
decode it. Configure CORS on a future CDN origin for the website domain.
