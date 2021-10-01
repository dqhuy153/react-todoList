import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '../UI/Card/Card';

import styles from './RoomList.module.scss';

export default function RoomList({
  items,
  backgroundColor,
  textColor,
  ...props
}) {
  return (
    <div
      className={styles.container__recent}
      style={{
        '--background-color': backgroundColor,
        '--text-color': textColor,
      }}
    >
      <div className={styles['container__recent--childs']}>
        {items.map((room) => (
          <div key={room.id} className={styles['container__recent--child']}>
            <NavLink
              to={`/room/${room.id}`}
              className={styles['container__recent--child']}
            >
              <Card className={`${styles.room} ${styles['own__room--organ']}`}>
                <p>{room.nameRoom} </p>
              </Card>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
