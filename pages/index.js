import Head from 'next/head'
import Link from 'next/link'
import AppLayout from '../components/AppLayout/AppLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <h1>
          <a href="https://nextjs.org">devter</a>
        </h1>
        <h2>
          <nav>
            <Link href="/timeline"><a>timeline</a></Link>
          </nav>
        </h2>
      </AppLayout>
    </div>
  )
}
