import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';



const Dashboard = () => {
  const [memo, setmemo] = useState([
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
  ]);

  const MemoModify = ({item}) => {
    const [editable, setEditable] = useState(false);
    const [title, settitle] = useState(item.title);
    const [content, setcontent] = useState(item.memo);

    const onChangeTitle = (e) => {
      settitle(e.target.value);
    }

    const onChangeMemo = (e) => {
      setcontent(e.target.value);
    }

    const onMemoModify = (e) => {
      setEditable(true);
    }

    const onClickMemo = (e) => {
      item.title = title;
      item.memo = content;
      setEditable(false);
      // deleteMemo(item.user_id, item.seq)
      // .then(res=>{
      //   saveMemo(item)
      //   .then(res=>{
      //       setMemoList(res.data);
      //       alert('메모가 수정되었습니다.');
      //       setEditable(false);
      //   })
      // })
    };

    const onClickCancel = (e) => {
      settitle(item.title);
      setcontent(item.memo);
      setEditable(false);
    }

    return (
      <>
        <div>
          {editable ? (
            <div>
            <div><input id="title" type="text" value={title} onChange={onChangeTitle}/></div>
            <div><input id="memo" type="text" value={content} onChange={onChangeMemo}/></div>
            <div>
            <input type="button" value="수정" onClick={onClickMemo} />
            <input type="button" value="취소" onClick={onClickCancel} /></div>
            </div>
          ) : (
            <div>
            <div>{`[${new Date(item.reg_time).toLocaleString('ko-KR', { timeZone: 'UTC' })}] ${item.title}`}</div>
            <div>{item.memo}</div>
            <button onClick={onMemoModify}>수정</button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="sidebar">
      {memo.length > 0 && memo.map((item,idx) =>{
        return (
          <MemoModify item={item} />
        );
      })}
    </div>
  );
}

export default Dashboard;
