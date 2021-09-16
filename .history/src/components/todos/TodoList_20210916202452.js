import React from 'react';
import TodoItem from './TodoItem';

import styles from './TodoList.module.scss';

export default function TodoList({ items, onStatusChange, ...props }) {
  return (
    <ul className={styles.container}>
      {items.map((item) => (
        <li key={item.id}>
          <TodoItem
            id={item.id}
            title={item.title}
            date={item.date}
            status={item.status}
            checked={item.status}
            onChange={onChange}
            onStatusChange={onStatusChange}
          />
        </li>
      ))}
    </ul>
  );
}
