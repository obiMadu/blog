import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

init({
  el: '#comments',
  serverURL: 'https://comments.obimadu.pro',
  lang: 'en',
});