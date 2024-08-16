import axios from 'axios';

const API_URL = "http://localhost:5000/api";
console.log(API_URL);





export const uploadGif = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/gifs/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error uploading GIF: ' + error.message);
  }
};

export const searchGifs = async (tag, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/gifs/search`, {
      params: { tag, page, limit },
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    throw new Error('Error searching GIFs: ' + error.message);
  }
};


export const shareGif = async (gifId) => {
  await axios.post(`${API_URL}/gifs/${gifId}/share`);
};