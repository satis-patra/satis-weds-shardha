# Satis & Shardha — Wedding Invitation

A mobile-first, static wedding invitation website built with HTML, CSS and vanilla JavaScript. It is ready to deploy with GitHub Pages.

## Preview locally
Open `index.html` in a browser, or run a local server from this folder:

```bash
python3 -m http.server 8000
```
Then visit http://localhost:8000.

## Deploy to GitHub Pages
1. Create a new GitHub repository (for example, `satis-shardha-wedding`).
2. Upload the contents of this folder to the repository root (keep `index.html`, `style.css`, `script.js`, and `assets/` together).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. GitHub will publish the site and show its public URL in the Pages settings.

## Editing the invitation
- Names, family names, event dates, timings and venue are in `index.html`.
- Colours, typography, spacing and responsive layout are in `style.css`.
- Countdown target is in `script.js` (`weddingDate`).
- Replace photographs inside `assets/` while keeping the same filenames, or update the image paths in `index.html` and `style.css`.

## Details currently used
- Satis — son of Mr. Pramod Ku. Patra & Mamata Patra
- Shardha — daughter of Mr. Subhash Sahu & Sarika Sahu
- Haldi & Carnival — 9 February 2027, 11:00 AM onwards (Lavender dress code)
- Sangeet — 9 February 2027, 7:00 PM onwards
- Marriage Ceremony — 10 February 2027, 12:30 PM onwards
- Reception — 10 February 2027, 7:30 PM onwards
- Venue — Steel Club, Sector 9, Rourkela, Odisha, India

The venue links open a Google Maps search for the supplied venue name. Please verify the exact map pin before sharing widely.
