import axios         from 'axios';

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
