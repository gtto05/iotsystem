import { UserOutlined, ControlOutlined, HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

const { Sider } = Layout
const { SubMenu } = Menu

export default function SideMenu() {
  const [menuList, setMenuList] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/rights?_embed=children')
      .then(res => res.json())
      .then(data => {
        setMenuList(data)
      })
  }, [])
  let navigate = useNavigate()
  let location = useLocation()

  // const menuList = [
  //   {
  //     key: 'home',
  //     icon: <UserOutlined />,
  //     title: '首页'
  //   },
  //   {
  //     key: 'user-manage',
  //     icon: <UserOutlined />,
  //     title: '用户管理',
  //     children: [
  //       {
  //         key: 'user-manage/list',
  //         icon: <UserOutlined />,
  //         title: '用户列表'
  //       }
  //     ]
  //   },
  //   {
  //     key: 'right-manage',
  //     icon: <UserOutlined />,
  //     title: '权限管理',
  //     children: [
  //       {
  //         key: 'right-manage/role/list',
  //         icon: <UserOutlined />,
  //         title: '角色列表'
  //       },
  //       {
  //         key: 'right-manage/right/list',
  //         icon: <UserOutlined />,
  //         title: '权限列表'
  //       }
  //     ]
  //   }
  // ]

  // 获取默认选中的key
  const selectedKey = [location.pathname]
  // 获取默认打开的key
  const openKeys = ['/' + location.pathname.split('/')[1]]

  // 过滤请求过来的数据(pagepermisson : 1)
  const checkPagePermission = (menu) => {
    return menu.pagepermisson === 1
  }

  // iconList
  const iconList = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/user-manage/list': <UserOutlined />,
    '/right-manage': <ControlOutlined />,
    '/right-manage/role/list': <UnorderedListOutlined />,
    '/right-manage/right/list': <UnorderedListOutlined />,
  }

  // 渲染menu
  const renderMenu = (menuList) => {
    return menuList.map(menu => {
      if (menu.children?.length > 0 && checkPagePermission(menu)) {
        return <SubMenu key={menu.key} icon={iconList[menu.key]} title={menu.title}>
          {renderMenu(menu.children)}
        </SubMenu>
      } else {
        return checkPagePermission(menu) && <Menu.Item key={menu.key} icon={iconList[menu.key]} title={menu.title} onClick={() => {
          // 点击导航跳转路由
          navigate(menu.key)
        }}>{menu.title}</Menu.Item>
      }
    })
  }
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: 'flex', height:'100%',flexDirection: 'column'}}>
        <div className="logo">IoT新闻发布系统</div>
        <div style={{ flex: 1, 'overflow': 'auto' }}>
          <Menu theme="dark" mode="inline" selectedKeys={selectedKey} defaultOpenKeys={openKeys}>
            {renderMenu(menuList)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
