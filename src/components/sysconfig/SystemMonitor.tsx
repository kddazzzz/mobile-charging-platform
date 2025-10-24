import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Alert, Button, Space, Spin, Empty } from 'antd';
import { ReloadOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';

interface SystemMonitorProps {
  loading?: boolean;
}

export default function SystemMonitor({ loading = false }: SystemMonitorProps) {
  const [monitorData, setMonitorData] = useState({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 78,
    uptime: '15天8小时',
    activeUsers: 23,
    totalRequests: 12580,
    errorRate: 0.8
  });

  const [alerts, setAlerts] = useState([
    { id: 1, level: 'warning', message: 'CPU使用率超过80%', time: '2分钟前' },
    { id: 2, level: 'info', message: '系统运行正常', time: '5分钟前' },
    { id: 3, level: 'error', message: '数据库连接异常', time: '10分钟前' }
  ]);

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitorData(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100),
        activeUsers: Math.floor(Math.random() * 50),
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        errorRate: Math.random() * 2
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, type: string) => {
    if (type === 'cpu' || type === 'memory') {
      if (value >= 90) return '#ff4d4f';
      if (value >= 70) return '#faad14';
      return '#52c41a';
    }
    if (type === 'disk') {
      if (value >= 90) return '#ff4d4f';
      if (value >= 80) return '#faad14';
      return '#52c41a';
    }
    return '#13c2c2';
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <WarningOutlined style={{ color: '#ff4d4f' }} />;
      case 'warning':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'info':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return <CheckCircleOutlined />;
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'error':
        return '#ff4d4f';
      case 'warning':
        return '#faad14';
      case 'info':
        return '#52c41a';
      default:
        return '#13c2c2';
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
      {/* 系统状态概览 */}
      <Card 
        title="系统状态概览" 
        style={{ marginBottom: 24 }}
        headStyle={{ 
          background: 'transparent', 
          borderBottom: '1px solid rgba(21,39,64,0.1)',
          color: '#152740',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Source Han Sans, sans-serif'
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="CPU使用率"
                value={monitorData.cpu}
                suffix="%"
                valueStyle={{ 
                  color: getStatusColor(monitorData.cpu, 'cpu'),
                  fontFamily: 'Swis 721 Bold, sans-serif'
                }}
              />
              <Progress 
                percent={monitorData.cpu} 
                strokeColor={getStatusColor(monitorData.cpu, 'cpu')}
                showInfo={false}
                style={{ marginTop: 8 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="内存使用率"
                value={monitorData.memory}
                suffix="%"
                valueStyle={{ 
                  color: getStatusColor(monitorData.memory, 'memory'),
                  fontFamily: 'Swis 721 Bold, sans-serif'
                }}
              />
              <Progress 
                percent={monitorData.memory} 
                strokeColor={getStatusColor(monitorData.memory, 'memory')}
                showInfo={false}
                style={{ marginTop: 8 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="磁盘使用率"
                value={monitorData.disk}
                suffix="%"
                valueStyle={{ 
                  color: getStatusColor(monitorData.disk, 'disk'),
                  fontFamily: 'Swis 721 Bold, sans-serif'
                }}
              />
              <Progress 
                percent={monitorData.disk} 
                strokeColor={getStatusColor(monitorData.disk, 'disk')}
                showInfo={false}
                style={{ marginTop: 8 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="网络使用率"
                value={monitorData.network}
                suffix="%"
                valueStyle={{ 
                  color: getStatusColor(monitorData.network, 'network'),
                  fontFamily: 'Swis 721 Bold, sans-serif'
                }}
              />
              <Progress 
                percent={monitorData.network} 
                strokeColor={getStatusColor(monitorData.network, 'network')}
                showInfo={false}
                style={{ marginTop: 8 }}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 运行状态 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="系统运行时间"
              value={monitorData.uptime}
              valueStyle={{ 
                color: '#152740',
                fontFamily: 'Source Han Sans, sans-serif'
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="在线用户"
              value={monitorData.activeUsers}
              suffix="人"
              valueStyle={{ 
                color: '#13c2c2',
                fontFamily: 'Swis 721 Bold, sans-serif'
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="总请求数"
              value={monitorData.totalRequests}
              valueStyle={{ 
                color: '#13c2c2',
                fontFamily: 'Swis 721 Bold, sans-serif'
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="错误率"
              value={monitorData.errorRate}
              suffix="%"
              valueStyle={{ 
                color: monitorData.errorRate > 1 ? '#ff4d4f' : '#52c41a',
                fontFamily: 'Swis 721 Bold, sans-serif'
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* 告警信息 */}
      <Card 
        title="系统告警" 
        style={{ marginBottom: 24 }}
        headStyle={{ 
          background: 'transparent', 
          borderBottom: '1px solid rgba(21,39,64,0.1)',
          color: '#152740',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Source Han Sans, sans-serif'
        }}
        extra={
          <Button 
            icon={<ReloadOutlined />} 
            size="small"
            disabled={loading}
          >
            刷新
          </Button>
        }
      >
        {alerts.length === 0 ? (
          <Empty description="暂无告警信息" />
        ) : (
          <div>
            {alerts.map(alert => (
              <Alert
                key={alert.id}
                message={alert.message}
                type={alert.level === 'error' ? 'error' : alert.level === 'warning' ? 'warning' : 'info'}
                showIcon
                icon={getAlertIcon(alert.level)}
                style={{ 
                  marginBottom: 8,
                  borderRadius: '8px'
                }}
                description={
                  <div style={{ 
                    color: '#666',
                    fontSize: '12px',
                    fontFamily: 'Source Han Sans, sans-serif'
                  }}>
                    {alert.time}
                  </div>
                }
              />
            ))}
          </div>
        )}
      </Card>

      {/* 性能指标 */}
      <Card 
        title="性能指标" 
        headStyle={{ 
          background: 'transparent', 
          borderBottom: '1px solid rgba(21,39,64,0.1)',
          color: '#152740',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Source Han Sans, sans-serif'
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ 
                fontSize: '14px', 
                color: '#666',
                fontFamily: 'Source Han Sans, sans-serif',
                marginBottom: '8px'
              }}>
                响应时间趋势
              </div>
              <div style={{ 
                height: '100px', 
                background: 'linear-gradient(135deg, rgba(42,97,255,0.1), rgba(36,214,226,0.1))',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#152740',
                fontFamily: 'Source Han Sans, sans-serif'
              }}>
                图表组件待集成
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ 
                fontSize: '14px', 
                color: '#666',
                fontFamily: 'Source Han Sans, sans-serif',
                marginBottom: '8px'
              }}>
                请求量趋势
              </div>
              <div style={{ 
                height: '100px', 
                background: 'linear-gradient(135deg, rgba(42,97,255,0.1), rgba(36,214,226,0.1))',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#152740',
                fontFamily: 'Source Han Sans, sans-serif'
              }}>
                图表组件待集成
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
