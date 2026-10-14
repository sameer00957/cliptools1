# ClipTools — browser-based video utilities

A static website that runs without a server-side build step. Upload/select a video from your own device and use these browser-side tools:

- Preview and download the original selected file.
- Export a selected section as a WebM clip using MediaRecorder (real-time playback; browser support varies).
- Capture the current video frame as a PNG thumbnail.
- Create a short GIF using gif.js loaded from a public CDN.

## Publish updates to your existing Cloudflare Pages site
1. Open your existing GitHub repository (`cliptools1`).
2. Replace the existing `index.html` and add/replace `style.css`, `app.js`, and `README.md` at the repository root.
3. Commit the changes to the `main` branch.
4. Cloudflare Pages should start a new deployment automatically. Wait until it says **Ready** and open **Visit site**.

No framework, build command, or server is required for this static site. If Cloudflare asks for an output directory, use `.` for the repository root.

## Important limitations
- Trim export records playback in real time and saves WebM; it is not a frame-accurate professional editor. Audio capture depends on browser support and can fail in some environments.
- GIF export uses a third-party CDN library and can be slow or memory-intensive, especially on phones. Try a short clip.
- Browser codec support varies. If a video cannot play, try an MP4 encoded with H.264 or a WebM file.
- The page does not upload selected videos to a ClipTools server. The GIF encoder script and its worker are loaded from cdnjs.
- This project does not download videos from third-party platforms or remove watermarks. Only process content you own or have permission to use.
- Before advertising/promoting the site, update the example contact email and add suitable Privacy Policy, Terms, and About pages. Monetization is not guaranteed; it depends on traffic, content quality, and advertising-network approval.
