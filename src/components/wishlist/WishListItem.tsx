import React from 'react'
import Styles from '@styles/Wishlist.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { ContentInfo, ContentItem } from '@interfaces/ContentInfo'
import { wishListUpdate, wishListDel, wishNowPlaying } from '@store/modules/wishList'
import { isDataCheck } from '@utils/common'

interface PropsTypes {
  key: number;
  videoId: string;
  wishItem: ContentItem;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

const WishListItem = (props: PropsTypes) => {

  const dispatch = useDispatch();
  const contentList = useSelector((state: RootState) => state.content.contentList);
  const wishList = useSelector((state: RootState) => state.wish.wishList);

  const onVideoClick = (ContentItem: ContentItem) => {
    dispatch(wishNowPlaying(ContentItem));
  }

  const onHeartClick = (e:any, wishItem: ContentItem) => {
    console.log(wishItem);
    e.stopPropagation();
    if(wishItem.wishListExistYn) {
      dispatch(wishListDel(wishItem));
    } else {
      dispatch(wishListUpdate(wishItem));
    }
  }

  return (
    <>
      <li className={Styles.wishList} key={props.videoId} onClick={() => onVideoClick(props.wishItem)}>
        <img className={Styles.playImg} src={props.thumbnail} alt={props.title}></img>
        <span className={Styles.wishListTitle} dangerouslySetInnerHTML={{ __html: props.title}} />
        <span className={Styles.wishListChannelTitle}>{props.channelTitle}</span>
        <div>
          { isDataCheck(wishList) && wishList.find((item:ContentItem) => item.id.videoId === props.videoId)?.wishListExistYn ?
            <FontAwesomeIcon className={Styles.wishListHeartIcon} onClick={(e) => onHeartClick(e, props.wishItem)} color='red' icon={faHeartCirclePlus} />
          :
            <FontAwesomeIcon className={Styles.wishListHeartIcon} onClick={(e) => onHeartClick(e, props.wishItem)} color='red' icon={faHeart} />
          }
        </div>
      </li>
      <hr />
    </>
  )
}

export default WishListItem
