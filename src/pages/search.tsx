import { getYouTubeData } from '@api/index';
import Header from '@components/common/Header';
import Player from '@components/video/Player';
import { ContentInfo } from '@interfaces/ContentInfo';
import { RootState } from '@store/index';
import { nowPlaying, update } from '@store/modules/contentList';
import Styles from '@styles/Search.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

const search = () => {
  const searchKeyword = useSelector((state: RootState) => state.search.searchKeyword);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data: contentInfo,
    isLoading,
    isError,
    refetch,
  } = useQuery<ContentInfo>('searchInfo', () => getYouTubeData({ q: searchKeyword, maxResults: 10 }), {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    console.log(contentInfo);
    if (contentInfo && contentInfo.items.length > 0) {
      dispatch(update(contentInfo.items));
      dispatch(nowPlaying(contentInfo.items[0]));
    }
  }, [contentInfo]);

  useEffect(() => {
    refetch();
  }, [searchKeyword]);

  return (
    <>
      <Header />
      {isLoading ? (
        <div className={Styles.ment}>검색결과 로딩중...</div>
      ) : isError ? (
        <div className={Styles.ment}>데이터를 불러오는데 실패하였습니다.</div>
      ) : contentInfo && contentInfo.items.length === 0 ? (
        <div className={Styles.ment}>'{searchKeyword}'에 대한 검색결과가 없습니다.</div>
      ) : (
        <Player />
      )}
    </>
  );
};

export default search;
