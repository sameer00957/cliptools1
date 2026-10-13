# ClipTools starter website

A free, static website prototype for browser-based tools for videos the user owns or has permission to use.

## Included
- Responsive dark-blue landing page
- Local video file preview and download of the original selected file
- Trim-section preview (does not export a new trimmed file)
- Capture current video frame and download PNG thumbnail
- Video-to-GIF placeholder explaining that conversion is not implemented yet

## Run locally
Open `index.html` in a modern browser. No build step is required.

## Publish for free with GitHub + Cloudflare Pages
1. Create a GitHub account and a new public repository named `cliptools`.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md` to the repository root.
3. Create/sign in to a Cloudflare account and open Pages.
4. Choose to connect to Git, select the `cliptools` repository, and configure it as a static site. No build command is needed; set the output directory to `/` if the setup asks for one.
5. Deploy. Cloudflare will provide a `*.pages.dev` address.
6. Test on your phone and computer.

## Before publishing
- Replace the example `hello@example.com` contact address.
- Add real privacy policy, terms, and contact details suitable for your site.
- Check platform and copyright terms; do not promise downloading content from third-party services unless permitted.
- This static starter does not include server uploads, third-party platform downloading, watermark removal, trimmed-video export, or GIF encoding.
- Free tiers and dashboard labels can change; verify current hosting limits and terms.
- Ad revenue is not automatic. Add useful original content and apply to ad networks only when eligible.
