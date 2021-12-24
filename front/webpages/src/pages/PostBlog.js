import {Sidebar, Menu, Header, Wrapper, Main, DiaryBody, DiaryHeader, CalendarHeader} from './Wrapper.js';
import {postval} from './Axios.js';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const user_id = 'aaa';

const Body = () => {
  const [wrtTitle, setWrtTitle] = useState("");
  const [wrtContent, setWrtContent] = useState("");
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
  };

  const clickModify = (e) => {
    if (btnClicked===0){
      setBtnClicked(2);
    }else if (btnClicked===1){ // 수정 상태
      setBtnClicked(0);
      // 글 내용 백엔드로 전송
      if (wrtTitle === "" && wrtContent===""){
        writeDiary(user_id, wrtTitle, wrtContent)
        .then(res=>{
          setPostTitles(res.data);
          setWrtTitle("");
          setWrtContent("");
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
    <DiaryBody style={{border:"0px", width:"90%"}}>
      <input value={wrtTitle} onChange={(e)=>setWrtTitle(e.target.value)} type='text' id='title'/>
      <input value={wrtContent} onChange={(e)=>setWrtContent(e.target.value)} style={{height:'40vh', textAlignVertical:"top"}} type='text' id='content'/>
    </DiaryBody>
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
