import React from 'react';

import styles from './AppNavigation.module.scss';

export default function AppNavigation(props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <a href="/">All Meetups</a>
          </li>
          <li>
            <a href="/new-meetup">Add New Meetup</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
