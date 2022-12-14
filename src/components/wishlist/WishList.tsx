import React, { useCallback, useEffect, useState } from 'react';
import Styles from '@styles/Wishlist.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import YouTube, { YouTubeProps } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { wishListUpdate, wishListDel, wishNowPlaying, wishIsShuffleEnable, wishLocalUpdate } from '@store/modules/wishList';
import { ContentItem } from '@interfaces/ContentInfo';
import _ from 'lodash';
import { isDataCheck } from '@utils/common';
import WishListItem from '@components/wishlist/WishListItem';
import { getWishList } from '@utils/wishStorage';

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state: RootState) => state.wish.wishList);
  const wishPlayingList = useSelector((state: RootState) => state.wish.wishPlayingList);
  const wishShuffled = useSelector((state: RootState) => state.wish.wishIsShuffled);

  const [videoId, setVideoId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [channelTitle, setChannelTitle] = useState<string>('');
  const [contentIndex, setContentIndex] = useState<number>(1);
  const [playedVideoIdList, setPlayedVideoIdList] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (isDataCheck(wishList)) {
      dispatch(wishNowPlaying(wishList[0]));
      setPlayedVideoIdList(wishList);
    }
  }, [wishList]);

  useEffect(() => {
    if (isDataCheck(wishPlayingList)) {
      setVideoId(wishPlayingList.id.videoId);
      setTitle(wishPlayingList.snippet.title);
      setChannelTitle(wishPlayingList.snippet.channelTitle);
    }
  }, [wishPlayingList]);

  useEffect(() => {
    // 검색화면에서 history.push로 첫화면 보내면서 이 로직을 타므로
    // 새로고침 할 때만 localStorage에 있는 wishList를 가져와야 하므로 length check 추가
    if (!isDataCheck(wishList)) {
      dispatch(wishLocalUpdate(getWishList()));
    }
  }, []);

  useEffect(() => {
    console.log('찜 목록', wishList);
  }, [wishList]);

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0,
      modestbranding: 1,
    },
  };

  const onPlayerEnd: YouTubeProps['onEnd'] = (event) => {
    if (wishShuffled) {
      // 1. 재생된 비디오 제외처리
      const videoIdList = playedVideoIdList.filter((item: ContentItem) => item.id.videoId !== videoId);
      // 2. state에 담아준다.
      setPlayedVideoIdList(videoIdList);
      // 3. lodash Sample function을 통해 Array 랜덤 처리
      const shuffleVideoList = _.sample(videoIdList);

      // 모든 영상이 재생되면 마지막 영상 끝나면 중지처리
      if (playedVideoIdList.length > 0) {
        console.log('여기탄다.', playedVideoIdList);
        dispatch(wishNowPlaying(shuffleVideoList));
      } else {
        event.target.pauseVideo();
      }
    } else {
      // 찜 목록 만큼만 wishNowPlaying update 시킨다. 마지막 리스트 재생이 끝나면 재생 중지 처리
      if (contentIndex < wishList.length) {
        dispatch(wishNowPlaying(wishList[contentIndex]));
        setContentIndex((contentIndex) => contentIndex + 1);
      } else {
        event.target.pauseVideo();
      }
    }
  };

  const onHeartClick = useCallback((wishList: ContentItem) => {
    console.log(wishList);
    if (wishList.wishListExistYn) {
      dispatch(wishListDel(wishList));
    } else {
      dispatch(wishListUpdate(wishList));
    }
  }, []);

  const onShufflePlayClick = () => {
    if (wishShuffled) {
      dispatch(wishIsShuffleEnable(false));
    } else {
      dispatch(wishIsShuffleEnable(true));
    }
  };

  return (
    <div className={Styles.Content}>
      {isDataCheck(wishList) && (
        <>
          <YouTube className={Styles.playerBox} videoId={videoId} opts={opts} onEnd={onPlayerEnd} />
          <div className={Styles.text}>
            <span className={Styles.title} dangerouslySetInnerHTML={{ __html: title }} />
            <br />
            <br />
            <span className={Styles.channelTitle}>{channelTitle}</span>
            {isDataCheck(wishList) && wishList.find((item: ContentItem) => item.id.videoId === videoId)?.wishListExistYn ? (
              <FontAwesomeIcon
                className={Styles.HeartIcon}
                style={{ float: 'right' }}
                onClick={() => onHeartClick(wishPlayingList)}
                color="red"
                icon={faHeartCirclePlus}
                size="2x"
              />
            ) : (
              <FontAwesomeIcon
                className={Styles.HeartIcon}
                style={{ float: 'right' }}
                onClick={() => onHeartClick(wishPlayingList)}
                color="red"
                icon={faHeart}
                size="2x"
              />
            )}
          </div>
          <div className={Styles.wishContent}>
            <button type="button" className={`${Styles.shuffleButton} w-btn-indigo`} title="찜 리스트 셔플 재생" onClick={onShufflePlayClick}>
              <span>{`찜 리스트 셔플 재생 ${wishShuffled ? '켜짐' : '꺼짐'}`}</span>
            </button>
            <ul className={Styles.list}>
              <hr />
              {wishList !== null &&
                wishList.map((wishItem: ContentItem, index: number) => (
                  <>
                    <WishListItem
                      key={index}
                      videoId={wishItem.id.videoId}
                      wishItem={wishItem}
                      title={wishItem.snippet.title}
                      channelTitle={wishItem.snippet.channelTitle}
                      thumbnail={wishItem.snippet.thumbnails.default.url}
                    />
                  </>
                ))}
            </ul>
            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
