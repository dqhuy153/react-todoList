import React from 'react';
import TodoItem from './TodoItem';

import styles from './TodoList.module.scss';

export default function TodoList({ items, onChange, ...props }) {
  return (
    <ul className={styles.container}>
      {items.map((item) => (
        <li key={item.id}>
          <TodoItem
            title={item.title}
            date={item.date}
            status={item.status}
            onChange={onChange}
          />
        </li>
      ))}
    </ul>
  );
}
