import { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Tag, Space, message, Spin, Empty } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

interface UserPermissionProps {
  loading?: boolean;
}

export default function UserPermission({ loading = false }: UserPermissionProps) {
  const [userForm] = Form.useForm();
  const [roleForm] = Form.useForm();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('users');

  // Mock用户数据
  const users = [
    { id: 1, username: 'admin', realName: '系统管理员', email: 'admin@example.com', phone: '13800138000', role: '超级管理员', status: 'active' },
    { id: 2, username: 'operator', realName: '运营人员', email: 'operator@example.com', phone: '13800138001', role: '运营管理员', status: 'active' },
    { id: 3, username: 'viewer', realName: '查看者', email: 'viewer@example.com', phone: '13800138002', role: '普通用户', status: 'inactive' }
  ];

  // Mock角色数据
  const roles = [
    { id: 1, name: '超级管理员', description: '拥有所有权限', permissions: ['all'], userCount: 1 },
    { id: 2, name: '运营管理员', description: '管理运营相关功能', permissions: ['device', 'order', 'station'], userCount: 1 },
    { id: 3, name: '普通用户', description: '只能查看数据', permissions: ['view'], userCount: 1 }
  ];

  const userColumns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif', fontWeight: 'bold' }}>
          {text}
        </span>
      )
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {text}
        </span>
      )
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {text}
        </span>
      )
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {text}
        </span>
      )
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === '超级管理员' ? 'red' : role === '运营管理员' ? 'blue' : 'green'}>
          {role}
        </Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
            disabled={loading}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
            disabled={loading}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  const roleColumns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif', fontWeight: 'bold' }}>
          {text}
        </span>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {text}
        </span>
      )
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <Space wrap>
          {permissions.map(permission => (
            <Tag key={permission} color="blue">
              {permission === 'all' ? '全部权限' : 
               permission === 'device' ? '设备管理' :
               permission === 'order' ? '订单管理' :
               permission === 'station' ? '场站管理' :
               permission === 'view' ? '查看权限' : permission}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count: number) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {count}人
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEditRole(record)}
            disabled={loading}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRole(record.id)}
            disabled={loading}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  const handleAddUser = () => {
    setEditingUser(null);
    userForm.resetFields();
    setUserModalVisible(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    userForm.setFieldsValue(user);
    setUserModalVisible(true);
  };

  const handleDeleteUser = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      onOk: () => {
        message.success('用户删除成功');
      }
    });
  };

  const handleAddRole = () => {
    setEditingRole(null);
    roleForm.resetFields();
    setRoleModalVisible(true);
  };

  const handleEditRole = (role: any) => {
    setEditingRole(role);
    roleForm.setFieldsValue(role);
    setRoleModalVisible(true);
  };

  const handleDeleteRole = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个角色吗？',
      onOk: () => {
        message.success('角色删除成功');
      }
    });
  };

  const handleUserSubmit = async (values: any) => {
    try {
      // 模拟保存
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success(editingUser ? '用户更新成功' : '用户创建成功');
      setUserModalVisible(false);
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleRoleSubmit = async (values: any) => {
    try {
      // 模拟保存
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success(editingRole ? '角色更新成功' : '角色创建成功');
      setRoleModalVisible(false);
    } catch (error) {
      message.error('操作失败');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card
        style={{ marginBottom: 24 }}
        tabList={[
          { key: 'users', tab: <span><UserOutlined /> 用户管理</span> },
          { key: 'roles', tab: <span><TeamOutlined /> 角色管理</span> }
        ]}
        activeTabKey={activeTab}
        onTabChange={setActiveTab}
        tabBarStyle={{
          background: 'transparent',
          margin: 0,
          borderBottom: '1px solid rgba(21,39,64,0.1)'
        }}
      >
        {activeTab === 'users' ? (
          <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: 'Source Han Sans, sans-serif' }}>用户列表</h3>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddUser}
                disabled={loading}
              >
                新增用户
              </Button>
            </div>
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              style={{ background: 'transparent' }}
            />
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: 'Source Han Sans, sans-serif' }}>角色列表</h3>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddRole}
                disabled={loading}
              >
                新增角色
              </Button>
            </div>
            <Table
              columns={roleColumns}
              dataSource={roles}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              style={{ background: 'transparent' }}
            />
          </div>
        )}
      </Card>

      {/* 用户编辑弹窗 */}
      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={userModalVisible}
        onCancel={() => setUserModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={userForm}
          layout="vertical"
          onFinish={handleUserSubmit}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 20, message: '用户名长度为3-20个字符' }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="真实姓名"
            name="realName"
            rules={[
              { required: true, message: '请输入真实姓名' },
              { min: 2, max: 10, message: '真实姓名长度为2-10个字符' }
            ]}
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Select.Option value="超级管理员">超级管理员</Select.Option>
              <Select.Option value="运营管理员">运营管理员</Select.Option>
              <Select.Option value="普通用户">普通用户</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setUserModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 角色编辑弹窗 */}
      <Modal
        title={editingRole ? '编辑角色' : '新增角色'}
        open={roleModalVisible}
        onCancel={() => setRoleModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={roleForm}
          layout="vertical"
          onFinish={handleRoleSubmit}
        >
          <Form.Item
            label="角色名称"
            name="name"
            rules={[
              { required: true, message: '请输入角色名称' },
              { min: 1, max: 20, message: '角色名称长度为1-20个字符' }
            ]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            label="角色描述"
            name="description"
            rules={[
              { max: 200, message: '角色描述最多200个字符' }
            ]}
          >
            <Input.TextArea placeholder="请输入角色描述" rows={3} />
          </Form.Item>

          <Form.Item
            label="权限"
            name="permissions"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Select mode="multiple" placeholder="请选择权限">
              <Select.Option value="all">全部权限</Select.Option>
              <Select.Option value="device">设备管理</Select.Option>
              <Select.Option value="order">订单管理</Select.Option>
              <Select.Option value="station">场站管理</Select.Option>
              <Select.Option value="finance">财务管理</Select.Option>
              <Select.Option value="view">查看权限</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setRoleModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
