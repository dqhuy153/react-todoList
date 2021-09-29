import React from 'react';
import { IoMdClose } from 'react-icons/io';

import styles from './AddTitleForm.module.scss';
import Button1 from '../Button/Button1';

export default function AddTitleForm({
  placeholder,
  multiple,
  value,
  buttonText = 'Add',
  buttonWidth = '100%',
  buttonFontSize = '1rem',

  onChange,
  onClose,
  onSubmit,

  ...props
}) {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      ></input>

      <div className={styles.buttons}>
        <Button1
          buttonFontSize={buttonFontSize}
          buttonWidth={buttonWidth}
          type="submit"
        >
          {buttonText}
        </Button1>
        <IoMdClose size={20} onClick={onClose} />
      </div>
    </form>
  );
}
