import { API } from './core';

const base = 'https://xkcdapi.now.sh/';

const api = new API(base);

/**
 * Adds an extra field which choose imgRetina or img
 */
const imageUrlMiddleware = data => {
  data.url = data.imgRetina || data.img;
  return data;
};

/**
 * Makes the browser fetch the image beforehand.
 * Once the image is fetched, it is cached by the browser automatically.
 */
const preloadImageMiddleware = data => {
  const img = new Image();
  img.src = data.url;
  return data;
};

/**
 * Middlewares are applied on the same order they are set.
 */
api.use(imageUrlMiddleware);
api.use(preloadImageMiddleware);

/**
 * Storing this in session storage, because the response changes everyday
 */
export const fetchToday = () => {
  return api.get({ url: '', type: 'session' });
};

export const fetchNumber = number => {
  return api.get({ url: number });
};
