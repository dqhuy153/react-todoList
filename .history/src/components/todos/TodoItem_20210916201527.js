import React, { useState } from 'react';

import styles from './TodoItem.module.scss';

export default function TodoItem({
  title,
  date,
  status,

  onChange,
  ...props
}) {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.container}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <p>{title}</p>
      <p>{date}</p>
    </div>
  );
}
