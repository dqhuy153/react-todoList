import React, { useContext, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { MdClose, MdMoreHoriz } from 'react-icons/md';

import Card from '../UI/Card/Card';

import styles from './RoomItem.module.scss';
import { BiTrash } from 'react-icons/bi';
import Button1 from '../UI/Button/Button1';
import DataContext from '../../store/data/data-context';
import Modal1 from '../UI/Modal/Modal1';

export default function RoomItem({ id, showOption, name, password, ...props }) {
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const [updatedRoomTitle, setUpdatedRoomTitle] = useState(name);
  const [updatedRoomPassword, setUpdatedRoomPassword] = useState(password);

  const dataCtx = useContext(DataContext);

  //modal handlers
  const handleShowOption = () => {
    setShowOptionModal(true);
  };

  const handleHideOption = () => {
    setShowOptionModal(false);
  };

  const handleShowConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleHideConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  //room handlers
  const handleSaveRoom = async () => {
    if (!updatedRoomTitle || updatedRoomTitle.trim().length === 0) {
      return alert('Room title is required!');
    }

    if (!updatedRoomPassword || updatedRoomPassword.length < 4) {
      return alert("Minimum length's password is 4!");
    }

    const updatedData = {
      title: updatedRoomTitle,
      password: updatedRoomPassword,
    };

    await dataCtx.onEditRoom(id, updatedData, true);

    setShowOptionModal(false);
  };

  const handleDeleteRoom = () => {
    dataCtx.onDeleteRoom(id);
  };

  return (
    <div className={styles['container__recent--child']}>
      {showOption && (
        <MdMoreHoriz
          size={22}
          color="#fff"
          onClick={showOption ? handleShowOption : null}
          className={styles['more-icon']}
        />
      )}
      <NavLink
        to={`/room/${id}`}
        className={styles['container__recent--child']}
      >
        <Card className={`${styles.room} ${styles['own__room--organ']}`}>
          <p>{name}</p>
        </Card>
      </NavLink>
      {showOptionModal && (
        <Card className={styles['option-container']}>
          <div className={`${styles['option-header']} flex-sb`}>
            <input
              value={updatedRoomTitle}
              placeholder="Room name..."
              onChange={(e) => setUpdatedRoomTitle(e.target.value)}
            />
            <MdClose size={20} onClick={handleHideOption} />
          </div>
          <div className={styles['option-content']}>
            <p>Password: </p>
            <input
              value={updatedRoomPassword}
              placeholder="New password ..."
              onChange={(e) => setUpdatedRoomPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className={styles['option-footer']}>
            <Button1
              buttonWidth="75%"
              buttonFontSize="0.8rem"
              className={styles.btn}
              buttonFontWeight="500"
              onClick={handleSaveRoom}
            >
              Save
            </Button1>
            <Button1
              buttonWidth="8%"
              buttonColor="#fff"
              className={`${styles.btn} ${styles['delete-icon']}`}
              onClick={handleShowConfirmDeleteModal}
            >
              <BiTrash size={15} />
            </Button1>
          </div>
        </Card>
      )}
      {showConfirmDeleteModal && (
        <Modal1
          title={`Delete room "${name}" ?`}
          btn1="No"
          btn1Width="25%"
          btn1Color="#DADADA"
          onBtn1Click={handleHideConfirmDeleteModal}
          onBackdropClick={handleHideConfirmDeleteModal}
          btn2="Yes"
          btn2Width="25%"
          btn2Color="var(--primary-color)"
          onBtn2Click={handleDeleteRoom}
          btnFontWeight="500"
          onCloseClick={handleHideConfirmDeleteModal}
        />
      )}
    </div>
  );
}
