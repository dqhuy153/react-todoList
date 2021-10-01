import React, { Fragment } from 'react';
import AppNavigation from './AppNavigation';
import SideBar from './SideBar';

import styles from './Layout.module.scss';

export default function Layout(props) {
  return (
    <Fragment>
      <AppNavigation logoTitle="TodoList." />
      <SideBar />
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
}
