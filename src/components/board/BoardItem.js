import React, { useContext, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import AuthContext from '../../store/Auth/auth-context';

import TodoItem from '../todo/TodoItem';
import Button1 from '../UI/Button/Button1';
import AddTitleRoom from '../UI/Form/AddTitleForm';
import Modal1 from '../UI/Modal/Modal1';

import styles from './BoardItem.module.scss';

export default function BoardItem({
  id,
  title,
  tasksData = [],
  onSaveClick,
  onDeleteClick,

  ...props
}) {
  const [tasks, setTasks] = useState(tasksData);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [showBoardDetail, setShowBoardDetail] = useState(false);
  const [boardTitle, setBoardTitle] = useState(title);

  const authCtx = useContext(AuthContext);

  //board handler
  const handleShowBoardDetail = () => {
    setShowBoardDetail(true);
  };

  const handleHideBoardDetail = () => {
    setShowBoardDetail(false);
  };

  const handleSaveClick = async () => {
    if (!boardTitle || boardTitle.trim() === '') {
      return alert("Task's title is required!");
    }

    await onSaveClick({
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
  const handleTaskStatusChange = async (taskData) => {
    if (authCtx) {
      const response = await fetch('http://localhost:8080/api/todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx?.userInfo.token,
        },
        body: JSON.stringify({
          id: taskData.id,
          title: taskData.title,
          detail: taskData.detail,
          status: !taskData.status ? 1 : 0,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      const data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }
      let updatedTasks = tasks.map((task) => {
        if (task.id === taskData.id) {
          task.status = !task.status;
        }
        return task;
      });

      setTasks(updatedTasks);
    }
  };

  //delete task
  const handleDeleteTask = async (taskId) => {
    if (authCtx) {
      const response = await fetch('http://localhost:8080/api/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx?.userInfo.token,
        },
        body: JSON.stringify({
          id: taskId,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      const data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  //save task
  const handleSaveTask = async (taskData) => {
    if (authCtx) {
      const response = await fetch('http://localhost:8080/api/todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx?.userInfo.token,
        },
        body: JSON.stringify({
          id: taskData.id,
          title: taskData.title,
          detail: taskData.detail,
          status: taskData.status ? 1 : 0,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      const data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }

      let updatedTask = tasks.map((task) => {
        if (task.id === taskData.id) {
          task.title = taskData.title;
          task.detail = taskData.detail;
          // task.date = taskData.date;
          task.status = taskData.status;
        }

        return task;
      });

      setTasks(updatedTask);
    }
  };

  //new tasks handlers
  const handleShowNewTaskForm = () => {
    setShowNewTask((prev) => !prev);
  };

  const handleNewTaskChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleCreateNewTask = async (e) => {
    e.preventDefault();

    if (!newTaskTitle || newTaskTitle.trim() === '') {
      return alert("Task's title is required!");
    }

    if (authCtx) {
      const dateNow = new Date().toISOString().split('T')[0];

      const response = await fetch('http://localhost:8080/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx?.userInfo.token,
        },
        body: JSON.stringify({
          title: newTaskTitle,
          detail: '',
          publicDate: dateNow,
          status: 0,
          boardId: id,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      const data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }

      //add new tasks
      const updatedTasks = tasks;
      updatedTasks.push({
        id: data.id,
        title: newTaskTitle,
        detail: '',
        publicDate: dateNow,
        status: false,
        modifiedUsername: authCtx.userInfo.username,
        modifyUserId: authCtx.userInfo.userId,
        createdUserId: authCtx.userInfo.userId,
        createdUsername: authCtx.userInfo.username,
      });

      setTasks(updatedTasks);

      //close new task form
      setShowNewTask(false);
      setNewTaskTitle('');
    }
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
                date={task.publicDate.split(' ')[0]}
                title={task.title}
                description={task.detail}
                onStatusChange={() => handleTaskStatusChange(task)}
                onDeleteClick={handleDeleteTask}
                onSaveClick={handleSaveTask}
                modifyUsername={task.modifiedUsername}
                modifyUserId={task.modifyUserId}
                createdUserId={task.createdUserId}
                createdUsername={task.createdUsername}
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
              onSubmit={handleCreateNewTask}
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
