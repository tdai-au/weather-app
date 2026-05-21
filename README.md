# WEATHERLY

A minimalist static weather app built with HTML, CSS, and vanilla JavaScript.

## Features

- Search weather by city and country code
- Displays temperature, conditions, humidity, and wind speed
- Uses OpenWeatherMap Current Weather API
- Responsive layout suitable for mobile, tablet, and desktop
- Clean, modern UI with soft shadows and rounded corners

## Setup

1. Add your OpenWeatherMap API key in `script.js`:
   ```js
   const API_KEY = "YOUR_API_KEY_HERE";
   ```
2. Open `index.html` in a browser or deploy the folder to GitHub Pages.

## API key guidance

Because GitHub Pages is a static host, the API key will be visible in the client-side code.
Use a free-tier key and apply domain restrictions if possible. Do not commit a production key to the repository.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. In the repository settings, enable GitHub Pages from the `main` branch.
3. Set the site source to the repository root.
4. Visit the provided `github.io` URL to see WEATHERLY live.

## Notes

- This app is front-end only and has no server-side secrets.
- If you want to keep keys out of version control, use a local build step or proxy service outside of GitHub Pages.
