import React from 'react';

import styles from './RoomList.module.scss';
import RoomItem from './RoomItem';

export default function RoomList({
  items,
  backgroundColor,
  textColor,
  showOption = true,
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
      <ul className={styles['container__recent--childs']}>
        {items &&
          items.map((room) => (
            <li key={room.id} className={styles['container__recent--child']}>
              <RoomItem
                id={room.id}
                name={room.name}
                showOption={showOption}
                password={room.password}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
