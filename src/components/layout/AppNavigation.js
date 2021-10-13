import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/Auth/auth-context';
import { getFirstLetterOfName } from '../../util/helper';
import MemberItem from '../member/MemberItem';

import styles from './AppNavigation.module.scss';

export default function AppNavigation({ logoTitle = 'Demo.', ...props }) {
  const authCtx = useContext(AuthContext);

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
          <li>

            <MemberItem
              firstLetter={getFirstLetterOfName(authCtx.userInfo?.username)}
              name={authCtx.userInfo?.username}
              clickToShow={true}
              hoverToShow={false}
              isProfileHeader={true}
              id={authCtx.userInfo?.userId}
              onLogout={authCtx.onLogout}
            />
          </li>
          {/* <li>
            <NavLink to="/signin" activeClassName={styles.active}>

              Sign In
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
