import React, { useState } from 'react';
import { MdDashboard, MdKeyboardTab } from 'react-icons/md';
import { BsPlusCircleFill, BsGrid3X3GapFill } from 'react-icons/bs';

import styles from './SideBar.module.scss';
import Modal1 from '../UI/Modal/Modal1';
import Input from '../UI/Input/Input';

export default function SideBar(props) {
  const [showCreateModal, setCreateModal] = useState(false);
  const [showJoinModal, setJoinModal] = useState(false);

  const showModalCreateHandler = () => {
    setCreateModal(true);
  };

  const hideModalCreateHandler = () => {
    setCreateModal(false);
  };

  const showModalJoinHandler = () => {
    setJoinModal(true);
  };

  const hideModalJoinHandler = () => {
    setJoinModal(false);
  };

  //create new room handlers
  const handleRoomTitleChange = (e) => {};
  const handleRoomPasswordChange = (e) => {};

  const handleCreateNewRoom = () => {
    props.onCancel();
  };

  const handleJoinNewRoom = () => {};

  return (
    <div className={styles.container}>
      <ul className={styles['side-bar-list']}>
        {/* Room */}
        <li className={styles.active}>
          <MdDashboard size={23} />
          <p>Boards</p>
        </li>
        <li onClick={showModalCreateHandler}>
          <BsPlusCircleFill size={23} />
          <p>Create Room</p>
        </li>
        <li onClick={showModalJoinHandler}>
          <MdKeyboardTab size={23} />
          <p>Join Room</p>
        </li>
        <li className={styles.active}>
          <BsGrid3X3GapFill size={23} />
          <p>Recent Rooms</p>
        </li>
      </ul>
      {/* modals */}
      {/* create room modals */}
      {showCreateModal && (
        <Modal1
          title="Crate New Room"
          btn1="Cancel"
          btn1Color="#DADADA"
          btn1Width="25%"
          onBtn1Click={hideModalCreateHandler}
          btn2="Create"
          btn2Color="var(--primary-color)"
          btn2Width="25%"
          onBtn2Click={handleCreateNewRoom}
          onCloseClick={hideModalCreateHandler}
          onBackdropClick={hideModalCreateHandler}
          btnFontWeight="500"
        >
          <div className={styles['join__room--field__input']}>
            <Input onChange={handleRoomTitleChange} placeholder="Room title" />
            <Input
              onChange={handleRoomPasswordChange}
              type="password"
              placeholder="Room password"
            />
          </div>
        </Modal1>
      )}
      {/* join new room modal */}
      {showJoinModal && (
        <Modal1
          title="Join a Room"
          btn1="Cancel"
          btn1Color="#DADADA"
          btn1Width="25%"
          onBtn1Click={hideModalJoinHandler}
          btn2="Join"
          btn2Color="var(--primary-color)"
          btn2Width="25%"
          onBtn2Click={handleJoinNewRoom}
          onCloseClick={hideModalJoinHandler}
          onBackdropClick={hideModalJoinHandler}
          btnFontWeight="500"
        >
          <div className={styles['join__room--field__input']}>
            <Input onChange={handleRoomTitleChange} placeholder="Room ID" />
            <Input
              onChange={handleRoomPasswordChange}
              type="password"
              placeholder="Room password"
            />
          </div>
        </Modal1>
      )}
    </div>
  );
}
