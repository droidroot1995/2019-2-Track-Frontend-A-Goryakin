/* eslint-disable no-console */

export const register = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js', { scope: '/2019-2-Track-Frontend-A-Goryakin/' })
        .then((registration) => {
          console.log('SericeWorker registration successful with scope: ', registration.scope)
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed: ', err)
        })
    })
  }
}

export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister()
    })
  }
}
