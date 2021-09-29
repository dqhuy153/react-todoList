import React, { useState, useEffect, useReducer } from 'react';
import styles from './Home.module.scss';
import Button from '../components/UI/Button/Button';
import Card from '../components/UI/Card/Card';
import Input from '../components/UI/Input/Input';
import iconAddCircle from '../assets/images/add_circle.png';
import iconKey from '../assets/images/keyboard_tab.png';
import ToggleSubmit from '../components/UI/ToggleSubmit/ToggleSubmit';
import { NavLink } from 'react-router-dom';

const roomTitleReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { roomTitle: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: '', isValid: false };
};

const roomPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { roomPassword: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const ROOM = {
  ownRoom: {
    id: 0,
    nameRoom: 'Name your own',
  },
  createdRooms: [
    {
      id: 1,
      nameRoom: 'Room 1',
    },
    {
      id: 2,
      nameRoom: 'Room 2',
    },
    {
      id: 3,
      nameRoom: 'Room 3',
    },
    {
      id: 4,
      nameRoom: 'Room 4',
    },
    {
      id: 5,
      nameRoom: 'Room 5',
    },
    {
      id: 6,
      nameRoom: 'Room 6',
    },
    {
      id: 7,
      nameRoom: 'Room 7',
    },
  ],
  joinedRooms: [
    {
      id: 1,
      nameRoom: 'Room huy',
    },
    {
      id: 2,
      nameRoom: 'Room 2',
    },
    {
      id: 3,
      nameRoom: 'Room 3',
    },
    {
      id: 4,
      nameRoom: 'Room 4',
    },
    {
      id: 5,
      nameRoom: 'Room 5',
    },
  ],
};

function Home(props) {
  const [countCard, setCoundCard] = useState(0);
  const [showCreateModal, setCreateModal] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(roomTitleReducer, {
    value: '',
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(roomPasswordReducer, {
    value: '',
    isValid: false,
  });
  useEffect(() => {
    //the useEffect run after every components render in life cycle
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANING UP');
    };
  }, [passwordState.value]);
  const showModalCreateHandler = () => {
    setCreateModal(true);
  };

  const submitHandler = (even) => {
    even.prevenDefault();
    props.onCancel();
  };

  // const createdRoomRender =

  return (
    //div
    //
    
    // workspace
    <div className={styles.container}>
      {/*your workspaces */}
      <div className={styles.container__workspaces}>
        <div className={styles['container__workspaces--head']}>
          <h1>Your WorkSpaces</h1>
          <Button
            onClick={showModalCreateHandler}
            className={styles.button__tools}
          >
            <img src={iconAddCircle} alt="add icon" />
            Room
          </Button>
        </div>
        <Card className={`${styles.room} ${styles['own__room--blue']}`}>
          {ROOM.ownRoom.nameRoom}
        </Card>
      </div>
      <div className={styles.container__recent}>
        <div className={styles['container__recent--chidls']}>
          {ROOM.createdRooms.slice(0, 6).map((room) => (
            <NavLink
              to={`/room/${room.id}`}
              className={styles['container__recent--chidl']}
            >
              <Card
                key={room.id}
                className={`${styles.room} ${styles['own__room--red']}`}
              >
                <p>{room.nameRoom} </p>
                <div className={styles.button__edit}>123456789</div>
              </Card>
            </NavLink>
          ))}
        </div>
      </div>
      <div
        onlick={showModalCreateHandler}
        className={styles['container__recent--show__rooms']}
      >
        Browser all your created room
      </div>
      <div
        className={`${styles.container__workspaces} ${styles.container__bottom}`}
      >
        <div className={styles['container__workspaces--bottom']}>
          <h1>Recent joined</h1>
          <Button
            onClick={showModalCreateHandler}
            className={styles.button__tools}
          >
            <img src={iconKey} alt="add icon" />
            Join
          </Button>
        </div>
      </div>
      <div className={styles.container__recent}>
        <div className={styles['container__recent--chidls']}>
          {ROOM.joinedRooms.slice(0, 4).map((room) => (
            <div className={styles['container__recent--chidl']}>
              <Card className={`${styles.room} ${styles['own__room--organ']}`}>
                <p>{room.nameRoom} </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {showCreateModal && (
        <form className={styles.create__room}>
          <Card className={styles['create__room--field']}>
            <div className={styles['create__room--field__title']}>
              Create New Room
            </div>
            <hr />
            <div className={styles['join__room--field__input']}>
              <Input placeholder="Room title" />
              <Input placeholder="Room password" />
            </div>
            <div className={styles['input__room-create']}>
              <Button>Cancel</Button>
              <Button>Create</Button>
            </div>
          </Card>
        </form>
      )}

      {/* <form className={styles.join__room}>
        <Card className={styles['join__room--field']}>
          <div className={styles['create__room--field__title']}>Join a Room</div>
          <hr />
          <div className={styles['join__room--field__input']}>
            <Input />
            <Input />
            <input placeholder="check"/>

          </div>
          <div className={styles['input__room-create']}>
            <Button >Cancel</Button>
            <Button>Join</Button>
          </div>
        </Card>
      </form> */}
    </div>
  );
}

export default React.memo(Home);
