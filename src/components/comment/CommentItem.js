import React from 'react';
import { IoMdClose } from 'react-icons/io';

import { getFirstLetterOfName } from '../../util/helper';
import MemberItem from '../member/MemberItem';

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
        <MemberItem firstLetter={getFirstLetterOfName(username)} id={userId} />
        <p className={styles.content}>
          <span>{username}:</span> {content}
        </p>
      </div>
      <div className={styles['comment-right']}>
        <p>{date}</p>
        {isCurrentUser && <IoMdClose size={18} onClick={onDeleteComment} />}
      </div>
    </div>
  );
}
