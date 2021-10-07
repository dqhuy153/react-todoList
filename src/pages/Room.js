import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MemberList from '../components/member/MemberList';
import BoardList from '../components/board/BoardList';
import RoomSetting from '../components/room/RoomSetting';
import AuthContext from '../store/Auth/auth-context';
import Button1 from '../components/UI/Button/Button1';
import Modal1 from '../components/UI/Modal/Modal1';

import styles from './Room.module.scss';
import DataContext from '../store/data/data-context';

export default function Room(props) {
  const [roomInfo, setRoomInfo] = useState();
  const [boards, setBoards] = useState([]);
  const [members, setMembers] = useState([]);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  let isCreator;
  if (authCtx && dataCtx) {
    isCreator =
      roomInfo?.roomInfo?.userId === parseInt(authCtx?.userInfo?.userId);
  }

  const { roomId } = useParams();

  useEffect(() => {
    if (authCtx) {
      dataCtx.onGetRoomInfo(roomId, (data) => {
        if (data) {
          setRoomInfo(data);
          setMembers(
            [
              {
                id: data?.roomInfo.userId,
                username: data?.roomInfo.username,
                isCreator: true,
              },
            ].concat(
              data?.members?.map((member) => {
                return {
                  ...member,
                  isCreator: member.id === data.userId ? true : false,
                };
              })
            )
          );

          setBoards(data?.boards);
        }
      });

      // setRoomInfo(roomInfoDemo);
      // setMembers(roomInfoDemo.members);
    }
    //fake data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, authCtx]);

  //leave modal handlers
  const handleShowLeaveModal = () => {
    setShowLeaveModal(true);
  };

  const handleHideLeaveModal = () => {
    setShowLeaveModal(false);
  };

  //member handlers
  const handleRemoveMember = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleLeaveRoom = () => {
    dataCtx.onLeaveRoom(parseInt(roomId));
  };

  //board handlers
  const handleCreateNewBoard = async (boardTitle) => {
    // send api
    if (authCtx) {
      const response = await fetch('http://localhost:8080/api/board', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx?.userInfo.token,
        },
        body: JSON.stringify({
          name: boardTitle.toString(),
          'room-id': roomInfo?.roomInfo.id,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      const data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }

      //update boards state
      setBoards((prev) => {
        const updatedBoard = prev;

        updatedBoard.push({
          id: data.id || Math.random(),
          title: boardTitle,
          tasks: [],
        });

        return updatedBoard;
      });
    }
  };

  const handleSaveBoard = async (boardData) => {
    if (authCtx) {
      //send api
      const response = await fetch('http://localhost:8080/api/board', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx?.userInfo.token,
        },
        body: JSON.stringify({
          id: boardData.id,
          name: boardData.title,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      const data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }

      //update boards state
      let updatedBoard = boards.map((board) => {
        if (board.id === boardData.id) {
          board.title = boardData.title;
        }

        return board;
      });

      setBoards(updatedBoard);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (authCtx) {
      //send api
      const response = await fetch('http://localhost:8080/api/board', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx?.userInfo.token,
        },
        body: JSON.stringify({
          id: boardId,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      const data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }

      //update boards state
      setBoards((prev) => prev.filter((board) => board.id !== boardId));
    }
  };

  return (
    <div className={styles.container}>
      {/* room information */}
      <div className={styles['room-header']}>
        <h2 className={styles.title}>
          {roomInfo?.roomInfo?.name} - ID: {roomId}
        </h2>
        <div className={styles.icons}>
          <MemberList items={members}></MemberList>
          {/* creator can see room setting */}
          {/* joiner will see leave room btn */}
          {isCreator ? (
            <RoomSetting
              className={styles.settingIcon}
              id={roomId}
              password={roomInfo.roomInfo.password}
              members={members}
              onRemoveMember={handleRemoveMember}
            />
          ) : (
            <>
              <Button1
                buttonColor="#FC6868"
                textColor="#fff"
                onClick={handleShowLeaveModal}
                className={styles['leave-btn']}
              >
                Leave
              </Button1>
              {showLeaveModal && (
                <Modal1
                  title="Do you want to leave room?"
                  onBackdropClick={handleHideLeaveModal}
                  onCloseClick={handleHideLeaveModal}
                  btn1="Cancel"
                  btn1Width="25%"
                  btn1Color="#DADADA"
                  onBtn1Click={handleHideLeaveModal}
                  btn2="OK"
                  btn2Color="var(--primary-color)"
                  btn2Width="25%"
                  btnFontWeight="500"
                  onBtn2Click={handleLeaveRoom}
                />
              )}
            </>
          )}
        </div>
      </div>
      {/* room boards */}
      <div className={styles['room-content']}>
        <BoardList
          items={boards}
          onCreateNewBoard={handleCreateNewBoard}
          onDeleteBoardClick={handleDeleteBoard}
          onSaveBoardClick={handleSaveBoard}
        ></BoardList>
      </div>
    </div>
  );
}
