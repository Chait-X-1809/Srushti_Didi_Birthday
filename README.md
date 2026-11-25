# Happy Birthday, Srushti Didi! ❤️

A personal birthday website created with love by Sudhanshu for his beloved sister, V. Srushti.

This is a dependency-free static site designed to feel like a digital birthday gift: elegant pink styling, a heartfelt letter, Polaroid photo memories, sibling compliments, birthday wishes, and an interactive celebration surprise.

## Features

- Responsive, mobile-first pink birthday experience
- Animated hero with floating hearts, petals, and butterflies
- Heartfelt birthday letter from Sudhanshu
- Four-photo Polaroid memory gallery using the original photographs
- Accessible lightbox with previous/next navigation, keyboard controls, backdrop close, and focus return
- Cards for the qualities that make Srushti special
- Birthday wishes section
- Replayable surprise with hidden message, animated cake, floating hearts, and confetti
- Smooth scrolling, section reveals, and gentle hover interactions
- Full support for `prefers-reduced-motion`
- No build step, dependencies, backend, APIs, or external services
- GitHub Pages-compatible relative asset paths

## Technology used

- HTML5
- CSS3
- Vanilla JavaScript
- No frameworks or packages

## Folder structure

```text
Srushti-Birthday/
├── index.html
├── styles.css
├── script.js
├── README.md
└── Images/
    ├── Srushti-Didi_1.jpeg
    ├── Srushti-Didi_2.jpeg
    ├── Srushti-Didi_3.jpeg
    └── Srushti-Didi_4.jpeg
```

The `Images/` directory name and all photograph filenames are intentionally preserved exactly as supplied. On GitHub Pages and other Linux-based hosts, paths are case-sensitive.

## Run locally

From the project root, start a simple local server:

```powershell
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

You can also open `index.html` directly in a browser, but a local server is recommended because it behaves most like GitHub Pages.

No installation or build command is required.

## Publish to GitHub Pages

1. Create a new GitHub repository for this project.
2. In the project root, initialize Git if you have not already:

   ```powershell
   git init
   git add .
   git commit -m "Add Srushti Didi birthday website"
   ```

3. Create the repository on GitHub, then connect and push it:

   ```powershell
   git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
   git branch -M main
   git push -u origin main
   ```

4. On GitHub, open the repository and go to **Settings > Pages**.
5. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
6. Save the settings.
7. Wait a few moments for GitHub Pages to publish.

## Access the deployed website

If the repository is named `Srushti-Birthday`, the website will usually be available at:

```text
https://USERNAME.github.io/Srushti-Birthday/
```

For a user/site repository named `USERNAME.github.io`, the website will be available at:

```text
https://USERNAME.github.io/
```

All local assets use relative paths such as `./styles.css`, `./script.js`, and `./Images/Srushti-Didi_1.jpeg`, so the site works from either a root URL or a GitHub Pages project subdirectory.

## Notes

- The original photographs are referenced directly and are not renamed, replaced, or modified.
- `.gitignore` is intentionally omitted because this project has no dependencies, build output, or generated files.
- No GitHub Actions workflow is needed because the site can be published directly from the `main` branch root.

Made with love by Sudhanshu. Happy Birthday, Didi! ❤️
