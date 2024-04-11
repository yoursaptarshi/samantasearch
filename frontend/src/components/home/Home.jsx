import React from 'react';
import './home.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchQuery } from '../../Actions/search';
import logo from '../images/logo.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const web_search_handler = (e) => {
    if (query !== '') {
      dispatch(searchQuery(query));
      display_show_web();
    }
  };

  const image_search_handler = (e) => {
    if (query !== '') {
      dispatch(searchQuery(query));
      display_show_image();
    }
  };

  const map_search_handler = (e) => {
    if (query !== '') {
      dispatch(searchQuery(query));
      display_show_map();
    }
  };

  const webResults = useSelector((state) => state.search.webResults);
  const imageResults = useSelector((state) => state.search.imageResults);
  const mapResults = useSelector((state) => state.search.mapResults);

  function display_show_web() {
    document.querySelector('.websearchResults').style.display = 'block';
    document.querySelector('.imagesearchResults').style.display = 'none';
    document.querySelector('.mapsearchResults').style.display = 'none';
  }

  function display_show_image() {
    document.querySelector('.imagesearchResults').style.display = 'block';
    document.querySelector('.websearchResults').style.display = 'none';
    document.querySelector('.mapsearchResults').style.display = 'none';
  }

  function display_show_map() {
    document.querySelector('.mapsearchResults').style.display = 'block';
    document.querySelector('.imagesearchResults').style.display = 'none';
    document.querySelector('.websearchResults').style.display = 'none';
  }

  const logoutHandler = async () => {
    await axios.get('/api/v1/logout');
  };

  const profile_box_handler = () => {
    let check = document.querySelector('.home_nav_profile_box').style.visibility;
    if (check === 'hidden') {
      document.querySelector('.home_nav_profile_box').style.visibility = 'visible';
    } else {
      document.querySelector('.home_nav_profile_box').style.visibility = 'hidden';
    }
  };

  const { user } = useSelector((state) => state.user);
  let profile_photo_address = require(`../images/userImages/user_logo.png`);
  try {
    profile_photo_address = require(`../images/userImages/${user._id}.jpg`);
  } catch (error) {
    profile_photo_address = require(`../images/userImages/user_logo.png`);
  }

  return (
    <div className="home_wrapper">
      <div className="home_navBar">
        <div className="profile">
          <button onClick={profile_box_handler}>
            <img src={profile_photo_address} alt="user photo" />
          </button>
        </div>
        <div className="logout">
          <a href="/signin">
            {' '}
            <button onClick={logoutHandler}>Log Out</button>
          </a>
        </div>
      </div>
      <div className="homepage_profile_components">
        <div className="home_nav_profile_box">
          <ul>
            {user ? (
              <>
                <li>Name: {user.name}</li>
                <li>UserName: {user.username}</li>
                <li>Email: {user.email}</li>
              </>
            ) : (
              <>
                <li>Name: Loading</li>
                <li>UserName: Loading</li>
                <li>Email: Loading</li>
              </>
            )}
          </ul>
          <Link to="/profile">
            {' '}
            <button id="home_page_profie_edit_button">Edit</button>
          </Link>
        </div>
      </div>
      <div className="home_container">
        <div className="home_page_components">
          <div className="homelogo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="home_searchwrapper">
            <div className="home_searchbar">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="home_searchbaricon">
              <div className="home_searchbaricon_web">
                <button onClick={web_search_handler}>Web</button>
              </div>
              <div className="home_searchbaricon_image">
                <button onClick={image_search_handler}>Image</button>
              </div>
              <div className="home_searchbaricon_map">
                <button onClick={map_search_handler}>Maps</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home_searchResults">
        <div className="websearchResults">
          <h4>Web Search Results</h4>
          <ul>
            {webResults.map((result, index) => {
              return (
                <a key={index} href={result.url} target="_blank">
                  <li>{result.titles}</li>
                </a>
              );
            })}
          </ul>
        </div>
        <div className="imagesearchResults">
          <h4>Image Search Results</h4>
          {imageResults.map((result, index) => {
            return (
              <a key={index} href={result.url} target="_blank">
                <img src={result.url} alt="Search Result" />
              </a>
            );
          })}
        </div>
        <div className="mapsearchResults">
          <h4>Map Search Results</h4>
          <p>It's a free map service. If map servers are busy, you may see a world map only.</p>
          <iframe title="map" width="425" height="350" src={mapResults}></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
