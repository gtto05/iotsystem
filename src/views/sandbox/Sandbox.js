import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../../component/sandbox/SideMenu'
import TopHeader from '../../component/sandbox/TopHeader'
import { Layout } from 'antd'
import './Sandbox.css'
const {Content} = Layout
export default function Sandbox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
