import {Sidebar, Menu, Header, Wrapper, Main, DiaryBody, DiaryHeader, CalendarHeader} from './Wrapper.js';
import {getDiaryTitles} from './Axois.js';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const user_id = 'aaa';

const Body = () => {
  const [postTitles, setPostTitles] = useState({});
  const [btnClicked, setBtnClicked] = useState(0); // 0 : default 1: writing 2: modifying

  useEffect(()=>{
    getDiaryTitles(user_id)
    .then(res=>{
      setPostTitles(res.data);
    })
  }, [])

  return <DiaryBody>
  <DiaryHeader>
    <button onClick={(e)=>setBtnClicked(btnClicked===0?1:0)}> {btnClicked===0?'글쓰기':'취소'} </button>
    <button> 수정 </button>
  </DiaryHeader>
  {
    btnClicked===0 || btnClicked===2?<table>
    <thead>
      <tr>
        <th style={{width:"10%"}}>번호</th>
        <th style={{width:"75%"}}>제목</th>
        <th style={{width:"15%"}}>날짜</th>
      </tr>
    </thead>
    <tbody>
        {postTitles.title && postTitles.title.map((title, index)=>{
            return <tr>
            <td style={{width:"10%"}}>{index+1}</td>
            <td style={{width:"75%"}}><Link to={window.location.pathname+'/'+postTitles.post_id[index]} key={postTitles.post_id[index]}>{title}</Link></td>
            <td style={{width:"15%"}}>{postTitles.date[index]}</td>
            </tr>
          })
        }
    </tbody>
    </table>
    :<DiaryBody style={{border:"0px", width:"90%"}}><input type='text' id='title'/><input style={{height:'40vh', textAlignVertical:"top"}} type='text' id='content'/></DiaryBody>
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
