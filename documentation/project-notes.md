This project follows a Front End Masters Workshop# [Progressive Web Applications and Offline by Mike North and Steve Kinney](https://frontendmasters.com/courses/progressive-web-apps/)

- [github](https://github.com/mike-works/pwa-fundamentals)

- [slides](https://github.com/mike-works/pwa-fundamentals/blob/master/docs/Slides.pdf)

- [course website](https://mike.works/course/progressive-web-fundamentals-0d74af5)

## Enable gzip

> I forgot to add this to `create-react-app-express-teamplate`

- [Getting Started with Compression in Node.js | DigitalOcean](https://www.digitalocean.com/community/tutorials/nodejs-compression)

First, you’ll need to install the npm package for compression:

```
npm i compression --save
```

Update `src/server/index.js`

```
const express = require("express");
const compression = require("compression");

const app = express();
app.use(compression());
```

## Establish a Baseline

### Step 1. Add analyze script

- [Analyzing the Bundle Size](https://create-react-app.dev/docs/analyzing-the-bundle-size/)

```
  npm install source-map-explorer --save-dev
```

```
    "analyze": "source-map-explorer 'build/static/js/*.js'",
```

Run analyze script

`npm run analyze`

Bundle: [combined] (137.44 KB)

### Step 2. Serve https

`ngrok http -bind-tls=true localhost:8080`

### Step 4. Audit Application with Lighthouse

Run Lighthouse Audit and get score:

- 77 Performance
- 93 Accessibility
- 93 Best Practices
- 100 SEO
- ? Progressive Web App

Performance:

- Speed Index 6.1s
- First Contentful Paint 2.9s
- First Meaningful Paint 2.9s

Accessibility

- The page does not contain a heading, skip link, or landmark region

Best Practices:

- Does not use HTTP/2 for all of its resources

Progressive Web App:

- Current page does not respond with a 200 when offline
- Does not register a service worker that controls page and start_url
- Redirects HTTP traffic to HTTPS Error!
- Contains some content when JavaScript is not available Error!

Suggestions:

- Performance: Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes.
- Accessibility: Adding ways to bypass repetitive content lets keyboard users navigate the page more efficiently
- Best Practices: HTTP/2 offers many benefits over HTTP/1.1, including binary headers, multiplexing, and server push.
- Progressive Web App: If you're building a Progressive Web App, consider using a service worker so that your app can work offline.
- Progressive Web App: A service worker enables your web app to be reliable in unpredictable network conditions.
- Progressive Web App: The service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications.
- Progressive Web App: If you've already set up HTTPS, make sure that you redirect all HTTP traffic to HTTPS in order to enable secure web features for all your users.
- Progressive Web App: Your app should display some content when JavaScript is disabled, even if it's just a warning to the user that JavaScript is required to use the app. Learn more.

### Simulate Mobile

open network tab in Chrome and select target device: iPad Pro (note: iPod is not an option)

TODO: iOS Simulator connected to Safari dev tools
TODO: Android Simulator
TODO: Enable HTTP/2

- [Optimize Your App with HTTP/2 Server Push Using Node and Express | webapplog [tech blog]](https://webapplog.com/http2-server-push-node-express/)

## Progressive Metadata

### Viewport

index.html should contain:

`<meta name="viewport" content="width=device-width, initial-scale=1" />`

If you want to mimic a good native experience you may want to use `<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />`

> you cannot open the Twitter native app and zoom in on the logo.

### Customize Apple Mobile experience

Full Screen:

> App will launch without the address bar

`index.html` should contain:

```
<meta name="apple-mobile-web-app-capable" content="yes">
```

Black Status Bar:

> You can choose white or black for status bar

`index.html` should contain:

````
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

Home Screen Title

> Text, up to 16 characters under the Home Screen icon

`index.html` should contain:

```
<meta name="apple-mobile-web-app-title" content="PWA">
```
````

## manifest.json

`manifest.jon` from `crate-react-app`

```
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

<!-->

iPad Air, Air2, Mini

```
<link href="https://placehold.it/152" sizes="152x152" rel="apple-touch-icon>
```

iPad Pro

```
<link href="https://placehold.it/152" sizes="167x167" rel="apple-touch-icon>
```

> for iOS, which doesn't read `manifest.json` you can use:

- [cubiq/add-to-homescreen: Add to home screen call-out for mobile devices](https://github.com/cubiq/add-to-homescreen)

-->

# Challenge ONe

## Web App Mamifest

Should be included with `create-react-app`:
[manifest.json](http://localhost:3000/manifest.json)

Chrome Dev Tools: Application > Manifest

## Don't boot blank!

Add the app shell (header and footer) to `public/index.html`

Chrome Web Developer Tools > Performance > commnd + shift + E to`record page load`

Summary: 0 - 4.43s

1000 ms until interactable
1500 ms until data is loaded

Add a spinner

- [SpinKit | Simple CSS Spinners](https://tobiasahlin.com/spinkit/)

```
<div class="sk-chase">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>
```

```
.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2.0s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); }
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  } 100%, 0% {
    transform: scale(1.0);
  }
}
```

## JS Workers

```
// App.js

let w = new Worker('worker.js');

w.postMessage({foo: 'bar});
console.log('App Sent');

w.onmessage = (e) => {
  console.log(
    `App Recieved: ${e.data}`
  );
}
```

```
// worker.js
const log = console.info.bind(console);

self.onmessage = ({data}) => {
  log('Worker received', data);
  doWork(data.foo);
}

const doWork = value => self.setTimeout(() => {
  let x = value.toUpperCase();
  log('Worker sending to app', x);
  self.postMessage(x);
}, 2000)

```

## Worker Limitations & Features

Limitations

- No DOM/cookies/localStorage
- Limited `location` and `navigator` objects

Features

- `setInterval` and `setTimeout` (and respective clears)
- `fetch` and `Promise`
- Cache Storage API
- WebSockets
- IndexedDB
