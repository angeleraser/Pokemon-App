export const delay = (callback, time) => {
  const timeOut = setTimeout(() => {
    callback();
    clearTimeout(timeOut);
  }, time);
};
