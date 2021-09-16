import React, { useState } from 'react';

import styles from './TodoItem.module.scss';

export default function TodoItem({
  id,
  title,
  date,
  status,
  onStatusChange,
  ...props
}) {
  const handleChange = (e) => {
    onStatusChange(id, e.target.checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <input type="checkbox" checked={status} onChange={handleChange} />
        <p>{title}</p>
      </div>
      <p className={styles.date}>{date.toLocaleString()}</p>
    </div>
  );
}
