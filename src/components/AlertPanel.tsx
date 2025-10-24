import { Card, List, Tag, Spin, Empty, Button } from 'antd';
import { ExclamationCircleOutlined, WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface AlertItem {
  id: number;
  level: 'error' | 'warning' | 'info';
  message: string;
  time: string;
}

interface AlertPanelProps {
  alerts: AlertItem[];
  loading?: boolean;
}

export default function AlertPanel({ alerts, loading = false }: AlertPanelProps) {
  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'warning':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'info':
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'error':
        return '#ff4d4f';
      case 'warning':
        return '#faad14';
      case 'info':
        return '#1890ff';
      default:
        return '#d9d9d9';
    }
  };

  const handleAlertClick = (alert: AlertItem) => {
    console.log('处理告警:', alert);
    // 这里可以跳转到告警详情页面或处理流程
  };

  return (
    <Card 
      title="异常告警面板" 
      size="small" 
      style={{ 
        height: '400px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}
      headStyle={{ 
        background: 'transparent', 
        borderBottom: 'none',
        color: '#152740',
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Source Han Sans, sans-serif',
        padding: '20px 24px 16px'
      }}
      bodyStyle={{ 
        background: 'transparent',
        padding: '0 24px 24px'
      }}
      extra={
        <Button 
          type="link" 
          size="small" 
          style={{ 
            color: '#2A61FF',
            fontFamily: 'Source Han Sans, sans-serif',
            fontWeight: '500'
          }}
        >
          全部处理
        </Button>
      }
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : alerts.length === 0 ? (
        <Empty description="暂无告警信息" />
      ) : (
        <List
          dataSource={alerts}
          renderItem={(alert) => (
            <List.Item
              key={alert.id}
              style={{ 
                padding: '16px 20px',
                background: 'rgba(42,97,255,0.05)',
                borderRadius: '12px',
                marginBottom: '12px',
                border: '1px solid rgba(42,97,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleAlertClick(alert)}
            >
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  {getAlertIcon(alert.level)}
                  <Tag 
                    color={getAlertColor(alert.level)} 
                    style={{ 
                      marginLeft: '8px', 
                      marginBottom: 0,
                      fontFamily: 'Source Han Sans, sans-serif',
                      fontWeight: '500'
                    }}
                  >
                    {alert.level === 'error' ? '错误' : alert.level === 'warning' ? '警告' : '信息'}
                  </Tag>
                </div>
                <div style={{ 
                  color: '#152740', 
                  fontSize: '14px', 
                  marginBottom: '6px',
                  fontFamily: 'Source Han Sans, sans-serif',
                  fontWeight: '500'
                }}>
                  {alert.message}
                </div>
                <div style={{ 
                  color: '#152740', 
                  fontSize: '12px',
                  opacity: 0.7,
                  fontFamily: 'Source Han Sans, sans-serif'
                }}>
                  {alert.time}
                </div>
              </div>
            </List.Item>
          )}
          style={{ maxHeight: '320px', overflowY: 'auto' }}
        />
      )}
    </Card>
  );
}
