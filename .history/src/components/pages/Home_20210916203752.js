import TodoList from '../todos/TodoList';

import styles from './Home.module.scss';

const todoList = [
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
  console.log(todoList);
  const handleStatusChange = (id) => {
    const todoIndex = todoList.findIndex((i) => i.id === id);
    todoList[todoIndex].status = !todoList[todoIndex].status;
  };

  return (
    <div className={styles.container}>
      <h1>Tasks</h1>
      <TodoList items={todoList} onStatusChange={handleStatusChange} />
    </div>
  );
}
