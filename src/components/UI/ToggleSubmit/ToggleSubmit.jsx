import React from "react"
import styles from './ToggleSubmit.module.scss'
import Card from '../Card/Card'
import Button from '../Button/Button'

const ToggleSubmit = ({ title, nameButton, nameButton1, nameButton2, nameButton3, ...props }) => {
  return (
    <div className={styles.toggle}>
      <form className={styles.create__room}>
        <Card className={styles['create__room--field']}>
          <div className={styles['create__room--field__title']}>{title}</div>
          <hr />
          {props.children}
          <div className={styles['input__room-create']}>
            <Button>{nameButton1}</Button>
            <Button>{nameButton2}</Button>
            {nameButton && <Button>{nameButton3}</Button>}
          </div>
        </Card>
      </form>

    </div>
  )
}

export default ToggleSubmit
