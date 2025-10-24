import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { label: '总览首页', key: '/dashboard' },
  { label: '设备管理', key: '/devices' },
  { label: '订单管理', key: '/orders' },
  { label: '场站管理', key: '/stations' },
  { label: '财务管理', key: '/finance' },
  { label: '系统设置', key: '/sysconfig' },
];

const themePrimary = '#13c2c2';

export default function MainLayout() {
  const { pathname } = useLocation();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', background: themePrimary, fontWeight: 700 }}>
        移动充电管理平台
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {menuItems.map(item => (
              <Menu.Item key={item.key}>
                <Link to={item.key}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Content
            style={{
              background: '#fff',
              minHeight: 280,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
