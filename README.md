# IoT system

- [x] 项目创建及配置
  1. 脚手架创建
  2. 处理 CSS 模块化
  3. CSS 扩展语言支持
  4. 反向代理
- [x] 路由架构
  1. 路由设计
  2. 路由搭建
- [x] 页面搭建及业务逻辑
  1. 侧边栏折叠
  2. 登录退出
  3. 动态侧边栏
  4. 权限管理

## 项目创建及配置

### 脚手架创建

```
yarn create react-app iotsystem
npm create-react-app iotsystem
```

### 处理 CSS 模块化

> 注意： 模块化只对类、id 选择器有效

1. 创建 `xxx.module.css`

2. 引入 `import style from './xxx.modul.css'`

3. 使用 `style.className`

### CSS 扩展语法支持

1. 安装 `npm i sass --save`

2. 更改 css 后缀为 scss

### 反向代理

1. 安装中间件 `npm i http-proxy-middleware --save-dev`

2. 创建 `setupProxy.js`，遵循 commonJS 规范

3. `http-proxy-middleware`模块分别暴露出一个`createProxyMiddleWare`方法

4. 暴露出一个方法， 参数为 `app`

5. 使用中间件

- 参数一：要代理的路径:string
- 参数二：`createProxyMiddleWare`方法
  - 配置对象有 `target`、`changeOrigin`

## 路由架构

@import "./md/router.png"

1. 安装路由
2. 创建**主路由组件**并引入到**App 组件**中

- Login
- NewsSandbox(重定向 render)
  - SideMenu
  - TopHeader
  - Switch(二级路由)
    - Home(重定向 Redirect)
    - User
    - RoleList
    - RightList
    - ...
    - 403 组件(\*)

## 借助 antd 布局

### TopHeader

1. 返回一个 Header 组件
2. collapsed 属性控制是否折叠 SideMenu
3. changeCollapsed 方法来操作 collapsed 的值
4. Dropdown 组件来显示头像、用户名称，退出等信息

### 动态 SideMenu

1. json-server 模拟后台数据 REST ful

   - get
   - post
   - put / patch
   - delete
   - \_embed 向下链接
   - \_expand 向上链接

2. 渲染侧边栏 `Sider` 组件
   - Menu
   - Menu.Item
   - SubMenu
3. 定义状态 menuList，利用 useEffect 钩子函数请求并赋值给 menuList
4. renderMenu 方法来渲染出动态的菜单

   - 判断 menuList 中是否有 children 属性并且长度不能为 0, 并且 pagepermisson 是否等于 1 来动态返回一级菜单 Menu.Item 还是返回二级菜单 SubMenu
   - 一级菜单点击跳转 v5:useRouter ,v6:useNavigate
   - 请求回来的列表中没有 icon 数据，我们就需要手动创建 iconList 对象

5. 控制高亮 selectedKey
6. 控制折叠 openKeys

### 权限管理

1. 权限列表
   - 渲染页面 `Table` 组件
     - `dataSource` 管理数据(后台请求)，
     - `colums` 控制列数据，其中 `render` 可以定制
     - `rowKey` 控制唯一值的 key
   - 删除 ： `Modal` 组件
     - `setDataSource(dataSource.filter(data=>data !== item.id))`
     - `axios.delete(${apiUrl}/rights/${item.id})`
     - 判断层级再决定删除二级，过滤出需要的列表,然后再更新页面
   - 配置
     - 渲染 Popover
     - 内容 content
     - 没有 pagepermisson 项的禁止点击 disable trigger
2. 角色列表
   - 渲染页面 `Table`组件
   -
