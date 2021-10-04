// import React, { useRef } from 'react';
// import useOutsideClick from '../../../hooks/useOutsideClick';

import classes from './Card.module.css';

const Card = ({ style, onOutSideClick, ...props }) => {
  // const cardRef = useRef(null);

  // useOutsideClick(cardRef, () => console.log('abc'));

  return (
    <div
      // ref={cardRef}
      className={`${classes.card} ${props.className}`}
      style={style}
    >
      {props.children}
    </div>
  );
};

export default Card;
