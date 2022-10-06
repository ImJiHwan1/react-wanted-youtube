import { configureStore } from '@reduxjs/toolkit';
import contentSlice from '@store/modules/contentList';
import wishSlice from '@store/modules/wishList';
import searchSlice from './modules/searchList';
import { setAutoFreeze } from 'immer';

// 리덕스 store 생성함수
const makeStore = () => {
  // 슬라이스 통합 store 생성
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    reducer: {
      content: contentSlice.reducer,
      wish: wishSlice.reducer,
      search: searchSlice.reducer,
    },
    devTools: process.env.NODE_ENV === 'development', // 개발자도구 설정
  });
  return store;
};

setAutoFreeze(false);

// store 생성
const store = makeStore();

// store 엑스포트
export default store;

// RootState 엑스포트
export type RootState = ReturnType<typeof store.getState>;
