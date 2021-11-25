import {Sidebar, Menu, Header, Wrapper, Main, BodyWrapper, CalendarWrapper, CalendarHeader, CalendarBody, CalendarButton, CalendarWeek, TodoWrapper, TodoDate,
TodoAdd, TodoListDisplay} from './HomeSub.js';
import {todoList, addTodo} from './Axois.js';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const user_id = 'aaa';

const Body = () => {
  var today = new Date();
  const [yearMonth, setYearMonth] = useState({year: today.getFullYear(), month: today.getMonth()+1});
  const [todoDate, setTodoDate] = useState({year: today.getFullYear(), month: today.getMonth()+1, date: today.getDate()});
  const [todo, setToDo] = useState({});

  const Calendar = () => {
    const prevLast = new Date(yearMonth.year, yearMonth.month-1, 0);
    const currLast = new Date(yearMonth.year, yearMonth.month, 0);
    const days = ['일', '월', '화', '수', '목', '금', '토']

    const clickPrev = () => {
      if (yearMonth.month === 1){
        setYearMonth({year: yearMonth.year-1, month: 12});
      }else{
        setYearMonth({year: yearMonth.year, month: yearMonth.month-1});
      }
    };

    const clickNext = () => {
      if (yearMonth.month === 12){
        setYearMonth({year: yearMonth.year+1, month: 1});
      }else{
        setYearMonth({year: yearMonth.year, month: yearMonth.month+1});
      }
    };

    const clickDate = (e, last) => {
      if (e.target.id > 0 && e.target.id <= last){
        setTodoDate({year:yearMonth.year, month:yearMonth.month, date:e.target.id});
        todoList(user_id,String(yearMonth.year)+'-'+String(yearMonth.month)+'-'+String(e.target.id))
        .then(res=>{
            console.log(res);
            setToDo(res.data);
        })
      }
    };

    return (
      <CalendarWrapper>
        <CalendarHeader>
          <div>{yearMonth.year}-{yearMonth.month}</div>
          <button onClick={clickPrev}>prev</button>
          <button onClick={clickNext}>next</button>
        </CalendarHeader>
        <CalendarBody>
        <CalendarWeek>
        {
          days.map((day)=>{
                return <CalendarButton> {day} </CalendarButton>
            })
        }
        </CalendarWeek>
        {
          [0,1,2,3,4,5].map((week)=>{
            return <CalendarWeek> {
              [0,1,2,3,4,5,6].map((date)=>{
                return <CalendarButton id={date+week*7-prevLast.getDay()} onClick={(e)=>clickDate(e, currLast.getDate())}> {
                    date+week*7-prevLast.getDay() > 0?
                    (date+week*7-prevLast.getDay() <= currLast.getDate()?
                    date+week*7-prevLast.getDay() :
                    null) :
                    null
                } </CalendarButton>
              })
            } </CalendarWeek>
          })
        }
        </CalendarBody>
      </CalendarWrapper>
    );
  };

  const TodoList = () => {
    const [addData, setAddData] = useState('');
    const checkboxChecked = true;
    const clickAdd = (e) => {
      if (addData !== ''){
        addTodo(user_id,String(todoDate.year)+'-'+String(todoDate.month)+'-'+String(todoDate.date),addData)
        .then(res=>{
          setToDo(res.data);
          setAddData('');
          console.log(res.data);
        });
      }
    };

    return (
      <TodoWrapper>
        <div className="todo">todo list</div>
        <TodoDate>
          {todoDate.year}-{todoDate.month}-{todoDate.date}
        </TodoDate>
        <TodoAdd>
          <input id="todoInput" value={addData} onChange={(e)=>{setAddData(e.target.value)}}/>
          <button onClick={clickAdd}>추가</button>
        </TodoAdd>
        <TodoListDisplay>
          {
            todo.unchecked && todo.unchecked.map((unchecked)=>{
              return <div><input type="checkbox"/>{unchecked} <button>삭제</button></div>
            })
          }
        </TodoListDisplay>
        <TodoListDisplay>
          {
            todo.checked && todo.checked.map((checked)=>{
              return <div><input type="checkbox" checked={checkboxChecked}/>{checked} <button>삭제</button></div>
            })
          }
        </TodoListDisplay>
      </TodoWrapper>
    );
  };

  return (
    <BodyWrapper className="body">
      <Calendar /><TodoList />
    </BodyWrapper>
  );
};

function Home() {
  const side = [
    {name: "menu1", path: "/menu1"},
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

export default Home;
