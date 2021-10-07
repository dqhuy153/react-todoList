import styles from './Signup.module.scss';

import AuthContext from '../store/Auth/auth-context';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
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
  isChangeConfirmPassword = (event) => {
    const name1 = event.target.name;
    const value1 = event.target.value;
    this.setState({ [name1]: value1 });
  };

  render() {
    const { onSignup } = this.context;

    return (
      <div className={styles.signup}>
        <div className={styles.container}>
          <div className={styles.logo}>TodoList.</div>
          <form
            className={styles.row}
            onSubmit={(e) => {
              e.preventDefault();

              if (
                !this.state.username ||
                !this.state.password ||
                this.state.username.trim() === '' ||
                this.state.password.trim() === ''
              ) {
                return alert('Please fill all required fields!');
              }

              if (this.state.password.length < 4) {
                return alert('Minimum length of password is 4');
              }

              if (this.state.password !== this.state.confirmPassword) {
                return alert('Confirm password not match!');
              }

              onSignup(this.state.username, this.state.password);
            }}
          >
            <div className={styles.title}> Sign up to Todos </div>
            <input
              type="text"
              name="username"
              className={styles.account}
              placeholder="Username"
              onChange={(event) => this.isChangeName(event)}
            />
            <input
              type="email"
              name="email"
              className={styles.account}
              id="inputtk"
              placeholder="Enter Email"
            />

            <input
              type="password"
              name="password"
              className={styles.password}
              placeholder="Enter Password"
              onChange={(event) => this.isChangePassword(event)}
            />
            <input
              type="password"
              name="confirmPassword"
              className={styles.password}
              placeholder="Confirm Password"
              onChange={(event) => this.isChangeConfirmPassword(event)}
            />

            <button type="submit" className={styles.btnLogin}>
              Sign Up
            </button>
            <hr />
            <div className={styles.footerSignup}>
              <Link to="/sign-in" href className={styles.signin}>
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
