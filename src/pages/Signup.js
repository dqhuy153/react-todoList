
import styles from "./Signup.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Signup extends Component {
    render() {
        return (
            <div className={styles.signup}>
              <div className={styles.container}>
                <div className={styles.logo}>TodoList.</div>
                <div className={styles.row}>
                
                    <div className={styles.title}> Sign up to Todos </div>
                    <input
                      type="email"
                      className={styles.account}
                       
                      placeholder="Full name"
                       
                    />
                    <input
                      type="email"
                      className={styles.account}
                      id="inputtk"
                      placeholder="Enter Email"
                       
                    />
                     
                    <input
                      type="password"
                      className={styles.password}
                      placeholder="Enter Password"
                    />
                    <input
                      type="password"
                      className={styles.password}
                      placeholder="Confirm Password"
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
              
                </div>
              </div>
            </div>
          );
    }
}
