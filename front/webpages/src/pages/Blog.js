import {Sidebar, Menu, Header, Wrapper, Main, DiaryBody, DiaryHeader, CalendarHeader} from './Wrapper.js';
import {getDiaryTitles} from './Axois.js';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const user_id = 'aaa';

const Body = () => {
  const [postTitles, setPostTitles] = useState({});

  useEffect(()=>{
    getDiaryTitles(user_id)
    .then(res=>{
      setPostTitles(res.data);
    })
  }, [])

  return <DiaryBody>
    <CalendarHeader>
    <div>제목 | 날짜</div>
      <button> 글쓰기 </button>
      <button> 수정 </button>
    </CalendarHeader>
    {postTitles.title && postTitles.title.map((title, index)=>{
        return <div>{title}|{postTitles.date[index]}</div>
      })
    }
  </DiaryBody>
};

function Blog() {
  const side = [
    {name: "일기", path: "/diary"},
    {name: "menu2", path: "/menu2"},
    {name: "menu3", path: "/menu3"}
  ];

  return (
    <Wrapper>
        <Sidebar className="sidebar">
          {side.map((side, index)=>{
            return (
              <Link to={side.path} key={index}>
                <Menu className={side.name}>{side.name}</Menu>
              </Link>
            );
          })}
        </Sidebar>
        <Main>
          <Header className="header"><h2>Header</h2></Header>
          <Body />
        </Main>
    </Wrapper>
  );
}

export default Blog;
