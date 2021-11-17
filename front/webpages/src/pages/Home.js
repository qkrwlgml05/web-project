import {Sidebar, Menu, Header, Wrapper, Main} from './HomeSub.js';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Calendar = ({year, month}) => {
  return (
    <div className="calendar">
      <p>{year}</p> <p>{month}</p>
    </div>
  );
};

function Home() {
  const side = [
    {name: "diary", path: "/diary"},
    {name: "photo", path: "/photo"},
    {name: "posting", path: "/post"}
  ];
  var today = new Date();
  const [yearMonth, setYearMonth] = useState({year: today.getFullYear(), month: today.getMonth()+1});

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
        <Main>
          <Header className="header">header</Header>
          <Calendar year={yearMonth.year} month={yearMonth.month} />
        </Main>
    </Wrapper>
  );
}

export default Home;
