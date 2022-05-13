import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");

  async function handleViewTodos(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push(`/todos?username=${encodeURIComponent(username)}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Super cool todo app
        </h1>

        <form onSubmit={handleViewTodos}>
          <label htmlFor="name-input">Who are you?</label>
          <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
          <br />
          <input type="submit" value="View my todos" disabled={username.length === 0} />
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home;
