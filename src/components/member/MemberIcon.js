import React from 'react';

import styles from './MemberIcon.module.scss';

export default function MemberIcon({
  onClick,
  onMouseDown,
  firstLetter,
  className,
  style,
  ...props
}) {
  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={onClick}
      style={style}
      onMouseDown={onMouseDown}
    >
      <p className={styles.firstLetter}>{firstLetter}</p>
      {props.children}
    </div>
  );
}
