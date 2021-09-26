import React, { useState } from 'react';
import Card from '../UI/Card/Card';
import AddTitleRoom from '../UI/Form/AddTitleForm';
import BoardItem from './BoardItem';

import styles from './BoardList.module.scss';

export default function BoardList({
  items,
  onCreateNewBoard,
  onDeleteTaskClick,
  onEditTaskClick,
  onTaskStatusChange,
  ...props
}) {
  const [showNewBoard, setShowNewBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const handleShowNewBoardForm = () => {
    setShowNewBoard((prev) => !prev);
  };

  const handleNewBoardChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateNewBoard(newBoardTitle);

    setShowNewBoard(false);
    setNewBoardTitle('');
  };

  const handleClose = () => {
    setShowNewBoard(false);
  };

  return (
    <ul className={styles.container}>
      {/* list existing board */}
      {items &&
        items.map((board) => (
          <li className={styles['board-container']} key={board.id}>
            <Card>
              <BoardItem
                id={board.id}
                title={board.title}
                tasksData={board.tasks}
              />
            </Card>
          </li>
        ))}
      {/* create new board */}
      <li className={styles['new-board-container']}>
        {!showNewBoard && (
          <Card className={styles['new-board-btn']}>
            <button onClick={handleShowNewBoardForm}>
              New board <span>+</span>
            </button>
          </Card>
        )}
        {showNewBoard && (
          <Card className={styles['new-board-form']}>
            <AddTitleRoom
              multiple={true}
              placeholder="Enter board title..."
              buttonText="Add board"
              onChange={handleNewBoardChange}
              value={newBoardTitle}
              onSubmit={handleSubmit}
              onClose={handleClose}
            />
          </Card>
        )}
      </li>
    </ul>
  );
}
