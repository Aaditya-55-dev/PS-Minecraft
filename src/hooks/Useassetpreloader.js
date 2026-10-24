import { useEffect, useState } from "react";

/**
 * Preloads everything in src/assets and reports real progress (0-100).
 *
 * Put this file in src/hooks/. If your assets folder is somewhere else,
 * change the glob path below (it is relative to THIS file).
 *
 * Vite 5+ syntax. On Vite 3/4 use: { eager: true, as: "url" }
 */
const ASSET_URLS = Object.values(
  import.meta.glob("../assets/**/*", { eager: true, query: "?url", import: "default" })
);

const IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg|bmp|ico)(\?.*)?$/i;
const FONT_RE = /\.(woff2?|ttf|otf)(\?.*)?$/i;

const IMAGES = ASSET_URLS.filter((u) => IMAGE_RE.test(u));
const FONT_FILES = ASSET_URLS.filter((u) => FONT_RE.test(u));

// ---- individual loaders (each one always resolves, never rejects) ----

const loadImage = (url) => () =>
  new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onerror = () => resolve();
    img.src = url;
    if (img.decode) {
      img.decode().then(resolve, resolve); // decoded = ready to paint instantly later
    } else {
      img.onload = () => resolve();
    }
  });

const loadFile = (url) => () =>
  fetch(url).then(
    (r) => r.blob(),
    () => null
  );

const waitForPageLoad = () =>
  new Promise((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });

const waitForFonts = () => (document.fonts?.ready ?? Promise.resolve()).then(() => {});

// don't let one stuck file freeze the bar forever
const withTimeout = (promise, ms) =>
  new Promise((resolve) => {
    const t = setTimeout(resolve, ms);
    promise.then(
      () => {
        clearTimeout(t);
        resolve();
      },
      () => {
        clearTimeout(t);
        resolve();
      }
    );
  });

/**
 * @param minDuration  bar never finishes faster than this (ms), so cached loads don't flash
 * @param timeout      hard stop (ms): the bar completes even if something is still loading
 */
export default function useAssetPreloader({ minDuration = 1200, timeout = 25000 } = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let real = 0; // actual fraction loaded, 0-1
    let shown = 0; // smoothed fraction that drives the bar
    const start = performance.now();
    let last = start;

    const tasks = [
      waitForPageLoad,
      waitForFonts,
      ...IMAGES.map(loadImage),
      ...FONT_FILES.map(loadFile),
    ];

    let done = 0;
    tasks.forEach((run) => {
      withTimeout(run(), 15000).then(() => {
        done += 1;
        real = done / tasks.length;
      });
    });

    const tick = (now) => {
      if (cancelled) return;
      const dt = (now - last) / 1000;
      last = now;

      const elapsed = now - start;
      const forced = elapsed > timeout;
      const cap = Math.min(1, elapsed / minDuration);
      const target = forced ? 1 : Math.min(real, cap);

      // ease towards the target so the bar glides instead of jumping
      shown += (target - shown) * (1 - Math.exp(-dt * 5));
      if (target >= 1 && shown > 0.995) shown = 1;

      setProgress(shown * 100);
      if (shown < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [minDuration, timeout]);

  return { progress };
}