import axios         from 'axios';
import { atom } from 'recoil';

const server = 'http://127.0.0.1:5000';

export const todoList = (id,date) => {
    return axios({
        url: server+'/todolist/get',
        method: 'post',
        data: {
            user_id: id,
            date: date
        },
        responseType: 'json',
        withCredentials: true,
        credentials: 'include'
    })
};

export const addTodo = (id,date,todo) => {
    return axios({
        url: server+'/todolist/add',
        method: 'post',
        data: {
            user_id: id,
            date: date,
            todo: todo
        },
        responseType: 'json',
        withCredentials: true,
        credentials: 'include'
    })
};

export const checkTodo = (id, date, todo_id, checked) => {
  return axios({
      url: server+'/todolist/check',
      method: 'post',
      data: {
        user_id: id,
        date: date,
        todo_id: todo_id,
        checked: checked
      },
      responseType: 'json',
      withCredentials: true,
      credentials: 'include'
    })
};

export const deleteTodo = (id, date, todo_id) => {
  return axios({
      url: server+'/todolist/delete',
      method: 'post',
      data: {
        user_id: id,
        date: date,
        todo_id: todo_id
      },
      responseType: 'json',
      withCredentials: true,
      credentials: 'include'
    })
};

export const getDiaryTitles = (id) => {
  return axios({
    url: server+'/diary/titles',
    method: 'post',
    data: {
      user_id: id
    },
    responseType: 'json',
    withCredentials: true,
    credentials: 'include'
  })
};

export const writeDiary = (id, title, content) => {
  return axios({
    url: server+'/diary/write',
    method: 'post',
    data: {
      user_id: id,
      title: title,
      content: content
    },
    responseType: 'json',
    withCredentials: true,
    credentials: 'include'
  })
};

export const deleteDiary = (id, post_ids) => {
  return axios({
    url: server+'/diary/delete',
    method: 'post',
    data: {
      user_id: id,
      post_ids: post_ids
    },
    responseType: 'json',
    withCredentials: true,
    credentials: 'include'
  })
};

export const postval = atom({
    key: 'diary',
    default: {title:"", content:""}
});
