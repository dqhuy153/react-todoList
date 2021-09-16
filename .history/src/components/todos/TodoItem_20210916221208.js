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
    <div className={styles.container}>
      <div className={styles.task}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onStatusChange(id)}
        />
        <p>{title}</p>
      </div>
      <p className={styles.date}>{date.toLocaleString()}</p>
      <button>X</button>
    </div>
  );
}
