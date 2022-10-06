import { ContentItem } from '@interfaces/ContentInfo';

export const setWishList = (wishList: ContentItem[]) => {
  if (wishList) {
    window.localStorage.setItem('wishList', JSON.stringify(wishList));
  } else {
    window.localStorage.setItem('wishList', '');
  }
};

export const getWishList = () => {
  const item = window.localStorage.getItem('wishList');
  return item ? JSON.parse(item) : [];
};
