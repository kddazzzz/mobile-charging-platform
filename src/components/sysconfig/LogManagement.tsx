import { useState } from 'react';
import { Card, Table, Button, Select, DatePicker, Input, Space, Tag, message, Spin, Empty } from 'antd';
import { ReloadOutlined, DownloadOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';

interface LogManagementProps {
  loading?: boolean;
}

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function LogManagement({ loading = false }: LogManagementProps) {
  const [logType, setLogType] = useState('all');
  const [logLevel, setLogLevel] = useState('all');
  const [dateRange, setDateRange] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  // Mock日志数据
  const logs = [
    { 
      id: 1, 
      type: 'operation', 
      level: 'info', 
      message: '用户admin登录系统', 
      user: 'admin', 
      ip: '192.168.1.100', 
      time: '2024-01-15 10:30:25',
      details: '用户admin通过Web界面成功登录系统'
    },
    { 
      id: 2, 
      type: 'system', 
      level: 'warning', 
      message: 'CPU使用率超过80%', 
      user: 'system', 
      ip: '127.0.0.1', 
      time: '2024-01-15 10:25:15',
      details: '系统监控检测到CPU使用率达到85%，建议检查系统负载'
    },
    { 
      id: 3, 
      type: 'error', 
      level: 'error', 
      message: '数据库连接失败', 
      user: 'system', 
      ip: '127.0.0.1', 
      time: '2024-01-15 10:20:10',
      details: '数据库连接池耗尽，无法建立新的数据库连接'
    },
    { 
      id: 4, 
      type: 'operation', 
      level: 'info', 
      message: '设备CH001状态更新', 
      user: 'operator', 
      ip: '192.168.1.101', 
      time: '2024-01-15 10:15:30',
      details: '设备CH001状态从离线变更为在线'
    },
    { 
      id: 5, 
      type: 'security', 
      level: 'warning', 
      message: '异常登录尝试', 
      user: 'unknown', 
      ip: '192.168.1.200', 
      time: '2024-01-15 10:10:45',
      details: '检测到来自IP 192.168.1.200的异常登录尝试'
    }
  ];

  const getLogTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'operation': '操作日志',
      'system': '系统日志',
      'error': '错误日志',
      'security': '安全日志'
    };
    return typeMap[type] || type;
  };

  const getLogTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      'operation': 'blue',
      'system': 'green',
      'error': 'red',
      'security': 'orange'
    };
    return colorMap[type] || 'default';
  };

  const getLogLevelColor = (level: string) => {
    const colorMap: { [key: string]: string } = {
      'info': 'blue',
      'warning': 'orange',
      'error': 'red',
      'debug': 'green'
    };
    return colorMap[level] || 'default';
  };

  const getLogLevelText = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'info': '信息',
      'warning': '警告',
      'error': '错误',
      'debug': '调试'
    };
    return levelMap[level] || level;
  };

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 160,
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {text}
        </span>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => (
        <Tag color={getLogTypeColor(type)}>
          {getLogTypeText(type)}
        </Tag>
      )
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      width: 80,
      render: (level: string) => (
        <Tag color={getLogLevelColor(level)}>
          {getLogLevelText(level)}
        </Tag>
      )
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {text}
        </span>
      )
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      width: 100,
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {text}
        </span>
      )
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
      render: (text: string) => (
        <span style={{ fontFamily: 'Source Han Sans, sans-serif' }}>
          {text}
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record: any) => (
        <Space>
          <Button 
            type="link" 
            size="small"
            onClick={() => handleViewDetails(record)}
            disabled={loading}
          >
            详情
          </Button>
          <Button 
            type="link" 
            size="small"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
            disabled={loading}
          >
            下载
          </Button>
        </Space>
      )
    }
  ];

  const handleViewDetails = (record: any) => {
    message.info(`查看日志详情：${record.message}`);
  };

  const handleDownload = (record: any) => {
    message.success(`下载日志：${record.message}`);
  };

  const handleSearch = () => {
    message.info('搜索日志');
  };

  const handleExport = () => {
    message.success('导出日志成功');
  };

  const handleClear = () => {
    setLogType('all');
    setLogLevel('all');
    setDateRange([]);
    setSearchText('');
    message.info('已清空筛选条件');
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
      {/* 筛选条件 */}
      <Card 
        title="日志筛选" 
        size="small" 
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
        <Space wrap style={{ width: '100%' }}>
          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#666',
              fontFamily: 'Source Han Sans, sans-serif',
              marginBottom: '4px'
            }}>
              日志类型
            </div>
            <Select
              value={logType}
              onChange={setLogType}
              style={{ width: 120 }}
              placeholder="选择类型"
            >
              <Option value="all">全部类型</Option>
              <Option value="operation">操作日志</Option>
              <Option value="system">系统日志</Option>
              <Option value="error">错误日志</Option>
              <Option value="security">安全日志</Option>
            </Select>
          </div>

          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#666',
              fontFamily: 'Source Han Sans, sans-serif',
              marginBottom: '4px'
            }}>
              日志级别
            </div>
            <Select
              value={logLevel}
              onChange={setLogLevel}
              style={{ width: 120 }}
              placeholder="选择级别"
            >
              <Option value="all">全部级别</Option>
              <Option value="info">信息</Option>
              <Option value="warning">警告</Option>
              <Option value="error">错误</Option>
              <Option value="debug">调试</Option>
            </Select>
          </div>

          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#666',
              fontFamily: 'Source Han Sans, sans-serif',
              marginBottom: '4px'
            }}>
              时间范围
            </div>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              style={{ width: 240 }}
              placeholder={['开始时间', '结束时间']}
            />
          </div>

          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#666',
              fontFamily: 'Source Han Sans, sans-serif',
              marginBottom: '4px'
            }}>
              关键词
            </div>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="输入关键词"
              style={{ width: 200 }}
              prefix={<SearchOutlined />}
            />
          </div>

          <div style={{ alignSelf: 'flex-end' }}>
            <Space>
              <Button 
                type="primary" 
                icon={<SearchOutlined />}
                onClick={handleSearch}
                disabled={loading}
              >
                搜索
              </Button>
              <Button 
                icon={<FilterOutlined />}
                onClick={handleClear}
                disabled={loading}
              >
                清空
              </Button>
            </Space>
          </div>
        </Space>
      </Card>

      {/* 日志列表 */}
      <Card 
        title="日志列表" 
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
          <Space>
            <Button 
              icon={<DownloadOutlined />}
              onClick={handleExport}
              disabled={loading}
            >
              导出
            </Button>
            <Button 
              icon={<ReloadOutlined />}
              onClick={() => message.info('刷新日志')}
              disabled={loading}
            >
              刷新
            </Button>
          </Space>
        }
      >
        {logs.length === 0 ? (
          <Empty description="暂无日志数据" />
        ) : (
          <Table
            columns={columns}
            dataSource={logs}
            rowKey="id"
            pagination={{
              pageSize: 20,
              showSizeChanger: true,
              showTotal: (total: number) => `共 ${total} 条日志`,
              pageSizeOptions: ['10', '20', '50', '100']
            }}
            scroll={{ x: 1000 }}
            style={{ background: 'transparent' }}
            size="small"
          />
        )}
      </Card>

      {/* 日志统计 */}
      <Card 
        title="日志统计" 
        headStyle={{ 
          background: 'transparent', 
          borderBottom: '1px solid rgba(21,39,64,0.1)',
          color: '#152740',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Source Han Sans, sans-serif'
        }}
      >
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 0',
          color: '#666',
          fontFamily: 'Source Han Sans, sans-serif'
        }}>
          日志统计图表待集成
        </div>
      </Card>
    </div>
  );
}
