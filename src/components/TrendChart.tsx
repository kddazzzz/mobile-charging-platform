import { Card, Spin, Empty } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

interface TrendChartProps {
  loading?: boolean;
}

export default function TrendChart({ loading = false }: TrendChartProps) {
  // Mock图表数据 - 24小时详细数据
  const chartData = [
    { time: '00:00', orders: 5, revenue: 250, devices: 12 },
    { time: '02:00', orders: 3, revenue: 150, devices: 8 },
    { time: '04:00', orders: 2, revenue: 100, devices: 5 },
    { time: '06:00', orders: 8, revenue: 400, devices: 15 },
    { time: '08:00', orders: 25, revenue: 1250, devices: 28 },
    { time: '10:00', orders: 35, revenue: 1750, devices: 32 },
    { time: '12:00', orders: 45, revenue: 2250, devices: 38 },
    { time: '14:00', orders: 40, revenue: 2000, devices: 35 },
    { time: '16:00', orders: 50, revenue: 2500, devices: 42 },
    { time: '18:00', orders: 38, revenue: 1900, devices: 36 },
    { time: '20:00', orders: 28, revenue: 1400, devices: 30 },
    { time: '22:00', orders: 15, revenue: 750, devices: 18 },
  ];

  return (
    <Card 
      title="订单趋势分析" 
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
      ) : chartData.length === 0 ? (
        <Empty description="暂无趋势数据" />
      ) : (
        <div>
          {/* 模拟图表区域 - 带坐标轴的柱状图 */}
          <div 
            style={{ 
              height: '200px', 
              background: 'linear-gradient(135deg, rgba(42,97,255,0.05), rgba(36,214,226,0.05))',
              borderRadius: '12px',
              marginBottom: '20px',
              position: 'relative',
              padding: '20px',
              border: '1px solid rgba(42,97,255,0.1)'
            }}
          >
            {/* Y轴坐标 */}
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '20px',
              bottom: '40px',
              width: '1px',
              background: 'rgba(21,39,64,0.2)'
            }} />
            
            {/* Y轴标签 - 从下到上依次增加，范围0-60 */}
            {[0, 10, 20, 30, 40, 50, 60].map((value, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: '5px',
                  bottom: `${40 + (index * 20)}px`,
                  fontSize: '10px',
                  color: '#152740',
                  fontFamily: 'Source Han Sans, sans-serif',
                  transform: 'translateY(50%)',
                  textAlign: 'right',
                  width: '15px'
                }}
              >
                {value}
              </div>
            ))}

            {/* X轴坐标 */}
            <div style={{
              position: 'absolute',
              left: '20px',
              right: '20px',
              bottom: '40px',
              height: '1px',
              background: 'rgba(21,39,64,0.2)'
            }} />

            {/* 柱状图 */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'end', 
              height: '120px', 
              gap: '6px',
              marginLeft: '30px',
              marginRight: '20px',
              marginTop: '20px',
              marginBottom: '40px'
            }}>
              {chartData.map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      height: `${(item.orders / 60) * 100}px`, // 调整比例，基于60的最大值
                      background: index % 2 === 0 
                        ? 'linear-gradient(to top, #2A61FF, #24D6E2)' 
                        : 'linear-gradient(to top, #24D6E2, #2A61FF)',
                      width: '100%',
                      borderRadius: '4px 4px 0 0',
                      minHeight: '2px',
                      boxShadow: '0 2px 8px rgba(42,97,255,0.2)'
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* X轴时间标签 - 显示在横坐标上 */}
            <div style={{
              position: 'absolute',
              left: '30px',
              right: '20px',
              bottom: '20px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              {chartData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '10px',
                    color: '#152740',
                    fontFamily: 'Source Han Sans, sans-serif',
                    fontWeight: '500'
                  }}
                >
                  {item.time}
                </div>
              ))}
            </div>
            
            {/* 图表标题 */}
            <div style={{ 
              position: 'absolute', 
              top: '12px', 
              left: '50px', 
              color: '#152740', 
              fontSize: '14px',
              background: 'rgba(255,255,255,0.9)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontFamily: 'Source Han Sans, sans-serif',
              fontWeight: '500',
              backdropFilter: 'blur(10px)'
            }}>
              24小时订单趋势
            </div>
          </div>

          {/* 数据概览 */}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '22px', 
                fontWeight: 'bold', 
                color: '#152740',
                fontFamily: 'Swis 721 Bold, sans-serif'
              }}>
                {chartData.reduce((sum, item) => sum + item.orders, 0)}
              </div>
              <div style={{ 
                color: '#152740', 
                fontSize: '14px',
                opacity: 0.7,
                fontFamily: 'Source Han Sans, sans-serif'
              }}>
                总订单数
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '22px', 
                fontWeight: 'bold', 
                color: '#152740',
                fontFamily: 'Swis 721 Bold, sans-serif'
              }}>
                ¥{chartData.reduce((sum, item) => sum + item.revenue, 0)}
              </div>
              <div style={{ 
                color: '#152740', 
                fontSize: '14px',
                opacity: 0.7,
                fontFamily: 'Source Han Sans, sans-serif'
              }}>
                总收入
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '22px', 
                fontWeight: 'bold', 
                color: '#152740',
                fontFamily: 'Swis 721 Bold, sans-serif'
              }}>
                {Math.max(...chartData.map(item => item.orders))}
              </div>
              <div style={{ 
                color: '#152740', 
                fontSize: '14px',
                opacity: 0.7,
                fontFamily: 'Source Han Sans, sans-serif'
              }}>
                峰值订单
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
