import type { NextPage } from 'next'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getYouTubeData } from '@api/index'
import Header from '@components/common/Header'
import Player from '@components/video/Player'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { nowPlaying, update } from '@store/modules/contentList'
import { isDataCheck } from '@utils/common'
import Styles from '@styles/Home.module.css';
import { ContentInfo, ContentItem } from '@interfaces/ContentInfo'
import { getWishList } from '@utils/wishStorage'
import { wishListUpdate, wishLocalUpdate } from '@store/modules/wishList'
import { useQuery } from 'react-query'

const Home: NextPage = () => {

  const dispatch = useDispatch();
  const wishList = useSelector((state: RootState) => state.wish.wishList);

  const { data: contentInfo, isLoading, isError } = useQuery<ContentInfo>(
    'contentInfo', 
    () => getYouTubeData({ q: '원티드랩', maxResults: 10 }),
    { retry: 0, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    console.log(contentInfo, isLoading, isError);
    if(contentInfo) {
      dispatch(update(contentInfo.items));
      dispatch(nowPlaying(contentInfo.items[0]));
    }
  }, [contentInfo])

  useEffect(() => {
    // 검색화면에서 history.push로 첫화면 보내면서 이 로직을 타므로
    // 새로고침 할 때만 localStorage에 있는 wishList를 가져와야 하므로 length check 추가
    if(!isDataCheck(wishList)) {
      dispatch(wishLocalUpdate(getWishList()));
    }
  }, [])
  
  return (
    <>
      <Header />
      { isLoading ?
        <div className={Styles.ment}>로딩중입니다.</div>
      : isError ?
        <div className={Styles.ment}>데이터를 가져오는데 실패하였습니다.</div>
      :
        <Player />
      }
    </>
  )
}

export default Home

