import { useState } from 'react';
import { Card, Button, Progress, Space, message, Spin, Empty, Modal, Form, Input, Select } from 'antd';
import { DatabaseOutlined, DownloadOutlined, UploadOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';

interface DataManagementProps {
  loading?: boolean;
}

const { Option } = Select;

export default function DataManagement({ loading = false }: DataManagementProps) {
  const [backupModalVisible, setBackupModalVisible] = useState(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [backupForm] = Form.useForm();
  const [restoreForm] = Form.useForm();

  // Mock数据
  const backupList = [
    { id: 1, name: 'backup_20240115_103000.sql', size: '2.5GB', time: '2024-01-15 10:30:00', status: 'completed' },
    { id: 2, name: 'backup_20240114_103000.sql', size: '2.3GB', time: '2024-01-14 10:30:00', status: 'completed' },
    { id: 3, name: 'backup_20240113_103000.sql', size: '2.4GB', time: '2024-01-13 10:30:00', status: 'completed' },
    { id: 4, name: 'backup_20240112_103000.sql', size: '2.2GB', time: '2024-01-12 10:30:00', status: 'failed' }
  ];

  const storageInfo = {
    total: 100,
    used: 45,
    available: 55,
    backupCount: 12,
    lastBackup: '2024-01-15 10:30:00'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#52c41a';
      case 'failed':
        return '#ff4d4f';
      case 'running':
        return '#1890ff';
      default:
        return '#d9d9d9';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'failed':
        return '失败';
      case 'running':
        return '进行中';
      default:
        return '未知';
    }
  };

  const handleBackup = () => {
    setBackupModalVisible(true);
  };

  const handleRestore = () => {
    setRestoreModalVisible(true);
  };

  const handleBackupSubmit = async (values: any) => {
    try {
      // 模拟备份过程
      message.loading('正在创建备份...', 0);
      await new Promise(resolve => setTimeout(resolve, 3000));
      message.destroy();
      message.success('备份创建成功');
      setBackupModalVisible(false);
      backupForm.resetFields();
    } catch (error) {
      message.error('备份创建失败');
    }
  };

  const handleRestoreSubmit = async (values: any) => {
    try {
      // 模拟恢复过程
      message.loading('正在恢复数据...', 0);
      await new Promise(resolve => setTimeout(resolve, 5000));
      message.destroy();
      message.success('数据恢复成功');
      setRestoreModalVisible(false);
      restoreForm.resetFields();
    } catch (error) {
      message.error('数据恢复失败');
    }
  };

  const handleDownloadBackup = (backup: any) => {
    message.success(`开始下载备份文件：${backup.name}`);
  };

  const handleDeleteBackup = (backup: any) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除备份文件 ${backup.name} 吗？`,
      onOk: () => {
        message.success('备份文件删除成功');
      }
    });
  };

  const handleCleanData = () => {
    Modal.confirm({
      title: '确认清理',
      content: '确定要清理过期数据吗？此操作不可恢复！',
      onOk: () => {
        message.success('数据清理完成');
      }
    });
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
      {/* 存储概览 */}
      <Card 
        title="存储概览" 
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
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#152740',
              fontFamily: 'Swis 721 Bold, sans-serif'
            }}>
              {storageInfo.used}GB
            </div>
            <div style={{ 
              color: '#666',
              fontFamily: 'Source Han Sans, sans-serif'
            }}>
              已使用
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#13c2c2',
              fontFamily: 'Swis 721 Bold, sans-serif'
            }}>
              {storageInfo.available}GB
            </div>
            <div style={{ 
              color: '#666',
              fontFamily: 'Source Han Sans, sans-serif'
            }}>
              可用空间
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#2A61FF',
              fontFamily: 'Swis 721 Bold, sans-serif'
            }}>
              {storageInfo.backupCount}
            </div>
            <div style={{ 
              color: '#666',
              fontFamily: 'Source Han Sans, sans-serif'
            }}>
              备份文件
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: 16 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 8
          }}>
            <span style={{ 
              fontFamily: 'Source Han Sans, sans-serif',
              color: '#152740'
            }}>
              存储使用率
            </span>
            <span style={{ 
              fontFamily: 'Source Han Sans, sans-serif',
              color: '#152740'
            }}>
              {storageInfo.used}%
            </span>
          </div>
          <Progress 
            percent={storageInfo.used} 
            strokeColor="#2A61FF"
            showInfo={false}
          />
        </div>
      </Card>

      {/* 数据备份 */}
      <Card 
        title="数据备份" 
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
            type="primary" 
            icon={<DatabaseOutlined />}
            onClick={handleBackup}
            disabled={loading}
          >
            创建备份
          </Button>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <div style={{ 
            color: '#666',
            fontFamily: 'Source Han Sans, sans-serif',
            marginBottom: 8
          }}>
            最后备份时间：{storageInfo.lastBackup}
          </div>
        </div>

        {backupList.length === 0 ? (
          <Empty description="暂无备份文件" />
        ) : (
          <div>
            {backupList.map(backup => (
              <div
                key={backup.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(42,97,255,0.05)',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  border: '1px solid rgba(42,97,255,0.1)'
                }}
              >
                <div>
                  <div style={{ 
                    fontWeight: 'bold',
                    fontFamily: 'Source Han Sans, sans-serif',
                    color: '#152740'
                  }}>
                    {backup.name}
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#666',
                    fontFamily: 'Source Han Sans, sans-serif'
                  }}>
                    {backup.size} · {backup.time}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    color: getStatusColor(backup.status),
                    fontFamily: 'Source Han Sans, sans-serif',
                    fontSize: '12px'
                  }}>
                    {getStatusText(backup.status)}
                  </span>
                  <Button 
                    type="link" 
                    size="small"
                    icon={<DownloadOutlined />}
                    onClick={() => handleDownloadBackup(backup)}
                    disabled={loading}
                  >
                    下载
                  </Button>
                  <Button 
                    type="link" 
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteBackup(backup)}
                    disabled={loading}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 数据恢复 */}
      <Card 
        title="数据恢复" 
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
            type="primary" 
            icon={<UploadOutlined />}
            onClick={handleRestore}
            disabled={loading}
          >
            恢复数据
          </Button>
        }
      >
        <div style={{ 
          color: '#666',
          fontFamily: 'Source Han Sans, sans-serif',
          textAlign: 'center',
          padding: '20px 0'
        }}>
          选择备份文件进行数据恢复
        </div>
      </Card>

      {/* 数据清理 */}
      <Card 
        title="数据清理" 
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
            danger
            icon={<DeleteOutlined />}
            onClick={handleCleanData}
            disabled={loading}
          >
            清理数据
          </Button>
        }
      >
        <div style={{ 
          color: '#666',
          fontFamily: 'Source Han Sans, sans-serif',
          textAlign: 'center',
          padding: '20px 0'
        }}>
          清理过期的日志和临时数据
        </div>
      </Card>

      {/* 备份创建弹窗 */}
      <Modal
        title="创建备份"
        open={backupModalVisible}
        onCancel={() => setBackupModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={backupForm}
          layout="vertical"
          onFinish={handleBackupSubmit}
        >
          <Form.Item
            label="备份名称"
            name="backupName"
            rules={[{ required: true, message: '请输入备份名称' }]}
          >
            <Input placeholder="请输入备份名称" />
          </Form.Item>

          <Form.Item
            label="备份类型"
            name="backupType"
            rules={[{ required: true, message: '请选择备份类型' }]}
          >
            <Select placeholder="请选择备份类型">
              <Option value="full">完整备份</Option>
              <Option value="incremental">增量备份</Option>
              <Option value="differential">差异备份</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="备份描述"
            name="description"
          >
            <Input.TextArea placeholder="请输入备份描述" rows={3} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setBackupModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                创建备份
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 数据恢复弹窗 */}
      <Modal
        title="恢复数据"
        open={restoreModalVisible}
        onCancel={() => setRestoreModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={restoreForm}
          layout="vertical"
          onFinish={handleRestoreSubmit}
        >
          <Form.Item
            label="选择备份文件"
            name="backupFile"
            rules={[{ required: true, message: '请选择备份文件' }]}
          >
            <Select placeholder="请选择备份文件">
              {backupList.map(backup => (
                <Option key={backup.id} value={backup.id}>
                  {backup.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="恢复模式"
            name="restoreMode"
            rules={[{ required: true, message: '请选择恢复模式' }]}
          >
            <Select placeholder="请选择恢复模式">
              <Option value="full">完全恢复</Option>
              <Option value="partial">部分恢复</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setRestoreModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                开始恢复
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
