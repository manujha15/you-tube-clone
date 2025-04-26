import React, { useState, useEffect } from 'react';
import './Feed.css';
import thumbnail1 from '../../assets/thumbnail1.png';
import { Link } from 'react-router-dom';
import { API_KEY } from '../../data';
import moment from 'moment/moment';

// Add this function to convert view counts
const value_converter = (num) => {
  if (!num) return "0";
  const n = parseInt(num);
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toString();
};

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then(response => response.json())
      .then(data => setData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => (
        <Link to={`video/${item.id}`} className="card" key={item.id}>
          <img src={item.snippet?.thumbnails?.medium?.url || thumbnail1} alt="" />
          <h2>{item.snippet?.title}</h2>
          <h3>{item.snippet?.channelTitle}</h3>
          <p>{value_converter(item.statistics?.viewCount)} views &bull;{moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;