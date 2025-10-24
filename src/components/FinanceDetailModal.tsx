import { Modal, Descriptions, Tag } from 'antd';

export default function FinanceDetailModal({ open, onCancel, record }) {
  if (!record) return null;
  const statusTag = record.reconciled? <Tag color="green">已对账</Tag> : <Tag color="warning">未对账</Tag>;
  return (
    <Modal open={open} onCancel={onCancel} footer={null} title={`财务明细 - ${record.title}`} destroyOnClose>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="标题">{record.title}</Descriptions.Item>
        <Descriptions.Item label="金额">¥{record.amount}</Descriptions.Item>
        <Descriptions.Item label="类型">{record.type}</Descriptions.Item>
        <Descriptions.Item label="状态">{statusTag}</Descriptions.Item>
        <Descriptions.Item label="周期">{record.period}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
