import React, { useCallback } from 'react'
import Styles from '@styles/Header.module.css'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const router = useRouter();

  const onPlayListClick = useCallback(() => {
    router.push('/');
  }, []);

  return (
    <div className={Styles.header}>
      <p className={Styles.title}>내가 찜한 동영상</p>
      <FontAwesomeIcon className={Styles.playList} icon={faHouse} size='2x' onClick={onPlayListClick} />
    </div>
  )
}

export default Header;
