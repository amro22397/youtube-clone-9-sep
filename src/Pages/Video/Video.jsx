import React from 'react'
import './Video.css'
import PlayVideo from '../../Component/PlayVideo/PlayVideo'
import Recommended from '../../Component/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {

  const {videoId, categoryId} = useParams();

  return (
    <div className='play-containter w-[100%%] flex flex-row py-20 justify-between
    max-xl:flex-col max-xl:items-center'>
      <PlayVideo videoId={videoId}/>
      <Recommended categoryId={categoryId} />
    </div>
  )
}

export default Video
