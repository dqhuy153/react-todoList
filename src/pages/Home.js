import React, { useState, useRef } from 'react'
import styles from './Home.module.scss'
import Button from '../components/UI/Button/Button'
import Card from '../components/UI/Card/Card'
import Input from '../components/UI/Input/Input'
import iconAddCircle from '../assets/images/add_circle.png'
import iconKey from '../assets/images/keyboard_tab.png'





const ROOM = {
  ownRoom: {
    id: 0,
    nameRoom: "Name your own"
  },
  createdRooms: [
    {
      id: 1,
      nameRoom: "Room 1"
    },
    {
      id: 2,
      nameRoom: "Room 2"
    },
    {
      id: 3,
      nameRoom: "Room 3"
    },
    {
      id: 4,
      nameRoom: "Room 4"
    },
    {
      id: 5,
      nameRoom: "Room 5"
    },
  ],
  joinedRooms: [
    {
      id: 1,
      nameRoom: "Room huy"
    },
    {
      id: 2,
      nameRoom: "Room 2"
    },
    {
      id: 3,
      nameRoom: "Room 3"
    },
    {
      id: 4,
      nameRoom: "Room 4"
    },
    {
      id: 5,
      nameRoom: "Room 5"
    },
  ]
}


function Home(props) {

  const [countCard, setCoundCard] = useState('')
  const clickHandler = () => {

  }
  const submitHandler = (even) =>{
    even.prevenDefault()
    props.onCancel()
  }

  return (
    //div
    //
    // workspace
    <div className={styles.container}>
      {/*your workspaces */}
      <div className={styles.container__workspaces}>
        <div className={styles['container__workspaces--head']}>
          <h1>Your WorkSpaces</h1>
          <Button onClick={clickHandler} className={styles.button__tools}><img src={iconAddCircle} alt="add icon" />Room</Button>
        </div>
        <Card className={`${styles.room} ${styles['own__room--blue']}`}>{ROOM.ownRoom.nameRoom}</Card>
      </div>
      <div className={styles.container__recent}>
        <div className={styles['container__recent--chidls']}>
          {ROOM.createdRooms.slice(0,4).map(room =>
            <div className={styles['container__recent--chidl']}>

              <Card key={room.id} className={`${styles.room} ${styles['own__room--red']}`}>
                <p>{room.nameRoom} </p>
                <div className={styles.button__edit}>123456789</div>
              </Card>

            </div>
          )}
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
          
          {ROOM.joinedRooms.slice(0,4).map(room =>

            <div className={styles['container__recent--chidl']}>
              <Card className={`${styles.room} ${styles['own__room--organ']}`}>
                <p>{room.nameRoom} </p>
              </Card>
            </div>
          )}

        </div>
      </div>
      <form className={styles.create__room}>
        <Card className={styles['create__room--field']}>
          <div className={styles['create__room--field__title']}>Create New Room</div>
          <hr />
          <div className={styles['join__room--field__input']}>
            <Input placeholder="Room title"/>
            <Input placeholder="Room password" />
          </div>
          <div className={styles['input__room-create']}>
            <Button >Cancel</Button>
            <Button>Create</Button>
          </div>
        </Card>
      </form>


      {/* <form className={styles.join__room}>
        <Card className={styles['join__room--field']}>
          <div className={styles['create__room--field__title']}>Join a Room</div>
          <hr />
          <div className={styles['join__room--field__input']}>
            <Input />
            <Input />
            <input placeholder="check"/>

          </div>
          <div className={styles['input__room-create']}>
            <Button >Cancel</Button>
            <Button>Join</Button>
          </div>
        </Card>
      </form> */}
    </div>



  )
}
export default Home
