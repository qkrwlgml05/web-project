import {Sidebar, Menu, Header, Wrapper, Main, DiaryBody, DiaryHeader, CalendarHeader} from './Wrapper.js';
import {postval, getPost, deleteDiary} from './Axios.js';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const user_id = 'aaa';

const Body = ({post_id}) => {
  const [wrtPost, setWrtPost] = useRecoilState(postval);
  const [btnClicked, setBtnClicked] = useState(0); // 0 : default 1: modifying

  useEffect(()=>{
    getPost(user_id)
    .then(res=>{
      setWrtPost({title:res.data.title, content:res.data.content});
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

  const deleteBtn = (user_id) => {
    if (window.confirm("삭제하시겠습니까?")){
      deleteDiary(user_id, [post_id])
      .then(res=>{
        history.push("/diary"); // 원래 글 리스트 url로 이동
      })
    }
  }

  return <DiaryBody>
    {btnClicked===0?
      <DiaryHeader>
        <h2> {wrtPost.title} </h2>
        // 날짜 작게 추가하기
        <button onClick={()=>deleteBtn()}> 삭제 </button>
        // 본문 추가
        <button onClick={()=>setBtnClicked(1)}> 수정 </button>
        <button onClick={()=>history.push("/diary")}> 목록 </button> // 원래 글 리스트 url로 이동
      </DiaryHeader>
    :<DiaryBody style={{border:"0px", width:"90%"}}>
      <input value={wrtPost.title} onChange={(e)=>setWrtPost({...wrtPost, title:e.target.value})} type='text' id='title'/>
      <input value={wrtPost.content} onChange={(e)=>setWrtPost({...wrtPost, content:e.target.value})} style={{height:'40vh', textAlignVertical:"top"}} type='text' id='content'/>
      <button> 저장 </button> // 저장하는 부분
      <button onClick={()=>setBtnClicked(0)}> 취소 </button>
    </DiaryBody>
  }
  </DiaryBody>
};

function PostBlog({post_id}) {
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
          <Body post_id = {post_id}/>
        </Main>
    </Wrapper>
  );
}

export default PostBlog;
