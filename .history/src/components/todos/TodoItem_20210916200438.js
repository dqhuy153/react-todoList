import React from 'react';

import styles from './TodoItem.module.scss';

export default function TodoItem({ title, date, status, onChange, ...props }) {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={status === 1 ? true : false}
        onChange={onChange}
      />
      <p>{title}</p>
    </div>
  );
}
