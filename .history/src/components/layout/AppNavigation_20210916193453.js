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
            <NavLink to="/" exact activeClassName={styles.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName={styles.active}>
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
