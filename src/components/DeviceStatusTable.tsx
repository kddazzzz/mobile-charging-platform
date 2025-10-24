import { Table, Tag, Spin, Empty } from 'antd';

interface DeviceStatusTableProps {
  loading?: boolean;
}

export default function DeviceStatusTable({ loading = false }: DeviceStatusTableProps) {
  // Mock设备状态数据
  const deviceData = [
    { id: 1, name: '设备A', type: '快充车', status: 'online', location: '停车场A', battery: 85, lastUpdate: '2分钟前' },
    { id: 2, name: '设备B', type: '移动机器人', status: 'busy', location: '小区B', battery: 60, lastUpdate: '1分钟前' },
    { id: 3, name: '设备C', type: '快充车', status: 'offline', location: '商业区C', battery: 20, lastUpdate: '30分钟前' },
    { id: 4, name: '设备D', type: '移动机器人', status: 'online', location: '园区D', battery: 95, lastUpdate: '3分钟前' },
    { id: 5, name: '设备E', type: '快充车', status: 'busy', location: '地库E', battery: 45, lastUpdate: '1分钟前' },
    { id: 6, name: '设备F', type: '移动机器人', status: 'online', location: '停车场F', battery: 78, lastUpdate: '2分钟前' },
    { id: 7, name: '设备G', type: '快充车', status: 'offline', location: '小区G', battery: 15, lastUpdate: '45分钟前' },
    { id: 8, name: '设备H', type: '移动机器人', status: 'online', location: '商业区H', battery: 88, lastUpdate: '1分钟前' },
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

  const getBatteryColor = (battery: number) => {
    if (battery >= 80) return '#52c41a';
    if (battery >= 50) return '#faad14';
    if (battery >= 20) return '#fa8c16';
    return '#ff4d4f';
  };

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span style={{ 
          color: '#152740', 
          fontWeight: 'bold',
          fontFamily: 'Source Han Sans, sans-serif'
        }}>
          {text}
        </span>
      )
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <span style={{ 
          color: '#152740',
          fontFamily: 'Source Han Sans, sans-serif'
        }}>
          {text}
        </span>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status)
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      render: (text: string) => (
        <span style={{ 
          color: '#152740',
          fontFamily: 'Source Han Sans, sans-serif'
        }}>
          {text}
        </span>
      )
    },
    {
      title: '电量',
      dataIndex: 'battery',
      key: 'battery',
      render: (battery: number) => (
        <span style={{ 
          color: getBatteryColor(battery),
          fontWeight: 'bold',
          fontFamily: 'Source Han Sans, sans-serif'
        }}>
          {battery}%
        </span>
      )
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      render: (text: string) => (
        <span style={{ 
          color: '#152740',
          opacity: 0.7,
          fontFamily: 'Source Han Sans, sans-serif'
        }}>
          {text}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (deviceData.length === 0) {
    return <Empty description="暂无设备数据" />;
  }

  return (
    <Table
      columns={columns}
      dataSource={deviceData}
      rowKey="id"
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
        showTotal: (total: number) => `共 ${total} 台设备`,
        style: { 
          color: '#152740',
          fontFamily: 'Source Han Sans, sans-serif'
        }
      }}
      style={{
        background: 'transparent'
      }}
      className="device-status-table"
      size="small"
    />
  );
}
