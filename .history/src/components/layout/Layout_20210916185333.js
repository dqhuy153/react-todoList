import React, { Fragment } from 'react';
import AppNavigation from './AppNavigation';

import styles from './Layout.module.scss';

export default function Layout(props) {
  return (
    <Fragment>
      <AppNavigation logoTitle="TodoList." />
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
}
