import React from 'react';
import { IoMdClose } from 'react-icons/io';

import { getFirstLetterOfName } from '../../util/helper';
import MemberIcon from '../member/MemberIcon';

import styles from './CommentItem.module.scss';

export default function CommentItem({
  commentId,
  userId,
  username,
  content,
  date,
  isCurrentUser,

  onDeleteComment,
  ...props
}) {
  return (
    <div className={styles.container}>
      <div className={styles['comment-left']}>
        <MemberIcon firstLetter={getFirstLetterOfName(username)} />
        <p className={styles.content}>{content}</p>
      </div>
      <div className={styles['comment-right']}>
        <p>{date}</p>
        {isCurrentUser && <IoMdClose size={18} onClick={onDeleteComment} />}
      </div>
    </div>
  );
}
