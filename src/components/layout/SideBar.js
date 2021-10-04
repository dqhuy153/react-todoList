import React, { useContext, useState } from 'react';
import { MdDashboard, MdKeyboardTab } from 'react-icons/md';
import { BsPlusCircleFill, BsGrid3X3GapFill } from 'react-icons/bs';
import DataContext from '../../store/data/data-context';

import styles from './SideBar.module.scss';
import Modal1 from '../UI/Modal/Modal1';
import Input from '../UI/Input/Input';

export default function SideBar(props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const [titleCreateRoom, setTitleCreateRoom] = useState();
  const [passwordCreateRoom, setPasswordCreateRoom] = useState();
  const [idJoinRoom, setIdJoinRoom] = useState();
  const [passwordJoinRoom, setPasswordJoinRoom] = useState();

  const dataCtx = useContext(DataContext);

  const showModalCreateHandler = () => {
    setShowCreateModal(true);
  };

  const hideModalCreateHandler = () => {
    setShowCreateModal(false);
  };

  const showModalJoinHandler = () => {
    setShowJoinModal(true);
  };

  const hideModalJoinHandler = () => {
    setShowJoinModal(false);
  };

  //create new room handlers
  const handleRoomTitleChange = (e) => {
    setTitleCreateRoom(e.target.value);
  };
  const handleRoomPasswordChange = (e) => {
    setPasswordCreateRoom(e.target.value);
  };

  const handleCreateNewRoom = () => {
    if (!titleCreateRoom || titleCreateRoom.trim().length === 0) {
      return alert('Room title is required!');
    }

    if (!passwordCreateRoom || passwordCreateRoom.trim().length === 0) {
      return alert('Room password is required!');
    }

    if (!passwordCreateRoom || passwordCreateRoom.trim().length < 4) {
      return alert("Minimum length's password is 4!");
    }

    dataCtx.onCreateRoom(titleCreateRoom, passwordCreateRoom, true);

    setTitleCreateRoom('');
    setPasswordCreateRoom('');

    setShowCreateModal(false);
  };

  //join room handlers
  const handleJoinRoomIdChange = (e) => {
    setIdJoinRoom(e.target.value);
  };
  const handleJoinRoomPasswordChange = (e) => {
    setPasswordJoinRoom(e.target.value);
  };
  const handleJoinNewRoom = () => {
    if (!idJoinRoom || idJoinRoom.trim().length === 0) {
      return alert('Room title is required!');
    }

    if (!passwordJoinRoom || passwordJoinRoom.trim().length === 0) {
      return alert('Room password is required!');
    }

    dataCtx.onJoinRoom(idJoinRoom, passwordJoinRoom, true);

    setIdJoinRoom('');
    setPasswordJoinRoom('');

    setShowJoinModal(false);
  };

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
          {/* recent room list */}
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
            <Input
              onChange={handleRoomTitleChange}
              placeholder="Room title"
              value={titleCreateRoom}
            />
            <Input
              onChange={handleRoomPasswordChange}
              type="password"
              placeholder="Room password"
              value={passwordCreateRoom}
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
            <Input
              onChange={handleJoinRoomIdChange}
              placeholder="Room ID"
              value={idJoinRoom}
            />
            <Input
              onChange={handleJoinRoomPasswordChange}
              type="password"
              placeholder="Room password"
              value={passwordJoinRoom}
            />
          </div>
        </Modal1>
      )}
    </div>
  );
}
