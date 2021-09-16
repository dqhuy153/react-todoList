import React from 'react';
import AppNavigation from './AppNavigation';

import styles from './Layout.module.scss';

export default function Layout(props) {
  return (
    <>
      <AppNavigation logoTitle="TodoList" />
      <main className={styles.main}>{props.children}</main>
    </>
  );
}
