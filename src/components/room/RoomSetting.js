import React, { useState } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { MdDoNotDisturb } from 'react-icons/md';

import { getFirstLetterOfName } from '../../util/helper';
import MemberIcon from '../member/MemberIcon';

import Card from '../UI/Card/Card';
import styles from './RoomSetting.module.scss';

export default function RoomSetting({
  id,
  password,
  members,
  className,
  onRemoveMember,
  onClose,
  ...props
}) {
  const [showSetting, setShowSetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let transformedPassword = password;

  if (!showPassword) {
    transformedPassword = '***********';
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSettingClick = () => {
    setShowSetting((prev) => !prev);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <AiTwotoneSetting className={styles.icon} onClick={handleSettingClick} />

      {showSetting && (
        <Card className={styles.tag}>
          {/* information */}
          <div className="flex-sb">
            <p className={styles['tag-title']}>Information</p>
            <IoMdClose
              size={20}
              fontWeight="500"
              onClick={() => setShowSetting(false)}
              className={styles['tag-member-delete']}
            />
          </div>
          <p>Room ID: {id}</p>
          <div className={styles['tag-password']}>
            <p>
              Password: <span>{transformedPassword}</span>
            </p>

            {!showPassword && (
              <BsFillEyeFill
                className={styles['eye-icon']}
                size={15}
                onClick={handleShowPassword}
              />
            )}
            {showPassword && (
              <BsFillEyeSlashFill
                className={styles['eye-icon']}
                size={15}
                onClick={handleShowPassword}
              />
            )}
          </div>
          {/* members */}
          <p className={styles['tag-title']}>Members</p>
          <ul className={styles['tag-member-list']}>
            {members.map((member) => (
              <li key={member.id} className={styles['tag-member-item']}>
                <div className={styles['tag-member-item_left']}>
                  <MemberIcon firstLetter={getFirstLetterOfName(member.name)} />
                  <p className={styles['tag-member-item_name']}>
                    {member.name}
                  </p>
                </div>
                {!member.isCreator && (
                  <MdDoNotDisturb
                    size={18}
                    onClick={() => onRemoveMember(member.id)}
                    className={styles['tag-member-delete']}
                  />
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
