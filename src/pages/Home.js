import React from 'react'
import styles from './Home.module.scss'
import Button from '../components/UI/Button/Button'
import Card from '../components/UI/Card/Card'
import iconAddCircle from '../assets/images/add_circle.png'
function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container__workspaces}>
        <div className={['styles.container__workspaces--head']}>
          <h3>Your WorkSpaces</h3>
          <Button><img src={iconAddCircle} alt="add icon"/>Room</Button>
        </div>
      </div>
      <div className={styles.container__recent}>
        
      </div>
    </div>
  )
}

export default Home
