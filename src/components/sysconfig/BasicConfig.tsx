import { useState } from 'react';
import { Card, Form, Input, InputNumber, Switch, Button, Space, message, Spin, Empty } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';

interface BasicConfigProps {
  loading?: boolean;
}

export default function BasicConfig({ loading = false }: BasicConfigProps) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  // Mock配置数据
  const configData = {
    platformName: '移动充电管理平台',
    platformVersion: 'v1.0.0',
    serviceUrl: 'https://api.charging.com',
    timeout: 30,
    concurrency: 100,
    orderTimeout: 30,
    deviceCheckInterval: 60,
    alertThreshold: 80,
    dataRetentionDays: 90,
    enableNotification: true,
    enableAutoBackup: true,
    enableLogging: true
  };

  const handleSave = async (values: any) => {
    setSaving(true);
    try {
      // 模拟保存延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('配置保存成功');
    } catch (error) {
      message.error('配置保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('已重置为默认配置');
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
      <Form
        form={form}
        layout="vertical"
        initialValues={configData}
        onFinish={handleSave}
        style={{ maxWidth: 800 }}
      >
        {/* 平台参数设置 */}
        <Card 
          title="平台参数设置" 
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
          <Form.Item
            label="平台名称"
            name="platformName"
            rules={[
              { required: true, message: '请输入平台名称' },
              { min: 1, max: 50, message: '平台名称长度为1-50个字符' }
            ]}
          >
            <Input placeholder="请输入平台名称" />
          </Form.Item>

          <Form.Item
            label="平台版本"
            name="platformVersion"
            rules={[
              { required: true, message: '请输入平台版本' },
              { pattern: /^v\d+\.\d+\.\d+$/, message: '版本号格式不正确，如：v1.0.0' }
            ]}
          >
            <Input placeholder="请输入平台版本，如：v1.0.0" />
          </Form.Item>

          <Form.Item
            label="服务地址"
            name="serviceUrl"
            rules={[
              { required: true, message: '请输入服务地址' },
              { type: 'url', message: '请输入正确的URL格式' }
            ]}
          >
            <Input placeholder="请输入服务地址，如：https://api.example.com" />
          </Form.Item>

          <Form.Item
            label="超时时间（秒）"
            name="timeout"
            rules={[
              { required: true, message: '请输入超时时间' },
              { type: 'number', min: 1, max: 300, message: '超时时间范围为1-300秒' }
            ]}
          >
            <InputNumber 
              placeholder="请输入超时时间" 
              style={{ width: '100%' }}
              min={1}
              max={300}
            />
          </Form.Item>

          <Form.Item
            label="并发限制"
            name="concurrency"
            rules={[
              { required: true, message: '请输入并发限制' },
              { type: 'number', min: 1, max: 1000, message: '并发限制范围为1-1000' }
            ]}
          >
            <InputNumber 
              placeholder="请输入并发限制" 
              style={{ width: '100%' }}
              min={1}
              max={1000}
            />
          </Form.Item>
        </Card>

        {/* 业务规则配置 */}
        <Card 
          title="业务规则配置" 
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
          <Form.Item
            label="订单超时时间（分钟）"
            name="orderTimeout"
            rules={[
              { required: true, message: '请输入订单超时时间' },
              { type: 'number', min: 5, max: 60, message: '订单超时时间范围为5-60分钟' }
            ]}
          >
            <InputNumber 
              placeholder="请输入订单超时时间" 
              style={{ width: '100%' }}
              min={5}
              max={60}
            />
          </Form.Item>

          <Form.Item
            label="设备检查间隔（秒）"
            name="deviceCheckInterval"
            rules={[
              { required: true, message: '请输入设备检查间隔' },
              { type: 'number', min: 30, max: 300, message: '设备检查间隔范围为30-300秒' }
            ]}
          >
            <InputNumber 
              placeholder="请输入设备检查间隔" 
              style={{ width: '100%' }}
              min={30}
              max={300}
            />
          </Form.Item>

          <Form.Item
            label="告警阈值（%）"
            name="alertThreshold"
            rules={[
              { required: true, message: '请输入告警阈值' },
              { type: 'number', min: 1, max: 100, message: '告警阈值范围为1-100%' }
            ]}
          >
            <InputNumber 
              placeholder="请输入告警阈值" 
              style={{ width: '100%' }}
              min={1}
              max={100}
            />
          </Form.Item>

          <Form.Item
            label="数据保留天数"
            name="dataRetentionDays"
            rules={[
              { required: true, message: '请输入数据保留天数' },
              { type: 'number', min: 30, max: 365, message: '数据保留天数范围为30-365天' }
            ]}
          >
            <InputNumber 
              placeholder="请输入数据保留天数" 
              style={{ width: '100%' }}
              min={30}
              max={365}
            />
          </Form.Item>
        </Card>

        {/* 系统开关控制 */}
        <Card 
          title="系统开关控制" 
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
          <Form.Item
            label="启用通知"
            name="enableNotification"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="启用自动备份"
            name="enableAutoBackup"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="启用日志记录"
            name="enableLogging"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Card>

        {/* 操作按钮 */}
        <Space>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            loading={saving}
            disabled={loading}
          >
            保存配置
          </Button>
          <Button 
            icon={<ReloadOutlined />}
            onClick={handleReset}
            disabled={loading || saving}
          >
            重置
          </Button>
        </Space>
      </Form>
    </div>
  );
}
