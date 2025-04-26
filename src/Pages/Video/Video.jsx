import React from 'react'
import './Video.css'
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import Recommonded from '../../components/Recommonded/Recommonded'
import { useParams } from 'react-router-dom';

const Video = () => {

  


  const {videoId,categoryId}=useParams();
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId}/>
      <Recommonded categoryId={categoryId}/>
    </div>
  )
}

export default Video
