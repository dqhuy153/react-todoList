import { useState } from 'react';
import TodoList from '../todos/TodoList';

import styles from './Home.module.scss';

const initTodoList = [
  {
    id: 1,
    title: 'Task 1',
    date: new Date('2/22/2021'),
    completed: false,
  },
  {
    id: 2,
    title: 'Task 2',
    date: new Date('2/2/2021'),
    completed: true,
  },
];

export default function Home(props) {
  const [todoList, setTodoList] = useState(initTodoList);

  const handleStatusChange = (id) => {
    let updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodoList(updatedTodoList);
  };

  return (
    <div className={styles.container}>
      <div className={styles.add}>
        <input />
      </div>
      <h1>Tasks</h1>
      <TodoList
        items={todoList.filter((i) => i.completed === false)}
        onStatusChange={handleStatusChange}
      />
      <h1 className={styles['completed-title']}>Completed</h1>
      <TodoList
        items={todoList.filter((i) => i.completed === true)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
