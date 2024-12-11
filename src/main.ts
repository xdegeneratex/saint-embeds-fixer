import 'plyr/dist/plyr.css';

import Plyr, { type PlyrEvent } from 'plyr';

import { GM_xmlhttpRequest } from '$';

let tries = 0;
let firstSaintIFrame = document.querySelector('iframe[src^="https://saint"]');

while (tries < 10 && !firstSaintIFrame) {
  firstSaintIFrame = document.querySelector('.saint-iframe');
  await new Promise((resolve) => setTimeout(() => resolve(true), 500));
  tries++;
}

if (firstSaintIFrame) {
  console.log('[saint-embeds-fixer]: Found at-least one saint embed. Initializing...');

  document.querySelectorAll('.message--post').forEach((el) => {
    el.querySelectorAll('iframe[src^="https://saint"]').forEach((el) => {
      const url = (el as HTMLIFrameElement).src;

      if (!url) {
        return false;
      }

      const playerElement = document.createElement('video');
      playerElement.autoplay = false;

      el.insertAdjacentElement('beforebegin', playerElement);
      el.remove();

      GM_xmlhttpRequest({
        url,
        responseType: 'document',
        onload: (response) => {
          const ogImageMetaEl = response.response.querySelector('meta[property="og:image"]');
          const posterURL = ogImageMetaEl ? (ogImageMetaEl as HTMLMetaElement).content : undefined;
          const matches = /\/d\/.*?(?=')/.exec(response.response.body.innerHTML);
          const defaultPlayerURL = response.response.querySelector('source')?.src;

          if (!defaultPlayerURL || !matches || !matches.length) {
            return;
          }

          if (posterURL) {
            playerElement.setAttribute('data-poster', posterURL);
          }

          const saintOrigin = new URL(defaultPlayerURL).origin;

          const playbackURL = `${saintOrigin}/api/download.php?file=${matches[0].replace('/d/', '')}`;

          if (!playbackURL) {
            return;
          }

          setTimeout(() => {
            const instance = new Plyr(playerElement, {
              autoplay: false,
              ratio: '16:9',
              controls: [
                'play-large',
                'play',
                'progress',
                'current-time',
                'mute',
                'volume',
                'settings',
                'pip',
                'airplay',
                'fullscreen',
                'download',
              ],
              // @ts-expect-error Incomplete type definition.
              urls: {
                download: playbackURL,
              },
            });
            let initialized = false;
            instance.on('play', (e: PlyrEvent) => {
              if (!initialized) {
                instance.source = {
                  type: 'video',
                  sources: [
                    {
                      src: playbackURL,
                    },
                  ],
                };
                initialized = true;
                instance.play();
              }
            });
          }, 250);
        },
      });
    });
  });
} else {
  console.log('[saint-embeds-fixer]: No saint embed found. Exiting!');
}

export default {};
