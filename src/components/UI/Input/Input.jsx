import React, { useRef } from 'react'
import classes from './Input.module.css';
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const active = () => {
    inputRef.current.focus();
  };

  // useImperativeHandle(ref, () => {
  //   return {
  //     focus: active
  //   }
  // })


  return (
    <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ''}`}>
      {props.label &&  <label htmlFor={props.id}>{props.label}</label> }
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    </div>
  )
})

export default Input
