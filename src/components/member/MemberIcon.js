import React from 'react';

import styles from './MemberIcon.module.scss';

export default function MemberIcon({
  onClick,
  firstLetter,
  className,
  ...props
}) {
  return (
    <div className={`${styles.container} ${className}`} onClick={onClick}>
      <p className={styles.firstLetter}>{firstLetter}</p>
      {props.children}
    </div>
  );
}
