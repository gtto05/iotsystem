// eslint-disable-next-line import/no-extraneous-dependencies
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Modal, Popover, Switch, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

const { confirm } = Modal;
export default function RightList() {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/rights?_embed=children')
      .then((res) => res.json())
      .then((data) => {
        const newData = data.slice(0);
        newData.forEach((item) => {
          if (item.children.length === 0) {
            item.children = '';
          }
        });
        setDataSource(newData);
      });
  }, []);
  // 删除
  const deleteMethod = (item) => {
    if (item.grade === 1) {
      setDataSource(dataSource.filter((data) => data.id !== item.id));
      fetch(`http://localhost:4000/rights/${item.id}`, {
        method: 'delete',
      });
    } else {
      console.log(item.rightId);
      // 根据rightId找到上一层
      const list = dataSource.filter((data) => data.id === item.rightId)[0];
      // console.log(list);
      list.children = list.children.filter((data) => data.id !== item.id);
      // console.log(list);
      fetch(`http://localhost:4000/children/${item.id}`, {
        method: 'delete',
      });
      setDataSource([...dataSource]);
    }
  };
  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 配置项Switch切换
  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 0 ? 1 : 0;
    console.log('onChange', item);
    setDataSource([...dataSource]);
    const data = {
      pagepermisson: item.pagepermisson,
    };
    if (item.grade === 1) {
      fetch(`http://localhost:4000/rights/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } else {
      fetch(`http://localhost:4000/children/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>,
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => <Tag color="orange">{key}</Tag>,
    },
    {
      title: '操作',
      render: (item) => (
        <div>
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              confirmMethod(item);
            }}
          />
          <Popover
            content={
              <Switch
                defaultChecked={item.pagepermisson}
                onChange={() => {
                  switchMethod(item);
                }}
              />
            }
            title="页面配置项"
            trigger={item.pagepermisson === undefined ? '' : 'click'}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.pagepermisson === undefined}
            />
          </Popover>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
}
