import { faBriefcase, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchKeywordSet } from '@store/modules/searchList';
import Styles from '@styles/Header.module.css';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onSearchText = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.key;
    const keyWord = e.currentTarget.value;
    // 엔터키를 입력하여 검색할수 있도록 처리
    if (keyCode === 'Enter') {
      console.log('입력', keyWord);
      dispatch(searchKeywordSet(keyWord));
      router.push('/search');
    }
  }, []);

  // const onSearchTextChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.currentTarget.value);
  //   keyword = e.currentTarget.value;
  //   dispatch(headerKeywordSet(e.currentTarget.value));
  // });

  const onSearchIcon = () => {
    // if(headerKeyword.length > 0) {
    //   console.log('입력',headerKeyword, keyword);
    //   dispatch(searchKeywordSet(keyword));
    //   router.push('/search');
    // }
  };

  const onPlayListClick = useCallback(() => {
    router.push('/wishlist');
  }, []);

  return (
    <div className={Styles.header}>
      <input name="q" autoComplete="off" className={Styles.search} type="text" placeholder="검색어를 입력해주세요." onKeyDown={(e) => onSearchText(e)} />
      <FontAwesomeIcon className={Styles.searchIcon} icon={faSearch} onClick={() => onSearchIcon()} />
      <FontAwesomeIcon className={Styles.playList} icon={faBriefcase} size="2x" onClick={onPlayListClick} />
    </div>
  );
};

export default Header;
