import React from 'react'
import './Recommended.css'
import { useState } from 'react'
import { API_KEY, value_converter } from '../../data'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(relatedVideo_url).then(res => res.json()).then(data => setApiData(data.items));
    } 

    useEffect(() => {
        fetchData();
    }, [])

  return (
    <div className='recommended flex flex-col justify-start items-start mx-auto px-0 my-4 rounded-xl w-[30%]
    max-2xl:w-[40%] max-2xl:items-start
    max-xl:w-[50%] max-xl:items-start
    max-lg:w-[60%] max-lg:items-start max-lg:mx-auto
    max-md:w-[70%] max-md:items-start max-md:mx-auto
    max-sm:w-[80%] max-sm:items-start max-sm:mx-auto '>

        {apiData.map((item, index) => {
            return (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} 
                className="side-video-list flex flex-row cursor-pointer text-black
                items-center">
                     <img src={item.snippet.thumbnails.medium.url} alt="" />
        <div className="vid-info w-full px-4 py-3">
            <h4 className='text-md pb-1 font-sans'>{item.snippet.title}</h4>
            <p className='text-sm font-mono'>{item.snippet.channelTitle}</p>
            <p className='text-sm font-mono'>{value_converter(item.statistics.viewCount)} Views</p>
        </div>
                </Link>
            )
        })}
      
      
    </div>
  )
}

export default Recommended
