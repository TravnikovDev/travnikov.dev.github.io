/**
 * Self-destructing service worker.
 *
 * gatsby-plugin-offline has been removed, but removing it does nothing for the
 * people who already have its worker registered — theirs keeps serving the
 * cached bundle it holds, potentially forever. Browsers do re-fetch /sw.js, so
 * shipping this at the same path is what actually retires it: it installs,
 * unregisters itself, deletes every cache, and reloads open tabs onto the live
 * site.
 *
 * Keep this file until the analytics show effectively no returning visitors on
 * the old worker. Deleting it early strands anyone who has not been back since.
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Order matters. unregister() can terminate the worker before later
      // awaits finish, so the caches have to go first — otherwise the
      // registration disappears and the stale bundle stays on disk.
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));

      await self.registration.unregister();

      // force open tabs off the cached bundle they are still running
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});
