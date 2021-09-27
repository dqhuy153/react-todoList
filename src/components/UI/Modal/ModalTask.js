import React from 'react';
import Button1 from '../Button/Button1';

import styles from './ModalTask.module.scss';

export default function ModalTask({
  title,
  inputTitle = false,
  btn1,
  btn2,
  btn3,
  onBtn1Click,
  onBtn2Click,
  onBtn3Click,

  ...props
}) {
  return (
    <div className={styles.container}>
      {/* backdrop */}
      <div className="backdrop"></div>
      {/* header */}
      <div className={styles.header}>
        {inputTitle ? (
          <input value={title} placeholder="Task's title"></input>
        ) : (
          <p>{title}</p>
        )}
      </div>
      {/* content */}
      <div className={styles.header}>{props.children}</div>
      {/* footer */}
      <div className={styles.footer}>
        {btn1 && <Button1 onClick={onBtn1Click}>{btn1}</Button1>}
        {btn2 && <Button1 onClick={onBtn2Click}>{btn2}</Button1>}
        {btn3 && <Button1 onClick={onBtn3Click}>{btn3}</Button1>}
      </div>
    </div>
  );
}
