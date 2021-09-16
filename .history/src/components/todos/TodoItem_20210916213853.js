import { useState } from 'react';
import styles from './TodoItem.module.scss';

export default function TodoItem({
  id,
  title,
  date,
  completed,
  onStatusChange,
  ...props
}) {
  const [checked, setChecked] = useState(completed);

  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => {
            onStatusChange(id, checked);
            setChecked(e.target.checked);
          }}
        />
        <p>{title}</p>
      </div>
      <p className={styles.date}>{date.toLocaleString()}</p>
    </div>
  );
}
