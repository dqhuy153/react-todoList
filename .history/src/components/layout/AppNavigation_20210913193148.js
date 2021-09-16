import React from 'react';

import styles from './AppNavigation.module.scss';

export default function AppNavigation({ logoTitle = 'Demo.', ...props }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{logoTitle}</div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
