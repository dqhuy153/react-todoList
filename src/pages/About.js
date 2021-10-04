import React from 'react';

import styles from './About.module.scss';

export default function About(props) {
  return (
    <div className={styles.container}>
      <div className={styles['side-bar']}>
        <ul>
          <li>
            <a href="#project">
              <h3>PROJECT</h3>
              <p>CS 403</p>
            </a>
          </li>
          <li>
            <a href="#members">
              <h3>Members</h3>
              <p>TEAM 6</p>
            </a>
          </li>
          <li>
            <a href="#documentation">
              <h3>Documentation</h3>
              <p>Paper documents</p>
              <p>UI Design</p>
              <p>APIs</p>
              <p>Repository - Github</p>
            </a>
          </li>
          <li>
            <a href="#materials">Materials</a>
          </li>
          <li>Discover more...</li>
        </ul>
      </div>
      <div className={styles['content-container']}>
        <section id="project">
          <h1>ABOUT PROJECT</h1>
          <h2>
            TodoList. <span>- Project CS403</span>
          </h2>
          <p>Mentor: </p>
        </section>
        <section id="members">
          <h1>MEMBERS</h1>
        </section>
        <section id="documentation">
          <h1>DOCUMENTATION</h1>
        </section>
        <section id="materials">
          <h1>MATERIALS</h1>
        </section>
      </div>
    </div>
  );
}
