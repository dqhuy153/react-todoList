import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './AppNavigation.module.scss';

export default function AppNavigation({ logoTitle = 'Demo.', ...props }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{logoTitle}</div>
      <nav>
        <ul>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
