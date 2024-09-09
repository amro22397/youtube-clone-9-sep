import React from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { useState } from 'react'
import { API_KEY, value_converter } from '../../data'
import { useEffect } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

    const {videoId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const [subscribe, setSubscribe] = useState(false);


    const fetchVideoData = async () => {
        
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]))
    }

    const fetchOtherData = async () => {

        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url).then(res => res.json()).then(data => setCommentData(data.items))
    }

    useEffect(() => {
        fetchVideoData();
    },[videoId])

    useEffect(() => {
        fetchOtherData();
    },[apiData])


    const changeSubscribe = () => {
        !subscribe? setSubscribe(true) : setSubscribe(false);
        document.getElementById("subscribe-button").classList.toggle('subscribe-button')
        document.getElementById("subscribe-button").classList.toggle('subscribed')
    }
  return (
    <div className='play-video px-10 w-[65%] max-xl:w-[100%]'>
        {/*<video src={video1} controls autoPlay muted></video>*/}
      <iframe width="1022" height="575" className=' max-xl:max-w-[85%] max-xl:mx-auto max-md:max-w-[100%]
      max-lg:max-h-[440px] max-md:max-h-[350px] max-sm:max-h-[300px]'
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="Create YouTube Clone Using React JS | Build Complete Website Like YouTube In React JS 2024" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3 className='text-2xl font-sans pt-0' style={{fontFamily: 'Trebuchet MS'}}
      >{apiData?apiData.snippet.title:"Title Here"}</h3>

      <div className="play-video-info flex flex-row justify-between py-3 w-full pt-4
      max-md:flex-col items-start gap-2">

        <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16K"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow() : ""}</p>

        <div className='video-btns flex flex-row gap-10 mt-1'>
            <span><img src={like} alt="" /> {apiData? value_converter(apiData.statistics.likeCount) : 155}</span>
            <span><img src={dislike} alt="" /> 2</span>
            <span><img src={share} alt="" /> share</span>
            <span><img src={save} alt="" /> Save</span>
        </div>
      </div>

      <hr />
      <div className="puplisher flex flex-row items-center py-4 pl-4 pr-7 justify-between">
        <div className=''>
        <p className='pb-1'>{apiData? apiData.snippet.channelTitle: ""}</p>
        <span>1M Subscribers</span>
        </div>
        <button id='subscribe-button' className='subscribe-button ml-4 px-9 py-[5px] text-white rounded-3xl text-lg'
        onClick={() => changeSubscribe()}>{!subscribe? "Subscribe" : "Subscribed" }</button>
      </div>
      <div className="vid-description py-4">
        <p className='pb-5'
        >{apiData?apiData.snippet.description.slice(0,250): "Description Here"}</p>
        <hr />

        <h4 className='py-3'>{apiData? value_converter(apiData.statistics.commentCount): 102} Comments</h4>

        <textarea type="text" placeholder='Add comment...'
        id='add-comment' rows={2} />

        <div className="comment-area py-5">

        {commentData.map((item, index) => {

return (
    <div key={index} className="comment flex flex-row items-start justify-start">
<img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" 
className='comment-profile-image scale-75' />
<div className='px-3 py-2'>
    <h3 className='font-sans text-lg'>{item.snippet.topLevelComment.snippet.authorDisplayName}</h3>
    <p className='font-sans pb-1 text-sm'>{item.snippet.topLevelComment.snippet.textDisplay}</p>
    <div className="comment-action flex flex-row px-0 py-1">
        <img src={like} alt="" />
        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
        <img src={dislike} alt="" />
    </div>
</div>
</div>
)
})}

        </div>
       


      </div>
    </div>
  )
}

export default PlayVideo
