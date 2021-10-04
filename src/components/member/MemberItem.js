import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

import Card from '../UI/Card/Card';
import MemberIcon from './MemberIcon';
import styles from './MemberItem.module.scss';

export default function MemberItem({
  id,
  name,
  isCreator,
  firstLetter,
  additionItems,
  isProfileHeader = false,
  onLogout,
  hoverToShow = true,
  clickToShow = false,
  ...props
}) {
  const [showName, setShowName] = useState(hoverToShow ? true : false);

  const handleMemberClick = () => {
    setShowName((prev) => !prev);
  };

  return (
    <>
      <MemberIcon
        className={styles.container}
        firstLetter={firstLetter}
        onMouseDown={clickToShow ? handleMemberClick : null}
        style={{ '--display-card': hoverToShow ? 'none' : 'block' }}
      >
        {name && showName && !isProfileHeader && (
          <Card className={styles['member-tag']}>
            <div>
              <p>{name}</p>
            </div>
          </Card>
        )}
        {/* for addition icon (+1) */}
        {!name && additionItems && showName && !isProfileHeader && (
          <Card className={styles['member-tag']}>
            {additionItems.map((member) => (
              <p key={member.id}>{member.name}</p>
            ))}
          </Card>
        )}
      </MemberIcon>
      {/* for header */}
      {isProfileHeader && showName && (
        <Card className={`${styles['member-tag']} ${styles['header-profile']}`}>
          <div className={styles['header-profile_content']}>
            <div>
              <p>{name}</p>
              <span>ID: {id}</span>
            </div>
            <FiLogOut size={18} onClick={onLogout} />
          </div>
        </Card>
      )}
    </>
  );
}
