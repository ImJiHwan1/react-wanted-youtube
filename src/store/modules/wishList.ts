import { ContentItem } from '@interfaces/ContentInfo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setWishList } from '@utils/wishStorage';

// initalState 타입 정의
type StateType = {
  wishList: Array<ContentItem>;
  wishPlayingList: any;
  wishIsShuffled: boolean;
};

// initalState 생성
const initialState: StateType = { wishList: [], wishPlayingList: null, wishIsShuffled: false };

// 슬라이스생성
export const wishSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    wishListUpdate: (state: StateType, action: PayloadAction<any>) => {
      // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
      const newItem = action.payload;
      console.log(newItem);
      newItem.wishListExistYn = true;
      state.wishList.push(newItem);
      setWishList(state.wishList);
    },
    wishLocalUpdate: (state: StateType, action: PayloadAction<any>) => {
      // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
      const newItem = action.payload;
      console.log(newItem);
      state.wishList.push(...newItem);
    },
    wishListDel: (state: StateType, action: PayloadAction<any>) => {
      // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
      const newItem = action.payload;
      console.log(newItem);
      newItem.wishListExistYn = false;

      if(state.wishList.length > 0) {
        const deleteItem = state.wishList.filter((item) => { 
          if(item.id.videoId !== newItem.id.videoId) {
            return item;
          }
        });
        state.wishList = deleteItem;
        setWishList(state.wishList);
      } else {
        state.wishList
      }
    },
    wishNowPlaying: (state: StateType, action: PayloadAction<any>) => {
      const nowItem = action.payload;
      state.wishPlayingList = nowItem;
    },
    wishIsShuffleEnable: (state: StateType, action: PayloadAction<any>) => {
      const nowItem = action.payload;
      state.wishIsShuffled = nowItem;
    },
  }
});

// 액션을 export 해준다.
export const { wishListUpdate, wishLocalUpdate, wishListDel, wishNowPlaying, wishIsShuffleEnable } = wishSlice.actions;

// 슬라이스를 export 해준다.
export default wishSlice;