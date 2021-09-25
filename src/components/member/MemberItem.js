import React from 'react';

import styles from './MemberItem.module.scss';

export default function MemberItem({ id, name, firstLetter, ...props }) {
  return (
    <div className={styles.container}>
      <p>{firstLetter}</p>
    </div>
  );
}
