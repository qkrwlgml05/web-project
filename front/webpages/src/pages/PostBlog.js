import {Sidebar, Menu, Header, Wrapper, Main, DiaryBody, DiaryHeader, CalendarHeader} from './Wrapper.js';
import {postval, getPost} from './Axios.js';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const user_id = 'aaa';

const PostBody = () => {
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

  const

  return <DiaryBody>
    {btnClicked===0?
      <DiaryHeader>
        <button onClick={()=>deleteBtn()}> 삭제 </button>
      </DiaryHeader>
    :<DiaryBody style={{border:"0px", width:"90%"}}>
      <input value={wrtPost.title} onChange={(e)=>setWrtPost({...wrtPost, title:e.target.value})} type='text' id='title'/>
      <input value={wrtPost.content} onChange={(e)=>setWrtPost({...wrtPost, content:e.target.value})} style={{height:'40vh', textAlignVertical:"top"}} type='text' id='content'/>
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

export default PostBody;
