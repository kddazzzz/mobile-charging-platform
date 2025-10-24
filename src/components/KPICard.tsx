import { Card, Statistic, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  trend?: 'up' | 'down';
  loading?: boolean;
  onClick?: () => void;
}

export default function KPICard({ title, value, suffix = '', trend, loading = false, onClick }: KPICardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <ArrowUpOutlined style={{ color: '#52c41a' }} />;
    if (trend === 'down') return <ArrowDownOutlined style={{ color: '#ff4d4f' }} />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return '#52c41a';
    if (trend === 'down') return '#ff4d4f';
    return '#13c2c2'; // 使用主题色
  };

  return (
    <Card 
      size="small" 
      style={{ 
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      hoverable={!!onClick}
      onClick={onClick}
    >
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, rgba(42,97,255,0.1), rgba(36,214,226,0.1))',
        borderRadius: '50%',
        opacity: 0.6
      }} />
      
      <Statistic
        title={
          <span style={{ 
            color: '#152740', 
            fontSize: '14px', 
            fontWeight: '500',
            fontFamily: 'Source Han Sans, sans-serif'
          }}>
            {title}
          </span>
        }
        value={value}
        suffix={suffix}
        valueStyle={{ 
          color: '#152740',
          fontSize: '30px',
          fontWeight: 'bold',
          fontFamily: 'Swis 721 Bold, sans-serif',
          lineHeight: 1.2
        }}
        prefix={getTrendIcon()}
        loading={loading}
      />
      
      {/* 趋势指示器 - 只保留上下箭头 */}
      {trend && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {getTrendIcon()}
        </div>
      )}
    </Card>
  );
}
