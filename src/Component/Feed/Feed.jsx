import React from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { API_KEY, value_converter } from '../../data'
import { useState } from 'react'
import { useEffect } from 'react'

const Feed = ({category}) => {

    const [data, setData] = useState([])

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items))
    }

    useEffect(() => {
        fetchData();
    },[category])

  return (
    <div className='feed py-14 grid grid-cols-4 gap-x-72
    max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
      {data.map((item, index)=>{
        return (
            <Link to={`video/${item.snippet.categoryId}/${item.id}`} 
            className="card text-black flex flex-col justify-start items-start w-[290px] h-[310px]">
             <img src={item.snippet.thumbnails.medium.url} alt=""
             className='w-[100%] mx-auto pt-3' />
             <h2 className='font-sans text-md pt-2 pb-1'>{item.snippet.title}</h2>
             <h3 className='font-mono text-sm font-bold'>{item.snippet.channelTitle}</h3>
              <p className='font-sans text-sm'>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
            </Link>
        )
      })}
      

    </div>
  )
}

export default Feed
