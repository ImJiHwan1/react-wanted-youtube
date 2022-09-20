import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { getYouTubeData } from '@api/index'
import Header from '@components/common/Header'
import Player from '@components/video/Player'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { nowPlaying, update } from '@store/modules/contentList'
import { isDataCheck } from '@utils/common'
import Styles from '@styles/Home.module.css';
import { ContentItem } from '@interfaces/ContentInfo'
import { getWishList } from '@utils/wishStorage'
import { wishListUpdate, wishLocalUpdate } from '@store/modules/wishList'

const Home: NextPage = () => {
  const [isError, setIsError] = useState<Boolean>(false);

  const dispatch = useDispatch();
  const contentList = useSelector((state: RootState) => state.content.contentList);
  const wishList = useSelector((state: RootState) => state.wish.wishList);

  useEffect(() => {
    try {
      // 키워드 입력 후 해당 키워드 유투브 데이터 가져올때 기존 데이터가 유지되는 버그 발생하여 최초 접속때만 실행되게 변경
      if(!isDataCheck(contentList)) {
        requestContentList();
      }
    } catch (e) {
      setIsError(true);
    }
  }, [])

  useEffect(() => {
    // 검색화면에서 history.push로 첫화면 보내면서 이 로직을 타므로
    // 새로고침 할 때만 localStorage에 있는 wishList를 가져와야 하므로 length check 추가
    if(!isDataCheck(wishList)) {
      dispatch(wishLocalUpdate(getWishList()));
    }
  }, [])

  const requestContentList = async() => {
    try {
      const YoutubeData = await getYouTubeData({ key: `${process.env.NEXT_PUBLIC_CLIENT_ID}`, part: 'snippet', q: '원티드랩', type: 'video', maxResults: 3 })
      if(isDataCheck(YoutubeData.items)) {
        YoutubeData.items.map((item:ContentItem) => {
          item.wishListExistYn = false;
        })
        console.log(YoutubeData.items);
        dispatch(update(YoutubeData.items));
        dispatch(nowPlaying(YoutubeData.items[0]));
      } else {
        setIsError(true);
      }
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
  }
  
  return (
    <>
      <Header />
      { isError ?
        <div className={Styles.ment}>데이터를 가져오는데 실패했습니다.</div>
      :
        <Player />
      }
    </>
  )
}

export default Home

