import { useState } from 'react';
import styles from './TodoItem.module.scss';

export default function TodoItem({
  id,
  title,
  date,
  completed,
  description,
  onStatusChange,
  onEditClick,
  onDeleteClick,
  ...props
}) {
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = () => {
    // setShowDetail(true);
  };

  return (
    <div
      className={`${styles.container} ${styles.flex}`}
      onClick={handleShowDetail}
    >
      <div className={`${styles.task} ${styles.flex}`}>
        <input type="checkbox" checked={completed} onChange={onStatusChange} />
        <p>{title}</p>
      </div>

      {showDetail && (
        <div className={`${styles.info} ${styles.flex}`}>
          <p className={styles.date}>{date.toLocaleString()}</p>
          <div className={`${styles.buttons} ${styles.flex}`}>
            <button onClick={() => onEditClick(id)}>Edit</button>
            <button onClick={() => onDeleteClick(id)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
