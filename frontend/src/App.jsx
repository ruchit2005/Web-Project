import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './MyComponents/global.css';
import ImageUploader from './MyComponents/Upload';
import Loader from './MyComponents/Loader';
import Logo from './MyComponents/Logo';
import Email from './MyComponents/Email';
import Header from './MyComponents/Header';
import ItemList from './MyComponents/ItemList';
import Price from './MyComponents/Price';
import bgVideo from './Assets/bgvideo.mp4';

function App() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <div className="App">
      <video ref={videoRef} autoPlay loop muted id="bgvideo">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <Router>
          <Routes>
            <Route path="/" element={
              <div className="board">
                <Loader />
              </div>} />
            <Route path="/start" element={
              <div className="board">
                <div className="instructions">
                  <Logo />
                  <br/><br/>
                  <Email />
                </div>
              </div>} />
            <Route path="/upload" element={
              <>
              <Header />
              <div className="board">
                <ImageUploader />
              </div>
              </>} />
            <Route path="/list" element={
              <>
              <Header />
              <div id='contain'>
                <Price />
                <ItemList />
              </div>
              </>
            } />
          </Routes>
      </Router>
    </div>
    );
}

export default App;