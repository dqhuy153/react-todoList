import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './AppNavigation.module.scss';

export default function AppNavigation({ logoTitle = 'Demo.', ...props }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/" exact>
          {logoTitle}
        </NavLink>
      </div>
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
          {/* <li>
            <NavLink to="/signin" activeClassName={styles.active}>
              Sign In
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
