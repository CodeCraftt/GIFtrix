import React, { useState } from 'react';
import { uploadGif } from '../services/apiService';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('gif', file);
    formData.append('tags', tags.join(','));

    try {
      await uploadGif(formData);
      setMessage('GIF uploaded successfully!');
      setFile(null);
      setTags([]);
      setTimeout(() => {
        console.log("waited");
        window.location.reload();
      }, 3000);
    } catch (error) {
      setMessage('Error uploading GIF: ' + error.message);
    }
  };

  return (
    <div className='mx-4 md:mx-20 flex flex-col gap-3'>
      <h1 className='font-bold text-[2.2rem] mb-5'>Upload GIF</h1>

      <input type="file" className='file-input w-full max-w-xs' accept="image/gif" onChange={handleFileChange} />
      <div className='flex items-center gap-2 w-full ' >
        <input
          type="text"
          placeholder="Enter a tag"
          value={tagInput}
          className='w-[75%] md:w-[90%]  input input-bordered '
          onChange={handleTagInputChange}
        />
        <button onClick={handleAddTag} className='btn btn-info text-white'>Add Tag</button>
      </div>
      <ul className='my-3'>
        {tags.map((tag, index) => (
          <li key={index} className='flex justify-between my-3'>
            <p>{tag}</p> <button className='btn btn-error text-white ' onClick={() => handleRemoveTag(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleUpload} className='block mx-auto btn btn-success text-white'>Upload</button>
      {message && <p className='mt-3'>{message}</p>}
    </div>
  );
};

export default UploadPage;
