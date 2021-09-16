import React from 'react';
import TodoItem from './TodoItem';

import styles from './TodoList.module.scss';

export default function TodoList({ items, ...props }) {
  return (
    <ul className={styles.container}>
      {items.map((i) => (
        <li>
          <TodoItem />
        </li>
      ))}
    </ul>
  );
}
