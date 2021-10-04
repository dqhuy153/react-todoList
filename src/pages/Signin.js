import styles from './Signin.module.scss';
import React, { Component } from 'react';

import AuthContext from '../store/Auth/auth-context';

import { Redirect, Link } from 'react-router-dom';
// const LOGIN = {
//   user: [
//     {
//       id: 1,
//       name: 'xuanchienk58@gmail.com',
//       password: '030620',
//     },
//     {
//       id: 2,
//       name: 'dovudung@gmail.com',
//       password: '050320',
//     },
//     {
//       id: 3,
//       name: 'dangquanghuy@gmail.com',
//       password: '150399',
//     },
//     {
//       id: 4,
//       name: 'truongaxin@gmail.com',
//       password: '123123',
//     },
//     {
//       id: 5,
//       name: 'hoanganhsy@gmail.com',
//       password: '100420',
//     },
//     {
//       id: 6,
//       name: 'nguyennhattan@gmail.com',
//       password: '100920',
//     },
//     {
//       id: 7,
//       name: 'tranvansy@gmail.com',
//       password: '121120',
//     },
//     {
//       id: 8,
//       name: 'admin',
//       password: 'admin',
//     },
//   ],
// };
export default class Signin extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
      id: '',
      username: '',
      password: '',
    };
  }

  //ham lay gia tri
  isChangeName = (event) => {
    const name1 = event.target.name;
    const value1 = event.target.value;
    this.setState({ [name1]: value1 });
  };
  isChangePassword = (event) => {
    const name1 = event.target.name;
    const value1 = event.target.value;
    this.setState({ [name1]: value1 });
  };

  render() {
    const { onLogin } = this.context;

    if (this.state.isRedirect === true) {
      return <Redirect to="/" />;
    }
    return (
      //   <div className={`${styles.login} ${styles.login}`}> {/* cách khai báo nhiều class */}
      <form
        className={styles.login}
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(this.state.username, this.state.password);
        }}
      >
        <div className={styles.container}>
          <div className={styles.logo}>TodoList.</div>
          <div className={styles.row}>
            <div className={styles.title}> Sign in to Todos </div>
            <input
              type="text"
              name="username"
              className={styles.account}
              placeholder="Enter Username"
              onChange={(event) => this.isChangeName(event)}
            />
            <input
              type="password"
              name="password"
              className={styles.password}
              onChange={(event) => this.isChangePassword(event)}
              placeholder="Enter Password"
            />

            <input
              type="submit"
              className={styles.btnLogin}
              value="Sign In"
            ></input>
            <hr />
            <div className={styles.footerLogin}>
              <Link to="/forget" href className={styles.forgetPass}>
                Can't log in?
              </Link>
              <Link to="/sign-up" href=" " className={styles.signup}>
                Sign up for an account
              </Link>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
