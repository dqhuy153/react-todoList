import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Room.module.scss';
import MemberList from '../components/member/MemberList';
import BoardList from '../components/board/BoardList';
import RoomSetting from '../components/room/RoomSetting';

const roomInfo = {
  name: 'Room title',
  id: '10',
  password: '123456',
  userId: 3,
  isCreator: true,
  members: [
    {
      id: 1,
      name: 'Andy',
    },
    {
      id: 2,
      name: 'Chien',
    },
    {
      id: 3,
      name: 'Huy',
    },
    {
      id: 4,
      name: 'Xin',
    },
    {
      id: 5,
      name: 'Nguyen Van A',
    },
    {
      id: 6,
      name: 'Nguyen Van Le ABC',
    },
  ],
  boards: [
    {
      id: 1,
      title: 'Board 1',
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          detail: 'Description task 1',
          date: '2021-09-24',
          status: false,
        },
        {
          id: 2,
          title: 'Task 2',
          detail: 'Description task 2',
          date: '2021-09-25',
          status: true,
        },
        {
          id: 3,
          title: 'Task 3',
          detail: 'Description task 3',
          date: '2021-09-25',
          status: false,
        },
        {
          id: 4,
          title: 'Task 4',
          detail: 'Description task 4',
          date: '2021-09-26',
          status: true,
        },
        {
          id: 5,
          title: 'Task 5',
          detail: 'Description task 5',
          date: '2021-09-26',
          status: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Board 2 with very long name',
      tasks: [
        {
          id: 6,
          title: 'Task 6',
          detail: 'Description task 6',
          date: '2021-09-24',
          status: false,
        },
        {
          id: 7,
          title: 'Task 7',
          detail: 'Description task 7',
          date: '2021-09-25',
          status: true,
        },
      ],
    },
    {
      id: 3,
      title: 'Board 3',
      tasks: [
        {
          id: 8,
          title: 'Task 8',
          detail: 'Description task 8',
          date: '2021-09-25',
          status: false,
        },
        {
          id: 9,
          title: 'Task 9',
          detail: 'Description task 9',
          date: '2021-09-25',
          status: true,
        },
        {
          id: 10,
          title: 'Task 10',
          detail: 'Description task 10',
          date: '2021-09-26',
          status: true,
        },
        {
          id: 11,
          title: 'Task 11',
          detail: 'Description task 11',
          date: '2021-09-26',
          status: false,
        },
      ],
    },
  ],
};

export default function Room(props) {
  const [boards, setBoards] = useState(roomInfo.boards);
  const [members, setMembers] = useState(roomInfo.members);

  const { roomId } = useParams();

  useEffect(() => {
    setMembers(
      roomInfo.members.map((member) => {
        return {
          ...member,
          isCreator: member.id === roomInfo.userId ? true : false,
        };
      })
    );
  }, []);

  //member handlers
  const handleRemoveMember = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  //board handlers
  const handleCreateNewBoard = (boardTitle) => {
    setBoards((prev) => {
      const updatedBoard = prev;

      updatedBoard.push({
        id: Math.random(),
        title: boardTitle,
        tasks: [],
      });

      return updatedBoard;
    });
  };

  const handleSaveBoard = (boardData) => {
    let updatedBoard = boards.map((board) => {
      if (board.id === boardData.id) {
        board.title = boardData.title;
      }

      return board;
    });

    setBoards(updatedBoard);
  };

  const handleDeleteBoard = (boardId) => {
    setBoards((prev) => prev.filter((board) => board.id !== boardId));
  };

  return (
    <div className={styles.container}>
      {/* room information */}
      <div className={styles['room-header']}>
        <h2 className={styles.title}>
          {roomInfo.name} - ID: {roomId}
        </h2>
        <div className={styles.icons}>
          <MemberList items={members}></MemberList>
          {/* creator can see room setting */}
          {roomInfo.isCreator && (
            <RoomSetting
              className={styles.settingIcon}
              id={roomId}
              password={roomInfo.password}
              members={members}
              onRemoveMember={handleRemoveMember}
            />
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
