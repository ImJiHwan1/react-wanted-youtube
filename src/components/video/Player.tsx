import React, { useCallback, useEffect, useState } from 'react'
import Styles from '@styles/Video.module.css'
import YouTube, { YouTubeProps } from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import PlayListItem from '@components/video/PlayListItem';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { wishListUpdate, wishListDel } from '@store/modules/wishList'
import { isShuffleEnable, nowPlaying, playedVideoId } from '@store/modules/contentList';
import { ContentItem } from '@interfaces/ContentInfo';
import { isDataCheck } from '@utils/common';

const Player = () => {

  const dispatch = useDispatch();
  const contentList = useSelector((state: RootState) => state.content.contentList);
  const wishList = useSelector((state: RootState) => state.wish.wishList);
  const nowPlayingList = useSelector((state: RootState) => state.content.nowPlayingList);
  const isShuffled = useSelector((state: RootState) => state.content.isSuffled);

  const [videoId, setVideoId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [channelTitle, setChannelTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [contentIndex, setContentIndex] = useState<number>(1);
  const [playedVideoIdList, setPlayedVideoIdList] = useState<any>([]);

  useEffect(() => {
    if(contentList !== null && nowPlayingList !== null) {
      setVideoId(nowPlayingList.id.videoId);
      setTitle(nowPlayingList.snippet.title);
      setChannelTitle(nowPlayingList.snippet.channelTitle);
      setDesc(nowPlayingList.snippet.description);
    }
  }, [nowPlayingList])
  
  useEffect(() => {
    console.log('찜 목록', wishList);
  }, [wishList])

  useEffect(() => {
    if(contentList !== null && playedVideoIdList.length > 0) {
      // 2. 재생된 비디오 제외처리
      let videoIdList = contentList.filter((item: ContentItem) => !playedVideoIdList.includes(item.id.videoId)); // 결과
      // 3. lodash Sample function을 통해 Array 랜덤 처리
      const shuffleVideoList = _.sample(videoIdList);
      console.log('여기 탄다.')
      // 4. nowPlaying reducer에 랜덤 처리된 Object 담는다.
      // 페이지를 나갔다 돌아오거나 새로고침하면 초기화
      dispatch(nowPlaying(shuffleVideoList));
    }
  }, [playedVideoIdList])
  
  
  const onPlayerEnd: YouTubeProps['onEnd'] = (event) => {
    if(isShuffled) {
      // 1. 현재 재생중인 videoId push
      let playedVideoIdItems = [];
      playedVideoIdItems.push(videoId); 
      setPlayedVideoIdList(playedVideoIdItems);
    } else {
      // 검색 목록 만큼만 wishNowPlaying update 시킨다. 마지막 리스트 재생이 끝나면 재생 중지 처리
      if(contentIndex < contentList.length) {
        dispatch(nowPlaying(contentList[contentIndex]));
        setContentIndex(contentIndex => contentIndex + 1);
      } else {
        event.target.pauseVideo();
      }
    }
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 1,
      modestbranding: 1
    },
  };

  const onHeartClick = useCallback((nowPlayingList: ContentItem) => {
    if(nowPlayingList.wishListExistYn) {
      dispatch(wishListDel(nowPlayingList));
    } else {
      dispatch(wishListUpdate(nowPlayingList));
    }
  }, []);

  const onShufflePlayClick = useCallback(() => {
    if(isShuffled) {
      dispatch(isShuffleEnable(false));
    } else {
      dispatch(isShuffleEnable(true));
    }
  }, []);

  return (
    <>
      <div className={Styles.video}>
        <div className={Styles.player}>
          { contentList !== null &&
            <>
              <YouTube className={Styles.playerBox} videoId={videoId} opts={opts} onEnd={onPlayerEnd} />
              <div className={Styles.text}>
                <p className={Styles.title} dangerouslySetInnerHTML={{ __html: title}} />
                  <p className={Styles.channelTitle}>{channelTitle}
                  { isDataCheck(wishList) && wishList.find((item:ContentItem) => item.id.videoId === videoId)?.wishListExistYn ?
                    <FontAwesomeIcon onClick={()=>onHeartClick(nowPlayingList)} style={{ float: 'right' }} color='red' icon={faHeartCirclePlus} size='2x' />
                  :
                    <FontAwesomeIcon onClick={()=>onHeartClick(nowPlayingList)} style={{ float: 'right' }} color='red' icon={faHeart} size='2x' />
                  }
                  </p>
                <hr />
                <p className={Styles.desc}>{desc}</p>
              </div>
            </>
          }
        </div>
        <div className={Styles.playlist}>
          <button type='button' className={Styles.shuffleButton} title='검색결과 셔플 재생' onClick={onShufflePlayClick}><span>{`검색결과 셔플 재생 ${isShuffled ? '켜짐' : '꺼짐'}`}</span></button>
          <ul className={Styles.list}>
            { isDataCheck(contentList) &&
              contentList.map((contentItem:ContentItem, index: number) => (
                <>
                  {
                    <PlayListItem 
                      key={index}
                      videoId={contentItem.id.videoId}
                      contentItem={contentItem}
                      title={contentItem.snippet.title}
                      channelTitle={contentItem.snippet.channelTitle}
                      thumbnail={contentItem.snippet.thumbnails.default.url} />
                  }
                </>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Player
