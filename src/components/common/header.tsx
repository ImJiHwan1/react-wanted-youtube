import React from 'react'
import styles from '@styles/Header.module.css'
import Head from 'next/head';

export const Header = () => {
  return (
    <div className={styles.header}>
        <input className={styles.search} type='text' placeholder='검색어를 입력해주세요.'></input>
        <div className={styles.home}>홈버튼</div>
    </div>
  )
}

export default Header;
