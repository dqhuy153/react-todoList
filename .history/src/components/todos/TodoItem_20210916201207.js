import React from 'react';

import styles from './TodoItem.module.scss';

export default function TodoItem({
  title,
  date,
  status,
  checked,
  onChange,
  ...props
}) {
  return (
    <div className={styles.container}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <p>{title}</p>
      <p>{date}</p>
    </div>
  );
}
