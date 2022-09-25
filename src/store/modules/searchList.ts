import { ContentItem } from '@interfaces/ContentInfo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initalState 타입 정의
type StateType = {
  searchKeyword: string;
  headerKeywords: string;
  KeywordList: Array<string>;
};

// initalState 생성
const initialState: StateType = { searchKeyword: '', headerKeywords: '', KeywordList: [] };

// 슬라이스생성
export const searchSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    searchKeywordSet: (state: StateType, action: PayloadAction<any>) => {
      // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
      const newItem = action.payload;
      state.searchKeyword = newItem;
      state.KeywordList.push(newItem);
    },
    headerKeywordSet: (state: StateType, action: PayloadAction<any>) => {
      // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
      const newItem = action.payload;
      state.headerKeywords = newItem;
    },
  }
});

// 액션을 export 해준다.
export const { searchKeywordSet, headerKeywordSet } = searchSlice.actions;

// 슬라이스를 export 해준다.
export default searchSlice;