import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
`;

export const Sidebar = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #d0d0d0;
  justify-content: center;
  width: 15%;
  background-color: #e0e0e0;
  position: flexed;
`;

export const Menu = styled.div`
  display: flex;
  width: 15%;
  margin-top: 10px;
  margin-left: 10px;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 30vh;
  margin-top: 0px;
  flex-direction: column;
  background-color: #ffcc00;
  border-bottom: 1px solid #d0d0d0;
  text-align: center;
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 94%;
  height: 60vh;
  border: 1px solid #d0d0d0;
  margin: 3%;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height:60vh;
  border-right: 1px solid #d0d0d0;
`;

export const CalendarHeader = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d0d0d0;
`;

export const CalendarButton = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 7);
  height: 6.9vh;
  text-align: right;
  padding-right: calc(100% / 140);
  padding-left: calc(100% / 140);
  padding-top: 1vh;
  border: 1px solid #d0d0d0;
`;

export const CalendarBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const CalendarWeek = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

export const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height:60vh;
`;

export const TodoDate = styled.div`
  display: flex;
  height:4vh;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #d0d0d0;
  padding-left: 3%;
`;

export const TodoAdd = styled.div`
  display: flex;
  bottom: 0;
  flex-direction: row;
  border-bottom: 1px solid #d0d0d0;
`;

export const TodoListDisplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 2%;
  padding: 1%;
  border: 1px solid #d0d0d0;
`;
