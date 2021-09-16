import React from 'react';

import styles from './TodoItem.module.scss';

export default function TodoItem({ title, date, status, ...props }) {
  return <div className={styles.container}></div>;
}
