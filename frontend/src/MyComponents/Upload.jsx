import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./global.css";
import axios from 'axios';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append('image', file);
    const response = axios.post('https://baniyabro.onrender.com/upload', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
    
  const handleNavigate = () => {
    navigate('/list');
  };

  return (
    <div className='imagecomp'>
      <label htmlFor="file-input" className="custom-file-upload">
  Scan Image
</label>
       
      {/* File input with capture feature for camera */}
      <input
        id="file-input"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
      />
      
      {/* Conditionally render the image preview */}
      {selectedImage && (
        <div>
          <img src={selectedImage}
            alt='Uploaded'
            style={{ width: '300px', height: '300px', border: '1px solid #ccc', borderRadius: '5px' }} />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleNavigate} disabled={!selectedImage}>
        Search Item
      </button>
    </div>
  );
};

export default ImageUploader;