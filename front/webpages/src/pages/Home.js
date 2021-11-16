import {Sidebar, Menu, Header, Wrapper} from './HomeSub.js';
//import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  const side = [
    {name: "diary", path: "/diary"},
    {name: "photo", path: "/photo"},
    {name: "posting", path: "/post"}
  ];

  return (
    <Wrapper>
      <Sidebar className="sidebar">
          {side.map((side, index)=>{
            return (
              <Link to={side.path} key={index}>
                <Menu className={side.name}>
                  <p>{side.name}</p>
                </Menu>
              </Link>
            );
          })}
      </Sidebar>
      <Header>header</Header>
    </Wrapper>
  );
}

export default Home;
