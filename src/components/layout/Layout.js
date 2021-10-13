import React, { Fragment, useEffect, useState } from 'react';
import AppNavigation from './AppNavigation';
import SideBar from './SideBar';

import styles from './Layout.module.scss';

export default function Layout({ hasSideBar = true, ...props }) {
  const [showSideBar, setShowSideBar] = useState(hasSideBar);

  useEffect(() => {
    setShowSideBar(hasSideBar);
  }, [hasSideBar]);

  return (
    <Fragment>
      <AppNavigation logoTitle="TodoList." />
      {showSideBar && <SideBar />}
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
}
