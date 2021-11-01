import Sidebar from './HomeSub.js';
import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  const side = [
    {name: "diary", path: "/diary"},
    {name: "photo", path: "/photo"},
    {name: "posting", path: "/post"}
  ]
  return (
    <div className="sidebar">
      {side.map((side, index)=>{
        return (
          <Link to={side.path} key={index}>
            <Sidebar child={side} />
          </Link>
        );
      })}
    </div>
  );
}

export default Home;
