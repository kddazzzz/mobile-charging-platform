import { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Spin, Alert, Button, Space, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ReloadOutlined } from '@ant-design/icons';
import KPICard from '../components/KPICard';
import RealtimeOrderFlow from '../components/RealtimeOrderFlow';
import DeviceMap from '../components/DeviceMap';
import TrendChart from '../components/TrendChart';
import AlertPanel from '../components/AlertPanel';
import FilterBar from '../components/FilterBar';
import DeviceStatusTable from '../components/DeviceStatusTable';

const { Title } = Typography;

// Mock数据生成
const generateKPIData = () => ({
  orders: {
    processing: Math.floor(Math.random() * 50) + 10,
    completed: Math.floor(Math.random() * 200) + 100,
    successRate: Number((Math.random() * 20 + 80).toFixed(1)),
    avgResponseTime: Number((Math.random() * 30 + 10).toFixed(1))
  },
  devices: {
    online: Math.floor(Math.random() * 50) + 20,
    utilization: Number((Math.random() * 40 + 30).toFixed(1)),
    healthRate: Number((Math.random() * 10 + 90).toFixed(1))
  },
  revenue: {
    today: Number((Math.random() * 10000 + 5000).toFixed(2)),
    avgOrderValue: Number((Math.random() * 100 + 50).toFixed(2)),
    completionRate: Number((Math.random() * 20 + 80).toFixed(1))
  }
});

const generateAlerts = () => [
  { id: 1, level: 'error', message: '设备CH123离线超过30分钟', time: '2分钟前' },
  { id: 2, level: 'warning', message: '场站A设备利用率过高', time: '5分钟前' },
  { id: 3, level: 'info', message: '新订单OD001已分配设备', time: '1分钟前' }
];

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [kpiData, setKpiData] = useState(generateKPIData());
  const [alerts, setAlerts] = useState(generateAlerts());
  const [filters, setFilters] = useState({
    timeRange: 'today',
    region: 'all',
    deviceType: 'all'
  });

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
      
      setKpiData(generateKPIData());
      setAlerts(generateAlerts());
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

  // 定时刷新数据
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        setKpiData(generateKPIData());
        setAlerts(generateAlerts());
      }
    }, 30000); // 30秒刷新一次

    return () => clearInterval(interval);
  }, [loading]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // 筛选条件变更时显示loading状态
    setLoading(true);
    loadData();
  };

  const handleRetry = () => {
    loadData();
  };

  // KPI卡片点击跳转处理
  const handleKPIClick = (type: string) => {
    console.log(`跳转到${type}详细页面`);
    // 这里可以根据type跳转到不同的详细页面
    // 例如：navigate(`/orders?filter=${type}`)
  };

  if (error) {
    return (
      <div>
        <Title level={2}>总览首页</Title>
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
        <Title level={2} style={{ margin: 0, color: '#333' }}>总览首页</Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={handleRetry} loading={loading}>
            刷新数据
          </Button>
        </Space>
      </div>

      {/* 筛选条件栏 */}
      <FilterBar filters={filters} onChange={handleFilterChange} />

      {/* KPI指标区域 */}
      <Card 
        title="核心运营指标" 
        style={{ 
          marginBottom: 24, 
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
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'Source Han Sans, sans-serif',
          padding: '20px 24px 16px'
        }}
        bodyStyle={{ 
          background: 'transparent',
          padding: '0 24px 24px'
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="实时进行中订单"
              value={kpiData.orders.processing}
              suffix="单"
              trend="up"
              loading={loading}
              onClick={() => handleKPIClick('orders')}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="今日完成订单"
              value={kpiData.orders.completed}
              suffix="单"
              trend="up"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="订单成功率"
              value={kpiData.orders.successRate}
              suffix="%"
              trend="up"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="平均响应时间"
              value={kpiData.orders.avgResponseTime}
              suffix="分钟"
              trend="down"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="在线设备数"
              value={kpiData.devices.online}
              suffix="台"
              trend="up"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="设备利用率"
              value={kpiData.devices.utilization}
              suffix="%"
              trend="up"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="设备完好率"
              value={kpiData.devices.healthRate}
              suffix="%"
              trend="up"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="今日总收入"
              value={kpiData.revenue.today}
              suffix="元"
              trend="up"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="客单价"
              value={kpiData.revenue.avgOrderValue}
              suffix="元"
              trend="up"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <KPICard
              title="收入完成率"
              value={kpiData.revenue.completionRate}
              suffix="%"
              trend="up"
              loading={loading}
            />
          </Col>
        </Row>
      </Card>

      {/* 实时监控区域 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={12}>
          <RealtimeOrderFlow loading={loading} />
        </Col>
        <Col xs={24} lg={12}>
          <DeviceMap loading={loading} />
        </Col>
      </Row>

      {/* 趋势分析区域 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={16}>
          <TrendChart loading={loading} />
        </Col>
        <Col xs={24} lg={8}>
          <AlertPanel alerts={alerts} loading={loading} />
        </Col>
      </Row>

      {/* 设备状态详情表格 */}
      <Card 
        title="设备状态详情" 
        loading={loading}
        style={{ 
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
      >
        <DeviceStatusTable loading={loading} />
      </Card>
    </div>
  );
}
