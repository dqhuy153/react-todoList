import React from 'react';
import { getFirstLetterOfName } from '../../util/helper';
import MemberItem from './MemberItem';

import styles from './MemberList.module.scss';

export default function MemberList({ items, ...props }) {
  const showItems = items.slice(0, 3);
  let additionNumMember = null;
  let additionItems = null;

  if (items.length > 3) {
    additionNumMember = items.length - 3;
    additionItems = items.slice(3);
  }

  return (
    <ul className={styles.container}>
      {showItems.map((member) => (
        <li key={member.id}>
          <MemberItem
            id={member.id}
            name={member.username}
            isCreator={member.isCreator}
            firstLetter={getFirstLetterOfName(member.username)}
          />
        </li>
      ))}
      {additionNumMember && (
        <li>
          <MemberItem
            firstLetter={`+${additionNumMember}`}
            additionItems={additionItems}
          />
        </li>
      )}
    </ul>
  );
}
