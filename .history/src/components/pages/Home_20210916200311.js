import React from 'react';
import TodoList from '../todos/TodoList';

import styles from './Home.module.scss';

const todoList = [
  {
    id: 1,
    title: 'Task 1',
    date: new Date('2/2/2021'),
    status: 0,
  },
  {
    id: 2,
    title: 'Task 2',
    date: new Date('2/2/2021'),
    status: 0,
  },
];

export default function Home(props) {
  return (
    <div className={styles.container}>
      <h1>Tasks</h1>
      <TodoList items={todoList} />
    </div>
  );
}
