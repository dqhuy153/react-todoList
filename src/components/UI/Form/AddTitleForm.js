import React from 'react';
import { IoMdClose } from 'react-icons/io';

import styles from './AddTitleForm.module.scss';
import Button1 from '../Button/Button1';

export default function AddTitleForm({
  placeholder,
  multiple,
  value,
  buttonText = 'Add',

  onChange,
  onClose,
  onSubmit,

  ...props
}) {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      ></textarea>

      <div className={styles.buttons}>
        <Button1 type="submit">{buttonText}</Button1>
        <IoMdClose size={20} onClick={onClose} />
      </div>
    </form>
  );
}
