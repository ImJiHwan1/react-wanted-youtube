import { RootState } from '@store/index';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Styles from '@styles/Search.module.css'
import { getYouTubeData } from '@api/index';
import { useDispatch } from 'react-redux';
import { nowPlaying, update } from '@store/modules/contentList';
import Header from '@components/common/Header';
import { isDataCheck } from '@utils/common';
import { useRouter } from 'next/router';
import { ContentItem } from '@interfaces/ContentInfo';

const search = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  const searchKeyword = useSelector((state: RootState) => state.search.searchKeyword);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    try {
      requestContentList();
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [searchKeyword])
  

  const requestContentList = async() => {
    try {
      const YoutubeData = await getYouTubeData({ key: `${process.env.NEXT_PUBLIC_CLIENT_ID}`, part: 'snippet', q: searchKeyword, type: 'video', maxResults: 10 })
      setIsLoading(false);
      if(isDataCheck(YoutubeData.items)) {
        YoutubeData.items.map((item:ContentItem) => {
          item.wishListExistYn = false;
        })
        dispatch(update(YoutubeData.items));
        dispatch(nowPlaying(YoutubeData.items[0]));
        router.push('/');
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setIsError(true);
    }
  }

  return (
    <>
      <Header />
      { isLoading ?
        <div className={Styles.ment}>검색결과 로딩중...</div>
      : isError ?
        <div className={Styles.ment}>'{searchKeyword}'에 대한 검색결과가 없습니다.</div>
      :
        <></>
      }
    </>

  )
}

export default search;
