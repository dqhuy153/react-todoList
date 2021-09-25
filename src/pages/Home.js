import React, {useState} from 'react'
import styles from './Home.module.scss'
import Button from '../components/UI/Button/Button'
import Card from '../components/UI/Card/Card'
import iconAddCircle from '../assets/images/add_circle.png'
function Home(props) {
  return (
    <div className={styles.container}>
      <div className={styles.container__workspaces}>
        <div className={['styles.container__workspaces--head']}>
          <h3>Your WorkSpaces</h3>
          <Button><img src={iconAddCircle} alt="add icon"/>Room</Button>
        </div>
        <Card>Your own room</Card>
      </div>
      <div className={styles.container__recent}>
        <div className={['styles.container__recent--chidls']}>
          <Card key={props.roomId}>Your created room 1</Card>
          <Card key={props.roomId}>Your created room 2</Card>
          <Card key={props.roomId}>Your created room 3</Card>
          <Card key={props.roomId}>Your created room 4</Card>
        </div>
        <span className={styles['container__recent--show__rooms']}>
          <u>Browser all your created room</u>
        </span>
      </div>
    </div>
  )
}

export default Home
