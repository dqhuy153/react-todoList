import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import ModalTask from '../UI/Modal/ModalTask';
import ToggleSubmit from '../UI/ToggleSubmit/ToggleSubmit';

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
    setShowDetail(true);
  };

  return (
    <div
      className={`${styles.container} ${styles.flex} ${
        completed ? styles.completed : null
      }`}
      onClick={handleShowDetail}
    >
      <div className={styles.task}>
        <input type="checkbox" checked={completed} onChange={onStatusChange} />
        <p>{title}</p>
      </div>
      <div className={styles.edit} onClick={handleShowDetail}>
        <BiEdit size={15} />
      </div>
      {showDetail && <ModalTask title={title} />}
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
