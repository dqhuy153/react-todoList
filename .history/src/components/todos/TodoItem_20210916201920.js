import React, { useState } from 'react';

import styles from './TodoItem.module.scss';

export default function TodoItem({
  id,
  title,
  date,
  status,
  onChange,
  ...props
}) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className={styles.container}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <p>{title}</p>
      <p>{date}</p>
    </div>
  );
}
