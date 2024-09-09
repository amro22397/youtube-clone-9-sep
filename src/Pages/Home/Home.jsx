import React from 'react'
import './Home.css'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Feed from '../../Component/Feed/Feed'
import { useState } from 'react'

const Home = ({sidebar}) => {

    const [category, setCategory] = useState(0);
    
  return (
    <div className=''>
    <div className="relative top-14 hidden xl:block w-[15%]">
    <Sidebar sidebar={sidebar}  category={category} setCategory={setCategory} />
    </div>
    <div className={`container ${sidebar? "": "large-container"} w-[84%]`}>
        <Feed category={category} />
    </div>
    </div>
  )
}

export default Home
