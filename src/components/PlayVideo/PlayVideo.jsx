import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import value_converter from '../../utils/value_converter';
import moment from 'moment';
import { API_KEY } from '../../data';

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(videoDetails_url);
      const data = await res.json();
      setApiData(data.items[0]);
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const fetchOtherData = async () => {
    if (!apiData?.snippet?.channelId) return;

    try {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const channelRes = await fetch(channelData_url);
      const channelData = await channelRes.json();
      setChannelData(channelData.items[0]);

      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`;
      const commentRes = await fetch(comment_url);
      const commentData = await commentRes.json();
      setCommentData(commentData.items);
    } catch (error) {
      console.error('Error fetching other data:', error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3>{apiData?.snippet?.title || 'Title Here'}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : '16k views'} &bull;{' '}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : 'Some time ago'}
        </p>
        <div>
          <span><img src={like} alt="like" /> {apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
          <span><img src={dislike} alt="dislike" /> 2</span>
          <span><img src={share} alt="share" /> Share</span>
          <span><img src={save} alt="save" /> Save</span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url || ''} alt="publisher" />
        <div>
          <p>{channelData?.snippet?.title || ''}</p>
          <span>{channelData?.statistics?.subscriberCount ? `${value_converter(channelData.statistics.subscriberCount)} Subscribers` : '1M Subscribers'}</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData?.snippet?.description.slice(0, 250) || 'Channel that makes pagalpanti more fun'}</p>
        <hr />
        <h4>{apiData ? `${value_converter(apiData.statistics.commentCount)} Comments` : '130 Comments'}</h4>

        {commentData.map((item, index) => {
          const comment = item.snippet.topLevelComment.snippet;
          return (
            <div className="comment" key={index}>
              <img src={comment.authorProfileImageUrl || user_profile} alt="user" />
              <div>
                <h3>{comment.authorDisplayName} <span>{moment(comment.publishedAt).fromNow()}</span></h3>
                <p>{comment.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="like" />
                  <span>{value_converter(comment.likeCount)}</span>
                  <img src={dislike} alt="dislike" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
