import express from 'express';

import cors from 'cors';

import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5000;

app.use(cors({ origin: '*'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let todos = [];

// 상태관리랑 같이하는걸로

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
}) // 읽기

app.post('/todo', (req, res) => {
  const { newTodo: { title } } = req.body;
  const newTodo = { id: uuidv4(), title, completed: false }

  todos = [...todos, newTodo]

  res.status(201).json({
    status: 'ok',
    message: '',
    data: newTodo,
  })
}) // 추가

app.delete('/todo', (req, res) => {
  const { id } = req.body;
  const deletedTodo = todos.find((todo) => todo.id === id);

  todos = todos.filter(todo => todo.id !== id);

  res.status(200).json({
    status: 'ok',
    message: '',
    data: deletedTodo,
  })
}) // 삭제

app.patch('/todo', (req, res) => {
  const { id } = req.body;
  const completedTodo = todos.find(todo => todo.id === id)

  completedTodo.completed = true;

  res.status(200).json({
    status: 'ok',
    message: '',
    data: completedTodo,
  })
}) // 수정

app.listen(PORT, () => {
  console.log('내가 서버다.');
})