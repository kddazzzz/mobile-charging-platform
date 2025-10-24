import { Card, Row, Col, Select, DatePicker, Button, Space, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface FilterBarProps {
  filters: {
    timeRange: string;
    region: string;
    deviceType: string;
  };
  onChange: (filters: any) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const [customDateRange, setCustomDateRange] = useState<any[]>([]);

  const handleTimeRangeChange = (value: string) => {
    if (value === 'custom') {
      // 自定义时间范围，等待用户选择具体日期
      return;
    }
    onChange({ ...filters, timeRange: value });
  };

  const handleCustomDateChange = (dates: any) => {
    setCustomDateRange(dates);
    if (dates && dates.length === 2) {
      // 校验日期范围不能超过90天
      const diffTime = Math.abs(dates[1].valueOf() - dates[0].valueOf());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 90) {
        message.error('时间跨度不能超过90天');
        return;
      }
      
      onChange({ ...filters, timeRange: 'custom', customDateRange: dates });
    }
  };

  const handleRegionChange = (value: string) => {
    onChange({ ...filters, region: value });
  };

  const handleDeviceTypeChange = (value: string) => {
    onChange({ ...filters, deviceType: value });
  };

  const handleReset = () => {
    setCustomDateRange([]);
    onChange({
      timeRange: 'today',
      region: 'all',
      deviceType: 'all'
    });
  };

  return (
    <Card 
      size="small" 
      style={{ 
        marginBottom: 24,
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}
    >
      <Row gutter={[16, 8]} align="middle">
        <Col xs={24} sm={12} md={6}>
          <div style={{ 
            marginBottom: '8px', 
            fontSize: '14px', 
            color: '#152740',
            fontFamily: 'Source Han Sans, sans-serif',
            fontWeight: '500'
          }}>
            时间范围
          </div>
          <Select
            value={filters.timeRange}
            onChange={handleTimeRangeChange}
            style={{ width: '100%' }}
            placeholder="选择时间范围"
          >
            <Option value="today">今日</Option>
            <Option value="week">近7天</Option>
            <Option value="month">近30天</Option>
            <Option value="quarter">本月</Option>
            <Option value="custom">自定义</Option>
          </Select>
        </Col>
        
        {filters.timeRange === 'custom' && (
          <Col xs={24} sm={12} md={6}>
            <div style={{ 
              marginBottom: '8px', 
              fontSize: '14px', 
              color: '#152740',
              fontFamily: 'Source Han Sans, sans-serif',
              fontWeight: '500'
            }}>
              自定义时间
            </div>
            <RangePicker
              value={customDateRange}
              onChange={handleCustomDateChange}
              style={{ width: '100%' }}
              placeholder={['开始日期', '结束日期']}
            />
          </Col>
        )}

        <Col xs={24} sm={12} md={6}>
          <div style={{ 
            marginBottom: '8px', 
            fontSize: '14px', 
            color: '#152740',
            fontFamily: 'Source Han Sans, sans-serif',
            fontWeight: '500'
          }}>
            区域筛选
          </div>
          <Select
            value={filters.region}
            onChange={handleRegionChange}
            style={{ width: '100%' }}
            placeholder="选择区域"
          >
            <Option value="all">全部区域</Option>
            <Option value="beijing">北京市</Option>
            <Option value="shanghai">上海市</Option>
            <Option value="guangzhou">广州市</Option>
            <Option value="shenzhen">深圳市</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <div style={{ 
            marginBottom: '8px', 
            fontSize: '14px', 
            color: '#152740',
            fontFamily: 'Source Han Sans, sans-serif',
            fontWeight: '500'
          }}>
            设备类型
          </div>
          <Select
            value={filters.deviceType}
            onChange={handleDeviceTypeChange}
            style={{ width: '100%' }}
            placeholder="选择设备类型"
          >
            <Option value="all">全部类型</Option>
            <Option value="fast-charge">快充车</Option>
            <Option value="robot">移动机器人</Option>
            <Option value="storage">储能设备</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <div style={{ 
            marginBottom: '8px', 
            fontSize: '14px', 
            color: '#152740',
            fontFamily: 'Source Han Sans, sans-serif',
            fontWeight: '500'
          }}>
            操作
          </div>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleReset}
              size="small"
              style={{
                fontFamily: 'Source Han Sans, sans-serif',
                fontWeight: '500'
              }}
            >
              重置筛选
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
