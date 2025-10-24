import { Modal, Descriptions, Tag } from 'antd';

interface DeviceDetailModalProps {
  open: boolean;
  onCancel: () => void;
  device: any;
}

export default function DeviceDetailModal({ open, onCancel, device }: DeviceDetailModalProps) {
  if (!device) return null;

  const statusTag = device.status === 'online' ? (
    <Tag color="green">在线</Tag>
  ) : (
    <Tag color="volcano">离线</Tag>
  );

  return (
    <Modal open={open} onCancel={onCancel} footer={null} title={`设备详情 - ${device.name}`} destroyOnClose>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="设备名称">{device.name}</Descriptions.Item>
        <Descriptions.Item label="设备类型">{device.type}</Descriptions.Item>
        <Descriptions.Item label="SN码">{device.sn}</Descriptions.Item>
        <Descriptions.Item label="位置">{device.location}</Descriptions.Item>
        <Descriptions.Item label="当前电量">{device.battery}%</Descriptions.Item>
        <Descriptions.Item label="状态">{statusTag}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
