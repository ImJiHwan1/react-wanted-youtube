import React from 'react'
import styles from '@styles/Playlist.module.css'

export const PlayListItem = (props: any) => {
  console.log('props', props);

  return (
    <li className={styles.playlist} key={props.key}>
      <img src={props.thumbnail} alt={props.title}></img>
      <div>
        <p dangerouslySetInnerHTML={{ __html: props.title}} />
        <p>{props.channelTitle}</p>
      </div>
    </li>
  )
}
