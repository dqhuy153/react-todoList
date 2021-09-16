import React, { useState } from 'react';

import styles from './TodoItem.module.scss';

export default function TodoItem({
  id,
  title,
  date,
  completed,
  onStatusChange,
  ...props
}) {
  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <input type="checkbox" checked={completed} onChange={onStatusChange} />
        <p>{title}</p>
      </div>
      <p className={styles.date}>{date.toLocaleString()}</p>
    </div>
  );
}
