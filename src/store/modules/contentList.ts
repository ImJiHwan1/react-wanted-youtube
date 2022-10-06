import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initalState 타입 정의
type StateType = {
  contentList: any;
  nowPlayingList: any;
  isSuffled: boolean;
  contentIndex: number;
};

// initalState 생성
const initialState: StateType = {
  contentList: null,
  nowPlayingList: null,
  isSuffled: false,
  contentIndex: 1,
};

// 슬라이스생성
export const contentSlice = createSlice({
  name: 'contentList',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    update: (state: StateType, action: PayloadAction<any>) => {
      // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
      const newItem = action.payload;
      state.contentList = newItem;
    },
    del: (state: StateType, action: PayloadAction<any>) => {
      // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
      const newItem = action.payload;
      let contentList = state.contentList;
      console.log(newItem);

      if (contentList.length > 0) {
        console.log('여기탄다.');
        const deleteItem = contentList.filter((item: { id: { videoId: string } }) => {
          if (item.id.videoId !== newItem.id.videoId) {
            return item;
          }
        });
        contentList = deleteItem;
      } else {
        contentList;
      }
    },
    nowPlaying: (state: StateType, action: PayloadAction<any>) => {
      const nowItem = action.payload;
      state.nowPlayingList = nowItem;
    },
    isShuffleEnable: (state: StateType, action: PayloadAction<any>) => {
      const newItem = action.payload;
      state.isSuffled = newItem;
    },
  },
});

// 액션을 export 해준다.
export const { update, nowPlaying, del, isShuffleEnable } = contentSlice.actions;

// 슬라이스를 export 해준다.
export default contentSlice;
