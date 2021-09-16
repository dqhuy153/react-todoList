import React from 'react';

import styles from './TodoList.module.scss';

export default function TodoList({ items, ...props }) {
  return <div className={styles.container}></div>;
}
