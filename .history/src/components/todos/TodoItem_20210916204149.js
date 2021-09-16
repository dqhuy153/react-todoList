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
  const [checked, setChecked] = useState(status);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onStatusChange(id);
  };

  return (
    <div className={styles.container}>
      <div>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <p>{title}</p>
      </div>
      <p>{date.toLocaleString()}</p>
    </div>
  );
}
