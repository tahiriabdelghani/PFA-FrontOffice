import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import NavBar from '../components/navbar/NavBar'
import Login from '../components/login'
import Historique from '../components/historiques/historique'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center ">
      <Head>
        <title>Projet PFA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Login />
    </div>
  )
}
