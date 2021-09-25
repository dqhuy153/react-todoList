import React, { useState } from 'react'
import styles from './Home.module.scss'
import Button from '../components/UI/Button/Button'
import Card from '../components/UI/Card/Card'
import iconAddCircle from '../assets/images/add_circle.png'
import iconKey from '../assets/images/keyboard_tab.png'
function Home(props) {
  const [countCard, setCoundCard] = useState('')
  const clickHandler = () =>{
    
  }

  return (
    // workspace
    <div className={styles.container}>
      {/*your workspaces */}
      <div className={styles.container__workspaces}>
        <div className={styles['container__workspaces--head']}>
          <h1>Your WorkSpaces</h1>
          <Button onClick={clickHandler} className={styles.button__tools}><img src={iconAddCircle} alt="add icon" />Room</Button>
        </div>
        <Card className={`${styles.room} ${styles['own__room--blue']}`}>Your own room</Card>
      </div>
      <div className={styles.container__recent}>
        <div className={styles['container__recent--chidls']}>
          <div className={styles['container__recent--chidl']}>
            <Card className={`${styles.room} ${styles['own__room--red']}`} key={props.roomId}>
              Your created room 1
            </Card>
           </div> 
            <div className={styles['container__recent--chidl']}>
              <Card className={`${styles.room} ${styles['own__room--red']}`} key={props.roomId}>
                Your created room 2
              </Card>
            </div>
            <div className={styles['container__recent--chidl']}>
              <Card className={`${styles.room} ${styles['own__room--red']}`} key={props.roomId}>
                Your created room 3
              </Card>
            </div>
            <div className={styles['container__recent--chidl']}>
              <Card className={`${styles.room} ${styles['own__room--red']}`} key={props.roomId}>
                Your created room 4
              </Card>
            </div>
          </div>
        </div>
        <div onlick={clickHandler} className={styles['container__recent--show__rooms']}>
            Browser all your created room
        </div>
        <div className={`${styles.container__workspaces} ${styles.container__bottom}`}>
        <div className={styles['container__workspaces--bottom']}>
          <h1>Recent joined</h1>
          <Button onClick={clickHandler} className={styles.button__tools}><img src={iconKey} alt="add icon" />Join</Button>
        </div>
      </div>
      <div className={styles.container__recent}>
        <div className={styles['container__recent--chidls']}>
          <div className={styles['container__recent--chidl']}>
            <Card className={`${styles.room} ${styles['own__room--organ']}`} key={props.roomId}>
              Your created room 1
            </Card>
           </div> 
            <div className={styles['container__recent--chidl']}>
              <Card className={`${styles.room} ${styles['own__room--organ']}`} key={props.roomId}>
                Your created room 2
              </Card>
            </div>
            <div className={styles['container__recent--chidl']}>
              <Card className={`${styles.room} ${styles['own__room--organ']}`} key={props.roomId}>
                Your created room 3
              </Card>
            </div>
            <div className={styles['container__recent--chidl']}>
              <Card className={`${styles.room} ${styles['own__room--organ']}`} key={props.roomId}>
                Your created room 4
              </Card>
            </div>
          </div>
        </div>

      </div>
    


  )
}
export default Home
