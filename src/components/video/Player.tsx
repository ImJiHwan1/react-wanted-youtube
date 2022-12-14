import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Styles from '@styles/Video.module.css';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import PlayListItem from '@components/video/PlayListItem';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { wishListUpdate, wishListDel } from '@store/modules/wishList';
import { isShuffleEnable, nowPlaying } from '@store/modules/contentList';
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
  const [playedVideoIdList, setPlayedVideoIdList] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (isDataCheck(contentList)) {
      setPlayedVideoIdList(contentList);
    }
  }, [contentList]);

  useEffect(() => {
    if (contentList !== null && nowPlayingList !== null) {
      setVideoId(nowPlayingList.id.videoId);
      setTitle(nowPlayingList.snippet.title);
      setChannelTitle(nowPlayingList.snippet.channelTitle);
      setDesc(nowPlayingList.snippet.description);
    }
  }, [nowPlayingList]);

  const onPlayerEnd: YouTubeProps['onEnd'] = (event) => {
    if (isShuffled) {
      // 1. ????????? ????????? ????????????
      const videoIdList = playedVideoIdList.filter((item: ContentItem) => item.id.videoId !== videoId);
      // 2. state??? ????????????.
      setPlayedVideoIdList(videoIdList);
      // 3. lodash Sample function??? ?????? Array ?????? ??????
      const shuffleVideoList = _.sample(videoIdList);

      // ?????? ????????? ???????????? ????????? ?????? ????????? ????????????
      if (playedVideoIdList.length > 1) {
        dispatch(nowPlaying(shuffleVideoList));
      } else {
        event.target.pauseVideo();
      }
    } else {
      // ?????? ?????? ????????? wishNowPlaying update ?????????. ????????? ????????? ????????? ????????? ?????? ?????? ??????
      if (contentIndex < contentList.length) {
        dispatch(nowPlaying(contentList[contentIndex]));
        setContentIndex((contentIndex) => contentIndex + 1);
      } else {
        event.target.pauseVideo();
      }
    }
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 1,
      modestbranding: 1,
    },
  };

  const onHeartClick = useCallback((nowPlayingList: ContentItem) => {
    if (nowPlayingList.wishListExistYn) {
      dispatch(wishListDel(nowPlayingList));
    } else {
      dispatch(wishListUpdate(nowPlayingList));
    }
  }, []);

  const onShufflePlayClick = () => {
    if (isShuffled) {
      dispatch(isShuffleEnable(false));
    } else {
      dispatch(isShuffleEnable(true));
    }
  };

  return (
    <>
      <div className={Styles.video}>
        <div className={Styles.player}>
          {contentList !== null && (
            <>
              <YouTube className={Styles.playerBox} videoId={videoId} opts={opts} onEnd={onPlayerEnd} />
              <div className={Styles.text}>
                <p className={Styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                <p className={Styles.channelTitle}>
                  {channelTitle}
                  { isDataCheck(wishList) && wishList.find((item: ContentItem) => item.id.videoId === videoId)?.wishListExistYn ? 
                    <FontAwesomeIcon onClick={() => onHeartClick(nowPlayingList)} style={{ float: 'right' }} color="red" icon={faHeartCirclePlus} size="2x" />
                  : 
                    <FontAwesomeIcon onClick={() => onHeartClick(nowPlayingList)} style={{ float: 'right' }} color="red" icon={faHeart} size="2x" />
                  }
                </p>
                <hr />
                <p className={Styles.desc}>{desc}</p>
              </div>
            </>
          )}
        </div>
        <div className={Styles.playlist}>
          <button type="button" className={`${Styles.shuffleButton} w-btn-indigo`} title="???????????? ?????? ??????" onClick={onShufflePlayClick}>
            <span>{`???????????? ?????? ?????? ${isShuffled ? '??????' : '??????'}`}</span>
          </button>
          <ul className={Styles.list}>
            {isDataCheck(contentList) &&
              contentList.map((contentItem: ContentItem, index: number) => (
                <>
                  {
                    <PlayListItem
                      key={index}
                      videoId={contentItem.id.videoId}
                      contentItem={contentItem}
                      title={contentItem.snippet.title}
                      channelTitle={contentItem.snippet.channelTitle}
                      thumbnail={contentItem.snippet.thumbnails.default.url}
                    />
                  }
                </>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Player;
