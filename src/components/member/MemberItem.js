import React, { useState } from 'react';

import Card from '../UI/Card/Card';
import MemberIcon from './MemberIcon';
import styles from './MemberItem.module.scss';

export default function MemberItem({
  id,
  name,
  isCreator,
  firstLetter,
  additionItems,
  ...props
}) {
  const [showName, setShowName] = useState(false);

  const handleMemberClick = () => {
    setShowName((prev) => !prev);
  };

  return (
    <MemberIcon
      className={styles.container}
      firstLetter={firstLetter}
      onClick={handleMemberClick}
    >
      {name && showName && (
        <Card className={styles['member-tag']}>
          <div>
            <p>{name}</p>
          </div>
        </Card>
      )}
      {/* for addition icon (+1) */}
      {!name && additionItems && showName && (
        <Card className={styles['member-tag']}>
          {additionItems.map((member) => (
            <p key={member.id}>{member.name}</p>
          ))}
        </Card>
      )}
    </MemberIcon>
  );
}
