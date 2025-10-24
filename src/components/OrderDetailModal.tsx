import { Modal, Descriptions, Tag } from 'antd';

export default function OrderDetailModal({ open, onCancel, order }) {
  if (!order) return null;
  const statusTag = order.status === 'finished'
    ? <Tag color="green">已完成</Tag>
    : order.status === 'processing'
      ? <Tag color="blue">进行中</Tag>
      : <Tag color="volcano">已取消</Tag>;

  return (
    <Modal open={open} onCancel={onCancel} footer={null} title={`订单详情 - ${order.orderNo}`} destroyOnClose>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="订单编号">{order.orderNo}</Descriptions.Item>
        <Descriptions.Item label="用户">{order.user}</Descriptions.Item>
        <Descriptions.Item label="设备">{order.deviceName}</Descriptions.Item>
        <Descriptions.Item label="金额">¥{order.amount}</Descriptions.Item>
        <Descriptions.Item label="状态">{statusTag}</Descriptions.Item>
        <Descriptions.Item label="预约时间">{order.time}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
