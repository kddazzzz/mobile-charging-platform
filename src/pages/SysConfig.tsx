import { useState, useEffect } from 'react';
import { Card, Tabs, Spin, Alert, Button, Space, Typography } from 'antd';
import { ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import BasicConfig from '../components/sysconfig/BasicConfig';
import UserPermission from '../components/sysconfig/UserPermission';
import SystemMonitor from '../components/sysconfig/SystemMonitor';
import LogManagement from '../components/sysconfig/LogManagement';
import DataManagement from '../components/sysconfig/DataManagement';

const { Title } = Typography;
const { TabPane } = Tabs;

export default function SysConfig() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // 模拟数据加载
  const loadData = async () => {
    setLoading(true);
    setError(false);
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟偶尔的加载失败
      if (Math.random() < 0.1) {
        throw new Error('数据加载失败');
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载数据
  useEffect(() => {
    loadData();
  }, []);

  const handleRetry = () => {
    loadData();
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  if (error) {
    return (
      <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: '#333' }}>系统设置</Title>
        </div>
        <Alert
          message="数据加载失败"
          description="网络连接异常，请检查网络后重试"
          type="error"
          action={
            <Button size="small" danger onClick={handleRetry}>
              重试
            </Button>
          }
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, color: '#333' }}>系统设置</Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={handleRetry} loading={loading}>
            刷新数据
          </Button>
        </Space>
      </div>

      <Card
        style={{
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabBarStyle={{
            background: 'transparent',
            margin: 0,
            padding: '0 24px',
            borderBottom: '1px solid rgba(21,39,64,0.1)'
          }}
          items={[
            {
              key: 'basic',
              label: (
                <span style={{ 
                  fontFamily: 'Source Han Sans, sans-serif',
                  fontWeight: '500',
                  color: activeTab === 'basic' ? '#2A61FF' : '#152740'
                }}>
                  <SettingOutlined style={{ marginRight: 8 }} />
                  基础配置
                </span>
              ),
              children: <BasicConfig loading={loading} />
            },
            {
              key: 'user',
              label: (
                <span style={{ 
                  fontFamily: 'Source Han Sans, sans-serif',
                  fontWeight: '500',
                  color: activeTab === 'user' ? '#2A61FF' : '#152740'
                }}>
                  用户权限管理
                </span>
              ),
              children: <UserPermission loading={loading} />
            },
            {
              key: 'monitor',
              label: (
                <span style={{ 
                  fontFamily: 'Source Han Sans, sans-serif',
                  fontWeight: '500',
                  color: activeTab === 'monitor' ? '#2A61FF' : '#152740'
                }}>
                  系统监控
                </span>
              ),
              children: <SystemMonitor loading={loading} />
            },
            {
              key: 'log',
              label: (
                <span style={{ 
                  fontFamily: 'Source Han Sans, sans-serif',
                  fontWeight: '500',
                  color: activeTab === 'log' ? '#2A61FF' : '#152740'
                }}>
                  日志管理
                </span>
              ),
              children: <LogManagement loading={loading} />
            },
            {
              key: 'data',
              label: (
                <span style={{ 
                  fontFamily: 'Source Han Sans, sans-serif',
                  fontWeight: '500',
                  color: activeTab === 'data' ? '#2A61FF' : '#152740'
                }}>
                  数据管理
                </span>
              ),
              children: <DataManagement loading={loading} />
            }
          ]}
        />
      </Card>
    </div>
  );
}