import React, { useCallback } from 'react';
import Styles from '@styles/Playlist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ContentItem } from '@interfaces/ContentInfo';
import { nowPlaying } from '@store/modules/contentList';
import { isDataCheck } from '@utils/common';

interface PropsTypes {
  key: number;
  videoId: string;
  contentItem: ContentItem;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

const PlayListItem = (props: PropsTypes) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state: RootState) => state.wish.wishList);

  const onVideoClick = useCallback((ContentItem: ContentItem) => {
    dispatch(nowPlaying(ContentItem));
  }, []);

  return (
    <li className={Styles.playlist} key={props.videoId} onClick={() => onVideoClick(props.contentItem)}>
      <img className={Styles.playImg} src={props.thumbnail} alt={props.title}></img>
      <div className={Styles.detail}>
        <p dangerouslySetInnerHTML={{ __html: props.title }} />
        <p className={Styles.channelTitle}>{props.channelTitle}</p>
      </div>
      {isDataCheck(wishList) && wishList.find((item: ContentItem) => item.id.videoId === props.videoId)?.wishListExistYn && (
        <FontAwesomeIcon className={Styles.heart} style={{ float: 'right' }} color="black" icon={faHeartCirclePlus} />
      )}
    </li>
  );
};

export default PlayListItem;
