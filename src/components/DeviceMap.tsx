import { Card, Tag, Spin, Empty } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

interface DeviceItem {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  location: string;
  battery: number;
}

interface DeviceMapProps {
  loading?: boolean;
}

export default function DeviceMap({ loading = false }: DeviceMapProps) {
  // Mock设备数据
  const devices: DeviceItem[] = [
    { id: '1', name: '设备A', status: 'online', location: '停车场A', battery: 85 },
    { id: '2', name: '设备B', status: 'busy', location: '小区B', battery: 60 },
    { id: '3', name: '设备C', status: 'offline', location: '商业区C', battery: 20 },
    { id: '4', name: '设备D', status: 'online', location: '园区D', battery: 95 },
    { id: '5', name: '设备E', status: 'busy', location: '地库E', battery: 45 },
  ];

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'online':
        return <Tag color="green">在线</Tag>;
      case 'busy':
        return <Tag color="blue">忙碌</Tag>;
      case 'offline':
        return <Tag color="red">离线</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#52c41a';
      case 'busy':
        return '#1890ff';
      case 'offline':
        return '#ff4d4f';
      default:
        return '#d9d9d9';
    }
  };

  return (
    <Card 
      title="设备分布地图" 
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
      ) : devices.length === 0 ? (
        <Empty description="暂无设备数据" />
      ) : (
        <div>
          {/* 模拟地图区域 - 撒点地图 */}
          <div 
            style={{ 
              height: '200px', 
              background: 'linear-gradient(135deg, rgba(42,97,255,0.1), rgba(36,214,226,0.1))',
              borderRadius: '12px',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(42,97,255,0.2)'
            }}
          >
            {/* 模拟撒点 */}
            {devices.map((device, index) => (
              <div
                key={device.id}
                style={{
                  position: 'absolute',
                  left: `${20 + (index * 15) % 60}%`,
                  top: `${30 + (index * 20) % 50}%`,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: getStatusColor(device.status),
                  boxShadow: `0 4px 12px ${getStatusColor(device.status)}40`,
                  border: '2px solid rgba(255,255,255,0.8)',
                  animation: 'pulse 2s infinite'
                }}
              />
            ))}
            <div style={{ 
              position: 'absolute', 
              bottom: '12px', 
              left: '12px', 
              color: '#152740', 
              fontSize: '14px',
              background: 'rgba(255,255,255,0.9)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontFamily: 'Source Han Sans, sans-serif',
              fontWeight: '500',
              backdropFilter: 'blur(10px)'
            }}>
              设备分布热力图
            </div>
          </div>

          {/* 设备列表 */}
          <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
            {devices.map((device) => (
              <div
                key={device.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(42,97,255,0.05)',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  border: '1px solid rgba(42,97,255,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: '#152740',
                    fontSize: '14px',
                    fontFamily: 'Source Han Sans, sans-serif'
                  }}>
                    {device.name}
                  </div>
                  <div style={{ 
                    color: '#152740', 
                    fontSize: '12px', 
                    opacity: 0.7,
                    fontFamily: 'Source Han Sans, sans-serif'
                  }}>
                    {device.location}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {getStatusTag(device.status)}
                  <div style={{ 
                    color: '#152740', 
                    fontSize: '12px',
                    opacity: 0.7,
                    fontFamily: 'Source Han Sans, sans-serif',
                    marginTop: '4px'
                  }}>
                    电量: {device.battery}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
