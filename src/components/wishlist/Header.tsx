import React, { useCallback, useState } from 'react'
import Styles from '@styles/Header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { searchKeywordSet, searchMode } from '@store/modules/searchList';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const Header = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const onSearchText = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyWord = e.currentTarget.value
    const keyCode = e.key
    if(keyCode === 'Enter') {
      console.log('입력',keyWord);
      dispatch(searchKeywordSet(keyWord));
      dispatch(searchMode(true));
      router.push('search');
    }
  }, []);

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
