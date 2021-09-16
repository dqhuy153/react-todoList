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
    <div className={`${styles.container} ${styles.flex}`}>
      <div className={`${styles.task} ${styles.flex}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onStatusChange(id)}
        />
        <p>{title}</p>
      </div>
      <div className={`${styles.container} ${styles.flex}`}>
        <p className={styles.date}>{date.toLocaleString()}</p>
        <div className={`${styles.container} ${styles.flex}`}>
          <button>Edit</button>
          <button>x</button>
        </div>
      </div>
    </div>
  );
}
