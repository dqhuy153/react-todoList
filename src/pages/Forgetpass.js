import styles from './ForgetPass.module.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Forgetpass extends Component {
  render() {
    return (
      <div className={styles.login}>
        <div className={styles.container}>
          <div className={styles.logo}>TodoList.</div>
          <div className={styles.row}>
            <div className={styles.title}> Forgot Password</div>
            <input
              type="email"
              className={styles.account}
              placeholder="Enter Email"
            />
            <button type="submit" className={styles.btnLogin}>
              Send
            </button>
            <hr />
            <div className={styles.footerLogin}>
              <Link to="/sign-in" href className={styles.forgetPass}>
                Sign In
              </Link>
              <Link to="/sign-up" href=" " className={styles.signup}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
