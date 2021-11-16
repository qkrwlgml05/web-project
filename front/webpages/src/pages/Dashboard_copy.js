import React from 'react';
import {Link} from 'react-router-dom';

const Dashboard_copy = () => {
  const memo = [
    {"seq" : 1,
    "user_id" : 'id1',
    "title" : 'title1',
    "memo" : 'memo1',
    "reg_time" : '2021-11-02 13:58:27',
    "edit_time" : '2021-11-03 13:58:27'},
    {"seq" : 2,
    "user_id" : 'id2',
    "title" : 'title2',
    "memo" : 'memo2',
    "reg_time" : '2021-11-03 13:58:27',
    "edit_time" : '2021-11-03 13:58:27'},
    {"seq" : 3,
    "user_id" : 'id3',
    "title" : 'title3',
    "memo" : 'memo3',
    "reg_time" : '2021-11-03 13:58:27',
    "edit_time" : '2021-11-03 13:58:27'}
  ];

  const check = [];

  const onMemoModify = (e, item) => {
    check.push(item.seq);
    window.location.replace("/");
    alert(check[0]);
  }

  const onClickMemo = ({e, item}) => {

  }

  const onClickCancel = ({e, item}) => {

  }

  return (
    <div className="sidebar">
      {memo.length > 0 && memo.map((item,idx) =>{
        if (check.includes(item.seq)){
          return(
            <div>
            <input type="text" value={item.title}/>
            <input type="text" value={item.memo}/>
            <button onClink={(e)=>onClickMemo(e,item)}>저장</button>
            <button onClick={(e)=>onClickCancel(e,item)}>취소</button>
            </div>);
        }
        return(
          <div>
          {`[${new Date(item.reg_time).toLocaleString('ko-KR', { timeZone: 'UTC' })}] ${item.title}`}
          {item.memo}
          <button onClick={(e)=>onMemoModify(e,item)}>수정</button>
          </div>);
      })}
    </div>
  );
}

export default Dashboard_copy;
