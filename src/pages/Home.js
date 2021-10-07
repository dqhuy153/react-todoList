import React, { useState, useContext, useEffect } from 'react';
import Card from '../components/UI/Card/Card';
import Input from '../components/UI/Input/Input';
import iconAddCircle from '../assets/images/add_circle.png';
import iconKey from '../assets/images/keyboard_tab.png';

import RoomList from '../components/room/RoomList';
import Modal1 from '../components/UI/Modal/Modal1';

import styles from './Home.module.scss';
import DataContext from '../store/data/data-context';

// const roomTitleReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return { roomTitle: action.val, isValid: action.val.trim().length > 0 };
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.value.trim().length > 0 };
//   }
//   return { value: '', isValid: false };
// };

// const roomPasswordReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return { roomPassword: action.val, isValid: action.val.trim().length > 6 };
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.value.trim().length > 6 };
//   }
//   return { value: '', isValid: false };
// };

function Home(props) {
  const dataCtx = useContext(DataContext);

  const [roomsData, setRoomsData] = useState({
    createdRooms: [],
    joinedRooms: [],
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const [showFullCreatedRoom, setShowFullCreatedRoom] = useState(false);
  const [showFullJoinedRoom, setShowFullJoinedRoom] = useState(false);

  const [titleCreateRoom, setTitleCreateRoom] = useState();
  const [passwordCreateRoom, setPasswordCreateRoom] = useState();
  const [idJoinRoom, setIdJoinRoom] = useState();
  const [passwordJoinRoom, setPasswordJoinRoom] = useState();

  useEffect(() => {
    setRoomsData(
      dataCtx.roomsData !== null
        ? dataCtx.roomsData
        : { createdRooms: [], joinedRooms: [] }
    );
  }, [dataCtx.roomsData]);

  // console.log(roomsData);

  // const [formIsValid, setFormIsValid] = useState(false);

  // const [emailState, dispatchEmail] = useReducer(roomTitleReducer, {
  //   value: '',
  //   isValid: false,
  // });

  // const [passwordState, dispatchPassword] = useReducer(roomPasswordReducer, {
  //   value: '',
  //   isValid: false,
  // });

  // useEffect(() => {
  //   //the useEffect run after every components render in life cycle
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANING UP');
  //   };
  // }, [passwordState.value]);

  //show/hide full room handlers
  const handleToggleFullCreatedRoom = () => {
    setShowFullCreatedRoom((prev) => !prev);
  };

  const handleToggleFullJoinedRoom = () => {
    setShowFullJoinedRoom((prev) => !prev);
  };

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

  //edit room handler

  //delete room handler

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

    dataCtx.onJoinRoom(parseInt(idJoinRoom), passwordJoinRoom, true);

    setIdJoinRoom('');
    setPasswordJoinRoom('');

    setShowJoinModal(false);
  };

  //leave room handler

  return (
    // workspace
    <div className={styles.container}>
      {/*your workspaces */}
      {/* title */}
      <div className={styles.container__workspaces}>
        <div className={styles['container__workspaces--head']}>
          <h1>Your WorkSpaces</h1>
          <Card className={styles['btn-card']}>
            <button
              onClick={showModalCreateHandler}
              className={styles.button__tools}
            >
              <img src={iconAddCircle} alt="add icon" />
              Room
            </button>
          </Card>
        </div>
      </div>
      {/* own room */}
      {/* <Card className={`${styles.room} ${styles['own__room--blue']}`}>
        <NavLink
          to={`/room/0`}
          className={styles['room_link']}
        >
          <p>{ROOM.ownRoom.nameRoom}</p>
        </NavLink>
      </Card> */}
      {/* created rooms */}
      {/* minimal room list */}
      {!showFullCreatedRoom && (
        <div className={styles.room_list}>
          <RoomList
            items={roomsData.createdRooms?.slice(0, 4)}
            backgroundColor="#ff6868"
            textColor="#fff"
          />
        </div>
      )}
      {/* full room list */}
      {showFullCreatedRoom && (
        <div className={styles.room_list}>
          <RoomList
            items={roomsData.createdRooms}
            backgroundColor="#ff6868"
            textColor="#fff"
          />
        </div>
      )}
      {/* show browser all if has 5 room or more */}
      {roomsData.createdRooms?.length > 4 && (
        <div>
          <button
            onClick={handleToggleFullCreatedRoom}
            className={styles['container__recent--show__rooms']}
          >
            {!showFullCreatedRoom
              ? 'Browser all your created room'
              : 'Show less'}
          </button>
        </div>
      )}
      {/* recent joined rooms */}
      <div
        className={`${styles.container__workspaces} ${styles.container__bottom}`}
      >
        <div className={styles['container__workspaces--bottom']}>
          <h1>Recent joined</h1>
          <Card className={styles['btn-card']}>
            <button
              onClick={showModalJoinHandler}
              className={styles.button__tools}
            >
              <img src={iconKey} alt="add icon" />
              Join
            </button>
          </Card>
        </div>

        <div className={styles.room_list}>
          {/* minimal room list */}
          {!showFullJoinedRoom && (
            <RoomList
              items={roomsData.joinedRooms?.slice(0, 4)}
              backgroundColor="#ff8368"
              textColor="#fff"
              showOption={false}
            />
          )}
          {/* full room list */}
          {showFullJoinedRoom && (
            <RoomList
              items={roomsData.joinedRooms}
              backgroundColor="#ff8368"
              textColor="#fff"
              showOption={false}
            />
          )}
        </div>
        {/* show browser all if has 5 room or more */}
        {roomsData.joinedRooms?.length > 4 && (
          <button
            onClick={handleToggleFullJoinedRoom}
            className={styles['container__recent--show__rooms']}
          >
            {!showFullJoinedRoom ? 'Browser all your joined room' : 'Show less'}
          </button>
        )}
      </div>
      {/* create new room modal */}
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
              value={titleCreateRoom || ''}
            />
            <Input
              onChange={handleRoomPasswordChange}
              type="password"
              placeholder="Room password"
              value={passwordCreateRoom || ''}
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
              value={idJoinRoom || ''}
            />
            <Input
              onChange={handleJoinRoomPasswordChange}
              type="password"
              placeholder="Room password"
              value={passwordJoinRoom || ''}
            />
          </div>
        </Modal1>
      )}
    </div>
  );
}

export default React.memo(Home);
