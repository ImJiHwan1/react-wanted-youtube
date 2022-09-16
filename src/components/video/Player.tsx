import React, { useEffect } from 'react'
import styles from '@styles/Video.module.css'
import YouTube, { YouTubeProps } from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { PlayListItem } from '@components/video/PlayListItem';


export const Player = () => {

  const dispatch = useDispatch();
  const contentList = useSelector((state: RootState) => state.content.contentList);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }


  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0,
      modestbranding: 1
    },
  };

  return (
    <>
      <div className={styles.video}>
        <div className={styles.player}>
          { contentList !== null &&
            <>
              <YouTube className={styles.playerBox} videoId={contentList[0].id.videoId} opts={opts} onReady={onPlayerReady} />
              <div className={styles.text}>
                <p className={styles.title} dangerouslySetInnerHTML={{ __html: contentList[0].snippet.title}} />
                <p className={styles.channelTitle}>{contentList[0].snippet.channelTitle}</p>
                <hr />
                <p className={styles.desc}>{contentList[0].snippet.description}</p>
              </div>
            </>
          }
        </div>
        <div className={styles.playlist}>
          <button type='button' title='검색결과 셔플 재생'>검색결과 셔플 재생</button>
          <ul className={styles.list}>
            { contentList !== null &&
              contentList.map((contentItem:any, index:number) => (
                <>
                  {
                    (index !== 0 && 
                      <PlayListItem 
                        key={contentItem.id.videoId}
                        title={contentItem.snippet.title}
                        channelTitle={contentItem.snippet.channelTitle}
                        thumbnail={contentItem.snippet.thumbnails.medium.url} />)
                  }
                </>
              ))
            }
          </ul>
        </div>
      </div>
      <div className={styles.searchList}>

      </div>
    </>
  )
}

export default Player
