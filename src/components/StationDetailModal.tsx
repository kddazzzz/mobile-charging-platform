import { Modal, Descriptions, Tag } from 'antd';

export default function StationDetailModal({ open, onCancel, station }) {
  if (!station) return null;
  const statusTag = station.status==='active'?<Tag color="green">运营中</Tag>:<Tag color="default">未上线</Tag>;
  return (
    <Modal open={open} onCancel={onCancel} footer={null} title={`场站详情 - ${station.name}`} destroyOnClose>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="场站名称">{station.name}</Descriptions.Item>
        <Descriptions.Item label="地址">{station.address}</Descriptions.Item>
        <Descriptions.Item label="设备数量">{station.deviceCount}</Descriptions.Item>
        <Descriptions.Item label="负责人">{station.owner}</Descriptions.Item>
        <Descriptions.Item label="状态">{statusTag}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
