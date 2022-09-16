import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import { getYouTubeData } from '@api/index'
import Header from '@components/common/header'
import Player from '@components/video/Player'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { update } from '@store/modules/contentList'

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const contentList = useSelector((state: RootState) => state.content.contentList);

  useEffect(() => {
    try {
      requestContentList();
    } catch (e) {
      alert('에러가 발생하였습니다.');
    }
  }, [])

  useEffect(() => {
    console.log(contentList);
  }, [contentList])

  const requestContentList = async() => {
    try {
      await getYouTubeData({ key: `${process.env.NEXT_PUBLIC_CLIENT_ID}`, part: 'snippet', q: '원티드랩', type: 'video', maxResults: 10 })
      .then((response) => {
        console.log(response);
        dispatch(update(response.items));
      })
      .catch((err) => {
        console.log(err);
      })
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <>
      <Header />
      <Player />
    </>
  )
}

export default Home
