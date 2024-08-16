import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shareGif } from '../services/apiService';

const GifDetailPage = () => {
  const { state } = useLocation();
  const { gif } = state || {};
  const navigate = useNavigate();

  const handleShare = async () => {
    try {
      await shareGif(gif._id);
      alert('Thanks for sharing GIF');
      navigate('/');
    } catch (error) {
      console.error('Error sharing GIF:', error);
    }
  };

  if (!gif) {
    return <p>GIF not found.</p>;
  }

 

  return (
    <div className="mx-4 md:mx-20">
      <h1 className=" font-bold text-[2.2rem] mb-5" >GIF Detail</h1>
      <img src={gif.url} className='block mx-auto w-full h-48 md:h-[50vh] md:w-1/2 ' alt="GIF" />
      <div className='mt-3'>
        <h3 className='text-[1.2rem] font-bold'>Tags:</h3>
        <ul className='flex w-full flex-wrap my-3 gap-3'>
          {gif.tags.map((tag, index) => (
            <li className='btn btn-secondary' key={index}>{tag}</li>
          ))}
        </ul>
      </div>
      <button className='text-white btn btn-active btn-accent block mx-auto' onClick={handleShare}>Share</button>
    </div>
  );
};

export default GifDetailPage;
