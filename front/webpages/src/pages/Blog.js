import {Sidebar, Menu, Header, Wrapper, Main, DiaryBody, DiaryHeader, CalendarHeader} from './Wrapper.js';
import {getDiaryTitles, writeDiary, deleteDiary, postval} from './Axios.js';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const user_id = 'aaa';

const Body = () => {
  const [postTitles, setPostTitles] = useState({});
  const [wrtPost, setWrtPost] = useRecoilState(postval);
  const [btnClicked, setBtnClicked] = useState(0); // 0 : default 1: writing 2: modifying
  const [deleteList, setDeleteList] = useState([]);

  useEffect(()=>{
    getDiaryTitles(user_id)
    .then(res=>{
      setPostTitles(res.data);
    })
  }, []);

  const onDeleteList = (index) => {
    console.log(deleteList);
    if (deleteList.includes(index)){
      setDeleteList(deleteList.filter(i=>i!=index));
    }else{
      setDeleteList([...deleteList, index]);
    }
  }

  const clickModify = (e) => {
    if (btnClicked===0){
      setBtnClicked(2);
    }else if (btnClicked===1){ // 수정 상태
      setBtnClicked(0);
      // 글 내용 백엔드로 전송
      if (wrtPost.title === "" && wrtPost.content===""){
        writeDiary(user_id, wrtPost.title, wrtPost.content)
        .then(res=>{
          setPostTitles(res.data);
          setWrtPost({title:"", content:""});
        })
      }
    }else if (btnClicked===2){
      setBtnClicked(0);
      // check된 게시물 수정
      if(window.confirm("삭제하시겠습니까?")){
        console.log("delete");
        deleteDiary(user_id, deleteList)
        .then(res=>{
          setPostTitles(res.data);
        })
      }
    }
  };

  return <DiaryBody>
  <DiaryHeader>
    <button onClick={(e)=>setBtnClicked(btnClicked===0?1:0)}> {btnClicked===0?'글쓰기':'취소'} </button>
    <button onClick={clickModify}> {btnClicked===0?'수정':btnClicked===1?'저장':'삭제'} </button>
  </DiaryHeader>
  {
    btnClicked===0 || btnClicked===2?<table>
    <thead>
      <tr>
        <th style={{width:"10%"}}>{btnClicked===0?'번호':'선택'}</th>
        <th style={{width:"75%"}}>제목</th>
        <th style={{width:"15%"}}>날짜</th>
      </tr>
    </thead>
    <tbody>
        {postTitles.title && postTitles.title.map((title, index)=>{
            return <tr>
            <td style={{width:"10%"}}>{btnClicked===0?index+1:<input type='checkbox' onChange={()=>onDeleteList(postTitles.post_id[index])}/>}</td>
            <td style={{width:"75%"}}><Link to={window.location.pathname+'/'+postTitles.post_id[index]} key={postTitles.post_id[index]}>{title}</Link></td>
            <td style={{width:"15%"}}>{postTitles.date[index]}</td>
            </tr>
          })
        }
    </tbody>
    </table>
    :<DiaryBody style={{border:"0px", width:"90%"}}>
      <input value={wrtPost.title} onChange={(e)=>setWrtPost({...wrtPost, title:e.target.value})} type='text' id='title'/>
      <input value={wrtPost.content} onChange={(e)=>setWrtPost({...wrtPost , content:e.target.value})} style={{height:'40vh', textAlignVertical:"top"}} type='text' id='content'/>
      </DiaryBody>
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
