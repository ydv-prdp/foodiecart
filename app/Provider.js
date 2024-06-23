import React from 'react'
import { Header } from './_comp/Header'

const Provider = ({children}) => {
  return (
    <div className='px-10 md:px-20 relative'>
        <Header/>
        {children}
    </div>
  )
}

export default Provider