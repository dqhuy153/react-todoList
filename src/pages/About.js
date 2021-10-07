import React, { useState } from 'react';
import MemberIcon from '../components/member/MemberIcon';
import { getFirstLetterOfName } from '../util/helper';

import styles from './About.module.scss';

const members = [
  {
    name: 'Đặng Xuân Chiến',
    role: 'Documents, Front-end',
  },
  {
    name: 'Đặng Quang Huy',
    role: 'UI Design, Front-end',
  },
  {
    name: 'Đỗ Vũ Dũng',
    role: 'UI Design, Front-end',
  },
  {
    name: 'Trương A Xin',
    role: 'Documents, Back-end',
  },
  {
    name: 'Hoàng Anh Sỹ',
    role: 'Documents, Testing',
  },
  {
    name: 'Trần Văn Sỹ',
    role: 'Documents',
  },
  {
    name: 'Nguyễn Nhật Tân',
    role: 'Documents',
  },
];

export default function About(props) {
  const [active, setActive] = useState('project');

  const activeClassFunc = (idString) => {
    if (active === idString) {
      return 'active';
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles['side-bar']}>
        <ul>
          <li className={styles[`${activeClassFunc('project')}`]}>
            <a href="#project" onClick={() => setActive('project')}>
              <h3>PROJECT</h3>
              <p>CS 403</p>
            </a>
          </li>

          <li className={styles[`${activeClassFunc('documentation')}`]}>
            <a href="#documentation" onClick={() => setActive('documentation')}>
              <h3>Documentation</h3>
              <p>Paper documents</p>
              <p>UI Design</p>
              <p>APIs</p>
              <p>Repository - Github</p>
            </a>
          </li>
          {/* <li className={styles[`${activeClassFunc('materials')}`]}>
            <a href="#materials" onClick={() => setActive('materials')}>
              <h3>Materials</h3>
            </a>
          </li> */}
          <li className={styles[`${activeClassFunc('members')}`]}>
            <a href="#members" onClick={() => setActive('members')}>
              <h3>Members</h3>
              <p>TEAM 6</p>
            </a>
          </li>
          <li className={styles[`${activeClassFunc('discover')}`]}>
            <a href="#discover" onClick={() => setActive('discover')}>
              Discover more...
            </a>
          </li>
        </ul>
      </div>
      <div className={styles['content-container']}>
        <section id="project" className={styles.project}>
          <h1>ABOUT PROJECT</h1>
          <h2>
            TodoList. <span>- Project CS403</span>
          </h2>
          <p className={styles['project-mentor']}>
            Mentor: <span>PHẠM THANH SƠN</span>
          </p>
        </section>

        <section id="documentation" className={styles.documentation}>
          <h1>DOCUMENTATION</h1>
          <ul>
            <li>
              <a
                href="https://github.com/dqhuy153/react-todoList"
                target="_blank"
                rel="noreferrer"
              >
                SCRUM documentation
              </a>
            </li>
            <li>
              <a
                href="https://www.figma.com/file/2qQtgOblCNwahNSzD9iJRS/CNPM?node-id=0%3A1"
                target="_blank"
                rel="noreferrer"
              >
                UI Design - Figma
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/spreadsheets/d/1XqgTP7mVie1zI5zsmgzFypLtWYByK2h3XL2WpYR_eCY/edit#gid=0"
                target="_blank"
                rel="noreferrer"
              >
                APIs
              </a>
            </li>
            <li>
              Repository - Github
              <ul>
                <li>
                  <a
                    href="https://github.com/dqhuy153/react-todoList"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Front-end: React App
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/toky0s/team6_todo_app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Back-end: API - Java Spring Boot
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        {/* <section id="materials" className={styles.materials}>
          <h1>MATERIALS</h1>
        </section> */}
        <section id="members" className={styles.members}>
          <h1>MEMBERS</h1>
          <ul>
            {members.map((member) => (
              <li key={member.name} className={styles['member-item']}>
                <div className={styles['member-item_left']}>
                  <MemberIcon firstLetter={getFirstLetterOfName(member.name)} />
                  <p className={styles['member-item_name']}>{member.name}</p>
                  <p className={styles['member-item_role']}>{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
