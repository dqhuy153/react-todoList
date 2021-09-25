import React from 'react';
import MemberItem from './MemberItem';

import styles from './MemberList.module.scss';

export default function MemberList({ items, ...props }) {
  const showItems = items.slice(0, 3);
  const additionNumMember = items.length > 3 ? items.length - 3 : null;

  return (
    <ul className={styles.container}>
      {showItems.map((member) => (
        <li key={member.id}>
          <MemberItem
            id={member.id}
            name={member.name}
            firstLetter={member.name[0]}
          />
        </li>
      ))}
      {additionNumMember && (
        <MemberItem firstLetter={`+${additionNumMember}`} />
      )}
    </ul>
  );
}
