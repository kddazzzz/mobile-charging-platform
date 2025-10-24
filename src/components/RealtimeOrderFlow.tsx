import { Card, List, Tag, Spin, Empty } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface OrderItem {
  id: string;
  orderNo: string;
  status: 'processing' | 'completed' | 'cancelled';
  user: string;
  device: string;
  time: string;
}

interface RealtimeOrderFlowProps {
  loading?: boolean;
}

export default function RealtimeOrderFlow({ loading = false }: RealtimeOrderFlowProps) {
  // Mock数据
  const orders: OrderItem[] = [
    { id: '1', orderNo: 'OD001', status: 'processing', user: '用户A', device: '设备CH123', time: '2分钟前' },
    { id: '2', orderNo: 'OD002', status: 'completed', user: '用户B', device: '设备CH124', time: '5分钟前' },
    { id: '3', orderNo: 'OD003', status: 'processing', user: '用户C', device: '设备CH125', time: '1分钟前' },
    { id: '4', orderNo: 'OD004', status: 'cancelled', user: '用户D', device: '设备CH126', time: '3分钟前' },
    { id: '5', orderNo: 'OD005', status: 'completed', user: '用户E', device: '设备CH127', time: '8分钟前' },
  ];

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'processing':
        return <Tag color="blue" icon={<ClockCircleOutlined />}>进行中</Tag>;
      case 'completed':
        return <Tag color="green" icon={<CheckCircleOutlined />}>已完成</Tag>;
      case 'cancelled':
        return <Tag color="red" icon={<CloseCircleOutlined />}>已取消</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  return (
    <Card 
      title="实时订单流" 
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
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : orders.length === 0 ? (
        <Empty description="暂无订单数据" />
      ) : (
        <List
          dataSource={orders}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              style={{ 
                padding: '16px 20px',
                background: 'rgba(42,97,255,0.05)',
                borderRadius: '12px',
                marginBottom: '12px',
                border: '1px solid rgba(42,97,255,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#152740',
                    fontSize: '16px',
                    fontFamily: 'Source Han Sans, sans-serif'
                  }}>
                    {item.orderNo}
                  </span>
                  {getStatusTag(item.status)}
                </div>
                <div style={{ 
                  color: '#152740', 
                  fontSize: '14px', 
                  opacity: 0.7,
                  fontFamily: 'Source Han Sans, sans-serif'
                }}>
                  {item.user} · {item.device} · {item.time}
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
