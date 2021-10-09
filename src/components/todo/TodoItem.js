import { useContext, useEffect, useState } from 'react';

import { BiEdit } from 'react-icons/bi';
import { IoIosSend } from 'react-icons/io';
import AuthContext from '../../store/Auth/auth-context';
import { getFirstLetterOfName } from '../../util/helper';
import CommentItem from '../comment/CommentItem';
import MemberIcon from '../member/MemberIcon';
import MemberItem from '../member/MemberItem';

import Modal1 from '../UI/Modal/Modal1';

import styles from './TodoItem.module.scss';

export default function TodoItem({
  id,
  title,
  date,
  modifyUserId,
  modifyUsername,
  createdUserId,
  createdUsername,
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

  const [latestModifyUsername, setLatestModifyUsername] =
    useState(modifyUsername);

  const [newComment, setNewComment] = useState('');
  const [taskComments, setTaskComments] = useState([]);

  const authCtx = useContext(AuthContext);

  //fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      if (authCtx.userInfo) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/todo/${id}/comments`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authCtx?.userInfo.token,
              },
            }
          );
          if (!response) {
            return alert('Send request to server failed!');
          }

          const data = await response.json();

          if (data.statusCode) {
            return alert(`Error: ${data.message}`);
          }

          //add isCurrentUser to taskComments
          setTaskComments(
            data.map((comment) => {
              return {
                ...comment,
                isCurrentUser:
                  parseInt(authCtx.userInfo.userId) === comment['user-id']
                    ? true
                    : false,
              };
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchComments();
  }, [authCtx.userInfo, id]);

  //task handlers
  const handleSaveTaskClick = async () => {
    if (!taskTitle || taskTitle.trim() === '') {
      return alert("Task's title is required!");
    }

    const updatedTaskData = {
      id,
      title: taskTitle,
      detail: taskDesc,
      // date,
      status: taskComplete,
    };

    await onSaveClick(updatedTaskData);

    setLatestModifyUsername(authCtx.userInfo.username);
    handleHideDetail();
  };

  const handleDeleteTaskClick = () => {
    onDeleteClick(id);

    handleHideDetail();
  };

  //comment handlers
  const handleAddNewComment = async (e) => {
    e.preventDefault();

    if (!newComment || newComment.trim() === '') {
      return alert("Your comment can't be empty.");
    }

    if (authCtx) {
      let data;
      try {
        const response = await fetch('http://localhost:8080/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authCtx?.userInfo.token,
          },
          body: JSON.stringify({
            content: newComment,
            'todo-id': id,
          }),
        });

        if (!response) {
          return alert('Send request to server failed!');
        }

        data = await response.json();

        if (data.statusCode) {
          return alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error(error);

        //fake data
        data = { id: Math.random() };
      }

      const updatedComments = taskComments;

      updatedComments.unshift({
        id: data.id || Math.random(),
        'user-id': data['user-id'] || authCtx.userInfo.userId,
        username: data['username'] || authCtx.userInfo.username,
        content: newComment,
        date: new Date().toLocaleString(),
        isCurrentUser: true,
      });

      setTaskComments(updatedComments);

      setNewComment('');
    }
  };

  const handleDeleteComment = async (commentId) => {
    let data;
    try {
      const response = await fetch('http://localhost:8080/api/comment', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx?.userInfo.token,
        },
        body: JSON.stringify({
          id: commentId,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }

    setTaskComments((prev) =>
      prev.filter((comment) => comment.id !== commentId)
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
          <div className={styles['modal-content']}>
            {/* task content */}
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
                <p className={styles.date}>{date}</p>
              </div>
              <div className={styles['author-info']}>
                <div className={styles['author-info_content']}>
                  <span>Created</span>
                  <MemberItem
                    firstLetter={getFirstLetterOfName(createdUsername)}
                    name={createdUsername}
                  />
                </div>
                <div className={styles['author-info_content']}>
                  <span>Modified</span>
                  <MemberItem
                    firstLetter={getFirstLetterOfName(latestModifyUsername)}
                    name={latestModifyUsername}
                  />
                </div>
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
                <li key={comment.id}>
                  <CommentItem
                    commentId={comment.id}
                    userId={comment['user-id']}
                    username={comment.username}
                    content={comment.content}
                    date={comment.date}
                    isCurrentUser={comment.isCurrentUser}
                    onDeleteComment={() => handleDeleteComment(comment.id)}
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
