import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';

import TodoItem from '../todo/TodoItem';
import Button1 from '../UI/Button/Button1';
import AddTitleRoom from '../UI/Form/AddTitleForm';

import styles from './BoardItem.module.scss';

export default function BoardItem({
  id,
  title,
  tasksData,

  ...props
}) {
  const [tasks, setTasks] = useState(tasksData);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  tasks.sort((x, y) => {
    // false values first
    return x.status === y.status ? 0 : x.status ? 1 : -1;
  });
  // .sort((x, y) => {
  //   // earlier date created first
  //   const dateX = new Date(x.date);
  //   const dateY = new Date(y.date);

  //   console.log(dateX);

  //   return dateX.getTime() < dateY.getTime() ? -1 : 1;
  // });

  const handleTaskStatusChange = (taskId) => {
    let updatedTodoList = tasks.map((task) => {
      if (task.id === taskId) {
        task.status = !task.status;
      }
      return task;
    });

    setTasks(updatedTodoList);
  };

  const handleDeleteTask = (taskId, boardId) => {};
  const handleEditTask = (taskId, boardId) => {};

  const handleShowNewTaskForm = () => {
    setShowNewTask((prev) => !prev);
  };

  const handleNewTaskChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //add new tasks
    const updatedTasks = tasks;
    updatedTasks.push({
      id: Math.random(),
      title: newTaskTitle,
      detail: '',
      date: new Date(),
      status: false,
    });

    setTasks(updatedTasks);

    //close new task form
    setShowNewTask(false);
    setNewTaskTitle('');
  };

  const handleClose = () => {
    setShowNewTask(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>{title}</p>
        <MdEdit size={15} />
      </div>

      <ul className={styles['tasks-container']}>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>
              <TodoItem
                completed={task.status}
                id={task.id}
                date={task.date}
                title={task.title}
                description={task.detail}
                onStatusChange={() => handleTaskStatusChange(task.id)}
                onDeleteClick={() => handleDeleteTask(task.id)}
                onEditClick={() => handleEditTask(task.id)}
              />
            </li>
          ))}
        {/* add new task section */}
        <li className={styles['new-task-container']}>
          {!showNewTask && (
            <Button1 onClick={handleShowNewTaskForm}>
              New task <span>+</span>
            </Button1>
          )}
          {showNewTask && (
            <AddTitleRoom
              multiple={true}
              placeholder="Enter task title..."
              buttonText="Add task"
              onChange={handleNewTaskChange}
              value={newTaskTitle}
              onSubmit={handleSubmit}
              onClose={handleClose}
              buttonWidth="60%"
              buttonFontSize="0.9rem"
            />
          )}
        </li>
      </ul>
    </div>
  );
}
