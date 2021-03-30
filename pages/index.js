import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Carousel } from 'antd'

export default function Home() {

  const addRecord = async (name)=>{
    try {
      const res = await axios({
          method: 'post',
          url: 'api/add-ad',
          data: {name},
          withCredentials: true
      })
      console.log('res', res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      {/* <button onClick={()=>{addRecord('first ad')}}>Add record</button>
      <button onClick={()=>{addRecord('second ad')}}>second ad</button> */}
    </div>
  )
}
