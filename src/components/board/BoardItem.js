import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';

import TodoItem from '../todo/TodoItem';
import Button1 from '../UI/Button/Button1';
import AddTitleRoom from '../UI/Form/AddTitleForm';
import Modal1 from '../UI/Modal/Modal1';

import styles from './BoardItem.module.scss';

export default function BoardItem({
  id,
  title,
  tasksData,
  onSaveClick,
  onDeleteClick,

  ...props
}) {
  const [tasks, setTasks] = useState(tasksData);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [showBoardDetail, setShowBoardDetail] = useState(false);
  const [boardTitle, setBoardTitle] = useState(title);

  //board handler
  const handleShowBoardDetail = () => {
    setShowBoardDetail(true);
  };

  const handleHideBoardDetail = () => {
    setShowBoardDetail(false);
  };

  const handleSaveClick = () => {
    if (!boardTitle || boardTitle.trim() === '') {
      return alert("Task's title is required!");
    }

    onSaveClick({
      id,
      title: boardTitle,
    });

    handleHideBoardDetail();
  };

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

  //task handlers
  const handleTaskStatusChange = (taskId) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.status = !task.status;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };
  const handleSaveTask = (taskData) => {
    let updatedTask = tasks.map((task) => {
      if (task.id === taskData.id) {
        task.title = taskData.title;
        task.detail = taskData.detail;
        task.date = taskData.date;
        task.status = taskData.status;
      }

      return task;
    });

    setTasks(updatedTask);
  };

  //new tasks handlers
  const handleShowNewTaskForm = () => {
    setShowNewTask((prev) => !prev);
  };

  const handleNewTaskChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTaskTitle || newTaskTitle.trim() === '') {
      return alert("Task's title is required!");
    }

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
      {/* board header */}
      <div className={styles.header}>
        <p>{title}</p>
        <MdEdit size={15} onClick={handleShowBoardDetail} />
      </div>
      {showBoardDetail && (
        <Modal1
          inputTitle={true}
          valueInput={boardTitle}
          onChangeInput={(e) => setBoardTitle(e.target.value)}
          btn1="Delete"
          onBtn1Click={() => onDeleteClick(id)}
          btn1Color="#FFCFCF"
          btn1Width="20%"
          btn2="Cancel"
          btn2Color="#DADADA"
          onBtn2Click={handleHideBoardDetail}
          btn2Width="20%"
          btn3="Save"
          btn3Color="var(--primary-color)"
          onBtn3Click={handleSaveClick}
          btn3Width="20%"
          marginLeftBtn="2.2rem"
          onBackdropClick={handleHideBoardDetail}
          onCloseClick={handleHideBoardDetail}
          btnFontSize="0.9rem"
          btnFontWeight="600"
        ></Modal1>
      )}

      {/* board's tasks */}
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
                onDeleteClick={handleDeleteTask}
                onSaveClick={handleSaveTask}
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
              buttonWidth="50%"
              buttonFontSize="0.9rem"
            />
          )}
        </li>
      </ul>
    </div>
  );
}
