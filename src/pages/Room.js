import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Room.module.scss';
import MemberList from '../components/member/MemberList';
import BoardList from '../components/board/BoardList';

const initBoards = [
  {
    id: 1,
    title: 'Board 1',
  },
  {
    id: 2,
    title: 'Board 2',
  },
  {
    id: 3,
    title: 'Board 3',
  },
];

const initMembers = [
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
];

export default function Room(props) {
  const [boards, setBoards] = useState(initBoards);
  const [members, setMembers] = useState(initMembers);

  const { roomId } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles['room-header']}>
        <h2 className={styles.title}>Room title - {roomId}</h2>
        <MemberList items={members}></MemberList>
      </div>
      <div className={styles['room-content']}>
        <BoardList items={boards}></BoardList>
      </div>
    </div>
  );
}
