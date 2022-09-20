import React, { useCallback } from 'react'
import Styles from '@styles/Header.module.css'
import { useDispatch } from 'react-redux';
import { searchKeywordSet, searchMode } from '@store/modules/searchList';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faSearch } from '@fortawesome/free-solid-svg-icons';


const Header = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const onSearchText = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyWord = e.currentTarget.value
    const keyCode = e.key
    // 엔터키를 입력하여 검색할수 있도록 처리
    if(keyCode === 'Enter') {
      console.log('입력',keyWord);
      dispatch(searchKeywordSet(keyWord));
      dispatch(searchMode(true));
      router.push('search');
    }
  }, []);

  const onSearchIcon = useCallback(() => {
  }, []);

  const onPlayListClick = useCallback(() => {
    router.push('/wishlist');
  }, []);

  return (
    <div className={Styles.header}>
      <input 
        name='q' 
        autoComplete='off' 
        className={Styles.search} 
        type='text'
        placeholder='검색어를 입력해주세요.' 
        onKeyDown={(e) => onSearchText(e)} />
      <FontAwesomeIcon className={Styles.searchIcon} icon={faSearch} onClick={(e) => onSearchIcon()} />
      <FontAwesomeIcon className={Styles.playList} icon={faBriefcase} size='2x' onClick={onPlayListClick} />
    </div>
  )
}

export default Header;
