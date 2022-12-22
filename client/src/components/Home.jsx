import React from 'react'
import Header from './Header'
import NasheedHome from './NasheedHome'

const Home = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
      <Header/>
      <NasheedHome/>
    </div>
  )
}

export default Home