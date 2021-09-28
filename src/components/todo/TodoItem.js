import { useContext, useEffect, useState } from 'react';

import { BiEdit } from 'react-icons/bi';
import { IoIosSend } from 'react-icons/io';
import AuthContext from '../../store/Auth/auth-context';
import { getFirstLetterOfName } from '../../util/helper';
import CommentItem from '../comment/CommentItem';
import MemberIcon from '../member/MemberIcon';

import Modal1 from '../UI/Modal/Modal1';

import styles from './TodoItem.module.scss';

const comments = [
  {
    commentId: 1,
    userId: 3,
    username: 'Huy',
    content: 'Some comment here',
    date: '18:30 24/9/21',
  },
  {
    commentId: 2,
    userId: 2,
    username: 'Chien',
    content: 'This task has been done!',
    date: '16:30 24/9/21',
  },
];

export default function TodoItem({
  id,
  title,
  date,
  completed,
  description,
  onStatusChange,
  onSaveClick,
  onDeleteClick,
  onCancelClick,
  ...props
}) {
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDesc, setTaskDesc] = useState(description);
  const [taskComplete, setTaskComplete] = useState(completed);

  const [newComment, setNewComment] = useState('');
  const [taskComments, setTaskComments] = useState(comments);

  const authCtx = useContext(AuthContext);

  //add isCurrentUser to taskComments
  useEffect(() => {
    if (authCtx.userInfo) {
      setTaskComments(
        comments.map((comment) => {
          return {
            ...comment,
            isCurrentUser:
              authCtx.userInfo.userId === comment.userId ? true : false,
          };
        })
      );
    }
  }, [authCtx.userInfo]);

  //task handlers
  const handleSaveTaskClick = () => {
    if (!taskTitle || taskTitle.trim() === '') {
      return alert("Task's title is required!");
    }

    const updatedTaskData = {
      id,
      title: taskTitle,
      detail: taskDesc,
      date,
      status: taskComplete,
    };

    onSaveClick(updatedTaskData);

    handleHideDetail();
  };

  const handleDeleteTaskClick = () => {
    onDeleteClick(id);

    handleHideDetail();
  };

  //comment handlers
  const handleAddNewComment = (e) => {
    e.preventDefault();

    if (!newComment || newComment.trim() === '') {
      return alert("Your comment can't be empty.");
    }

    const updatedComments = taskComments;

    updatedComments.unshift({
      commentId: Math.random(),
      userId: authCtx.userInfo.userId,
      username: authCtx.userInfo.username,
      content: newComment,
      date: new Date().toLocaleString(),
      isCurrentUser: true,
    });

    setTaskComments(updatedComments);

    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    setTaskComments((prev) =>
      prev.filter((comment) => comment.commentId !== commentId)
    );
  };

  //modal handlers
  const handleShowDetail = () => {
    setShowTaskDetail(true);
  };

  const handleHideDetail = () => {
    setShowTaskDetail(false);
  };

  return (
    <div
      className={`${styles.container} ${styles.flex} ${
        completed ? styles.completed : null
      }`}
    >
      <div className={styles.task}>
        <input type="checkbox" checked={completed} onChange={onStatusChange} />
        <p>{title}</p>
      </div>
      <div className={styles.edit} onClick={handleShowDetail}>
        <BiEdit size={15} />
      </div>
      {/* Modal Task detail */}
      {showTaskDetail && (
        <Modal1
          inputTitle={true}
          title={title}
          valueInput={taskTitle}
          onChangeInput={(e) => setTaskTitle(e.target.value)}
          btn1="Delete"
          onBtn1Click={handleDeleteTaskClick}
          btn1Color="#FFCFCF"
          btn1Width="20%"
          btn2="Cancel"
          btn2Color="#DADADA"
          onBtn2Click={handleHideDetail}
          btn2Width="20%"
          btn3="Save"
          btn3Color="var(--primary-color)"
          onBtn3Click={handleSaveTaskClick}
          btn3Width="20%"
          marginLeftBtn="2.2rem"
          onBackdropClick={handleHideDetail}
          onCloseClick={handleHideDetail}
          btnFontSize="0.9rem"
          btnFontWeight="600"
        >
          {/* task content */}
          <div className={styles['modal-content']}>
            <div className={styles.content}>
              <textarea
                placeholder="Description..."
                onChange={(e) => setTaskDesc(e.target.value)}
                value={taskDesc}
              ></textarea>
              <div className={`${styles.info} ${styles.flex}`}>
                <div className={styles['info-complete']}>
                  <input
                    type="checkbox"
                    checked={taskComplete}
                    onChange={(e) => setTaskComplete((prev) => !prev)}
                  />
                  <p>Complete</p>
                </div>
                <p className={styles.date}>{date.toLocaleString()}</p>
              </div>
            </div>
            {/* comments */}
            <p className={styles['comments-title']}>Comments</p>
            {/* new comment */}
            <form
              className={styles['new-comment']}
              onSubmit={handleAddNewComment}
            >
              <MemberIcon
                firstLetter={getFirstLetterOfName(authCtx.userInfo.username)}
                className={styles['member-icon']}
              />
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Your comment..."
              />
              <button type="submit">
                <IoIosSend size={18} />
              </button>
            </form>
            {/* comment list */}
            <ul className={styles.comments}>
              {taskComments.map((comment) => (
                <li key={comment.commentId}>
                  <CommentItem
                    commentId={comment.commentId}
                    userId={comment.userId}
                    username={comment.username}
                    content={comment.content}
                    date={comment.date}
                    isCurrentUser={comment.isCurrentUser}
                    onDeleteComment={() =>
                      handleDeleteComment(comment.commentId)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </Modal1>
      )}
    </div>
  );
}
