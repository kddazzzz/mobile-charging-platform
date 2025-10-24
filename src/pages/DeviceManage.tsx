import { useState, useMemo } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag, Row, Col, Card, Space } from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import DeviceDetailModal from '../components/DeviceDetailModal';

// 批量生成mock数据，便于分页演示
const generateMockDevices = (count:number) => {
  const arr:any[] = [];
  for (let i = 1; i <= count; i++) {
    arr.push({
      id: i,
      name: `设备${String.fromCharCode(64 + ((i % 26) || 26))}${i}`,
      type: i % 2 === 0 ? '移动机器人' : '快充车',
      status: i % 3 === 0 ? 'offline' : 'online',
      sn: `CH${120 + i}`,
      location: i % 2 === 0 ? `园区${i}` : `地库${i}`,
      battery: Math.max(5, Math.min(100, Math.floor(Math.random() * 100)))
    });
  }
  return arr;
};

const initialList = generateMockDevices(28);

export default function DeviceManage() {
  const [data, setData] = useState(initialList);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [form] = Form.useForm();
  
  // 筛选条件
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    status: ''
  });

  const statusTag = (s:string) => s==='online' ? <Tag color="green">在线</Tag> : <Tag color="volcano">离线</Tag>;

  // 筛选后的数据
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const nameMatch = !filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase());
      const typeMatch = !filters.type || item.type === filters.type;
      const statusMatch = !filters.status || item.status === filters.status;
      return nameMatch && typeMatch && statusMatch;
    });
  }, [data, filters]);

  const columns = [
    {title:'设备名称', dataIndex:'name'},
    {title:'设备类型', dataIndex:'type'},
    {title:'SN码', dataIndex:'sn'},
    {title:'位置', dataIndex:'location'},
    {title:'状态', dataIndex:'status', render:(s:string)=>statusTag(s)},
    {title:'当前电量', dataIndex:'battery', render:(b:number)=>b+'%'},
    {title:'操作',dataIndex:'op', render:(_:any,r:any)=>
      <Button type="link" onClick={()=>{setSelected(r);setShowDetail(true);}}>详情</Button>
    }
  ];

  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      const batteryNum = Number(values.battery);
      if (isNaN(batteryNum) || batteryNum < 0 || batteryNum > 100) {
        form.setFields([{ name:'battery', errors:['请输入0~100的整数'] }]);
        return;
      }
      const next = {
        id: Date.now(),
        name: values.name.trim(),
        type: values.type,
        sn: values.sn.trim(),
        location: values.location.trim(),
        status: values.status,
        battery: batteryNum
      };
      setData(prev=>[next, ...prev]);
      message.success('新增成功（模拟）');
      setShowCreate(false);
      form.resetFields();
    } catch(e) {
      // 校验未通过
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ name: '', type: '', status: '' });
  };

  return <div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between', marginBottom: 16}}>
      <h2 style={{margin:0}}>设备管理</h2>
    </div>

    {/* 筛选条件 */}
    <Card size="small" style={{ marginBottom: 16 }}>
      <Row gutter={16} align="middle">
        <Col span={6}>
          <Input
            placeholder="请输入设备名称"
            prefix={<SearchOutlined />}
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            allowClear
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="设备类型"
            value={filters.type}
            onChange={(value) => handleFilterChange('type', value)}
            allowClear
            style={{ width: '100%' }}
            options={[
              { value: '快充车', label: '快充车' },
              { value: '移动机器人', label: '移动机器人' }
            ]}
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="设备状态"
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            allowClear
            style={{ width: '100%' }}
            options={[
              { value: 'online', label: '在线' },
              { value: 'offline', label: '离线' }
            ]}
          />
        </Col>
        <Col span={4}>
          <Button icon={<ReloadOutlined />} onClick={resetFilters}>
            重置筛选
          </Button>
        </Col>
      </Row>
    </Card>

    {/* 工具栏：新增设备 */}
    <div style={{ display:'flex', justifyContent:'flex-end', margin:'-8px 0 8px 0' }}>
      <Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={()=>setShowCreate(true)}>新增设备</Button>
      </Space>
    </div>

    <Table
      style={{marginTop:8}}
      columns={columns}
      rowKey="id"
      dataSource={filteredData}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['5','10','20','50'],
        showTotal: (total:number)=>`共 ${total} 条`
      }}
    />

    {/* 设备详情弹窗（只读） */}
    <DeviceDetailModal
      open={showDetail}
      onCancel={()=>setShowDetail(false)}
      device={selected}
    />

    {/* 新增设备弹窗 */}
    <Modal title="新增设备" open={showCreate} onCancel={()=>setShowCreate(false)} onOk={onCreate} okText="确定" cancelText="取消" destroyOnClose>
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item label="设备名称" name="name" rules={[{ required: true, message: '设备名称不能为空' }]}>          <Input placeholder="请输入设备名称"/>
        </Form.Item>
        <Form.Item label="设备类型" name="type" rules={[{ required: true, message: '请选择设备类型' }]}>          <Select options={[{value:'快充车',label:'快充车'},{value:'移动机器人',label:'移动机器人'}]} placeholder="请选择"/>
        </Form.Item>
        <Form.Item label="SN码" name="sn" rules={[{ required: true, message: '请输入SN码' }]}>          <Input placeholder="如 CH128"/>
        </Form.Item>
        <Form.Item label="位置" name="location" rules={[{ required: true, message: '请输入位置' }]}>          <Input placeholder="如 地库F"/>
        </Form.Item>
        <Form.Item label="状态" name="status" rules={[{ required: true, message: '请选择状态' }]}>          <Select options={[{value:'online',label:'在线'},{value:'offline',label:'离线'}]} placeholder="请选择"/>
        </Form.Item>
        <Form.Item label="当前电量（%）" name="battery" rules={[{ required: true, message:'请输入0~100的整数' }]}>          <Input type="number" placeholder="0~100"/>
        </Form.Item>
      </Form>
    </Modal>
  </div>
}
