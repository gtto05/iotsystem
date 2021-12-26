import { Button, Table, Tag } from 'antd';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

export default function RightList() {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/rights')
      .then(res => res.json())
      .then(data => setDataSource(data))
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color={'orange'}>{key}</Tag>
      }
    },
    {
      title: '操作',
      render: () => {
        return <div>
           <Button danger shape="circle" icon={<DeleteOutlined />} />
           <Button type="primary" shape="circle" icon={<EditOutlined />} />
        </div>
      }
    }
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  )
}
