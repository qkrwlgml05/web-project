import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const Sidebar = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  justify-content: center;
  width: 15%;
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
  heigth: 30vh;
  flex-direction: row;
  background-color: #fffee7;
`;
