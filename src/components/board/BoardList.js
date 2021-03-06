import React, { useState } from 'react';
import Card from '../UI/Card/Card';
import AddTitleForm from '../UI/Form/AddTitleForm';
import BoardItem from './BoardItem';

import styles from './BoardList.module.scss';

export default function BoardList({
  items = [],
  onCreateNewBoard,
  onDeleteBoardClick,
  onSaveBoardClick,

  ...props
}) {
  const [showNewBoard, setShowNewBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  //board handlers
  const handleShowNewBoardForm = () => {
    setShowNewBoard((prev) => !prev);
  };

  const handleNewBoardChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmitNewBoard = async (e) => {
    e.preventDefault();

    if (!newBoardTitle || newBoardTitle.trim() === '') {
      return alert("Board's title is required!");
    }

    await onCreateNewBoard(newBoardTitle);

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
                tasksData={board.Task}
                onDeleteClick={onDeleteBoardClick}
                onSaveClick={onSaveBoardClick}
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
            <AddTitleForm
              multiple={true}
              placeholder="Enter board title..."
              buttonText="Add board"
              onChange={handleNewBoardChange}
              value={newBoardTitle}
              onSubmit={handleSubmitNewBoard}
              onClose={handleClose}
              buttonWidth="50%"
              buttonFontSize="0.9rem"
            />
          </Card>
        )}
      </li>
    </ul>
  );
}
