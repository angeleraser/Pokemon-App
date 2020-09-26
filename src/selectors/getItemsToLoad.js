export const getItemsToLoad = (count, startIndx, arr) => {
  let items = [];
  let indx = startIndx;
  const endIndx = startIndx + count;
  while (indx < endIndx) {
    if (!arr[indx]) {
      break;
    } else {
      items = [...items, arr[indx]];
      indx += 1;
    }
  }
  return items;
};