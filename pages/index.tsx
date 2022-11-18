import type { NextPage } from 'next'
import Router from 'next/router'
import styles from '../styles/page.module.css'

const Home: NextPage = () => {
  const moveToRequireAuthenticationPage = () => {
    Router.push('/admin')
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to the nCight Development Environment
      </h1>

      <p className={styles.description}>
        Move to the administrator screen: <button onClick={moveToRequireAuthenticationPage}>admin</button>
      </p>
    </main>
  )
}

export default Home
