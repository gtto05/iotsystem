/* eslint-disable import/no-extraneous-dependencies */
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Table, Modal, Tree } from 'antd';
import React, { useEffect, useState } from 'react';

const { confirm } = Modal;
export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rightList, setRightList] = useState([]);
  const [currentRights, setCurrentRights] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    fetch('http://localhost:4000/roles')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDataSource(data);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:4000/rights?_embed=children')
      .then((res) => res.json())
      .then((data) => {
        setRightList(data);
      });
  }, []);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    console.log(currentId);
    setCurrentRights(checkedKeys);
  };

  // 对话框
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    console.log('ok');
    setIsModalVisible(false);

    // 同步dataSource
    setDataSource(
      dataSource.map((item) => {
        if (item.id === currentId) {
          const res = {
            ...item,
            rights: currentRights,
          };
          console.log(res);
          return res;
        }
        return item;
      })
    );
    // patch更新
    fetch(`http://localhost:4000/roles/${currentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rights: currentRights }),
    });
  };
  const handleCancel = () => {
    console.log('cancel');
    setIsModalVisible(false);
  };

  // 删除
  const deleteMethod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    fetch(`http://localhost:4000/roles/${item.id}`, {
      method: 'delete',
    });
  };

  // 确认框
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
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
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              showModal();
              setCurrentRights(item.rights);
              setCurrentId(item.id);
            }}
          />
          <Modal
            title="权限分配"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Tree
              checkable
              checkedKeys={currentRights}
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={rightList}
            />
          </Modal>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      />
    </div>
  );
}
