import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Login from '../views/login/Login'
import NotFound from '../views/NotFound'
import Home from '../views/sandbox/home/Home'
import Category from '../views/sandbox/news-manage/Category'
import Draft from '../views/sandbox/news-manage/Draft'
import RightList from '../views/sandbox/right-manage/RightList'
import Sandbox from '../views/sandbox/Sandbox'
import RoleList from '../views/sandbox/right-manage/RoleList'
import UserList from '../views/sandbox/user-manage/UserList'
export default function RouterIndex() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>}></Route>
        <Route path="" element={
        localStorage.getItem('token')?  <Sandbox/> : <Login/>
        }>
          <Route path="home" element={<Home/>}/>
          <Route path="user-manage/list" element={<UserList/>}/>
          <Route path="right-manage/role/list" element={<RoleList/>}/>
          <Route path="right-manage/right/list" element={<RightList/>}/>
          <Route path="news-manage/draft" element={<Draft/>}/>
          <Route path="news-manage/category" element={<Category/>}/>
          <Route path="" element={<Navigate to="home"/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
