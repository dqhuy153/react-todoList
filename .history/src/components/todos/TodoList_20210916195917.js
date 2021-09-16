import React from 'react';
import TodoItem from './TodoItem';

import styles from './TodoList.module.scss';

export default function TodoList({ items, ...props }) {
  return (
    <ul className={styles.container}>
      {items.map((i) => (
        <li key={items.id}>
          <TodoItem
            title={items.title}
            date={items.date}
            status={items.status}
          />
        </li>
      ))}
    </ul>
  );
}
