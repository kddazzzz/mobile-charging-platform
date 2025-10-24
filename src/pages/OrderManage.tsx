import { useMemo, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Row, Col, Card, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import OrderDetailModal from '../components/OrderDetailModal';

const genOrders = (count:number) => {
  const arr:any[] = [];
  for (let i=1;i<=count;i++) {
    arr.push({
      id: i,
      orderNo: `OD${10000+i}`,
      user: `用户${i}`,
      deviceName: `设备${i}`,
      amount: Number((Math.random()*100).toFixed(2)),
      status: i%3===0? 'cancelled' : (i%2===0? 'processing':'finished'),
      time: `2025-10-${(i%28)+1} 10:00`
    });
  }
  return arr;
};

const initial = genOrders(45);

export default function OrderManage(){
  const [data, setData] = useState(initial);
  const [filters, setFilters] = useState({ keyword:'', status:'' });
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();

  const filtered = useMemo(()=>{
    return data.filter(o=>{
      const kw = filters.keyword.trim().toLowerCase();
      const kwOk = !kw || o.orderNo.toLowerCase().includes(kw);
      const stOk = !filters.status || o.status===filters.status;
      return kwOk && stOk;
    });
  },[data, filters]);

  const statusTag = (s:string)=> s==='finished'?<Tag color="green">已完成</Tag>: s==='processing'?<Tag color="blue">进行中</Tag>:<Tag color="volcano">已取消</Tag>;

  const columns = [
    { title:'订单编号', dataIndex:'orderNo' },
    { title:'用户', dataIndex:'user' },
    { title:'设备', dataIndex:'deviceName' },
    { title:'金额', dataIndex:'amount', render:(v:number)=>`¥${v}` },
    { title:'状态', dataIndex:'status', render:(s:string)=>statusTag(s) },
    { title:'预约时间', dataIndex:'time' },
    { title:'操作', dataIndex:'op', render:(_:any,r:any)=> <Button type="link" onClick={()=>{setSelected(r);setShowDetail(true);}}>详情</Button> }
  ];

  const onCreate = async ()=>{
    try{
      const v = await form.validateFields();
      const next = { id: Date.now(), orderNo: v.orderNo.trim(), user:v.user.trim(), deviceName:v.deviceName.trim(), amount:Number(v.amount), status:v.status, time:v.time };
      setData(prev=>[next, ...prev]);
      message.success('新增订单成功（模拟）');
      setShowCreate(false); form.resetFields();
    }catch{}
  };

  return <div>
    <h2>订单管理</h2>

    <Card size="small" style={{marginBottom:16}}>
      <Row gutter={16}>
        <Col span={8}>
          <Input placeholder="订单号" prefix={<SearchOutlined/>} allowClear value={filters.keyword} onChange={e=>setFilters(p=>({...p, keyword:e.target.value}))}/>
        </Col>
        <Col span={6}>
          <Select placeholder="订单状态" allowClear value={filters.status} onChange={v=>setFilters(p=>({...p, status:v}))} style={{width:'100%'}} options={[
            {value:'finished',label:'已完成'},
            {value:'processing',label:'进行中'},
            {value:'cancelled',label:'已取消'}
          ]}/>
        </Col>
        <Col span={4}>
          <Button icon={<ReloadOutlined/>} onClick={()=>setFilters({keyword:'',status:''})}>重置筛选</Button>
        </Col>
      </Row>
    </Card>

    <div style={{ display:'flex', justifyContent:'flex-end', margin:'-8px 0 8px 0' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={()=>setShowCreate(true)}>新增订单</Button>
    </div>

    <Table columns={columns} rowKey="id" dataSource={filtered} pagination={{ pageSize:10, showSizeChanger:true, pageSizeOptions:['5','10','20','50'], showTotal:(t:number)=>`共 ${t} 条` }}/>

    <OrderDetailModal open={showDetail} onCancel={()=>setShowDetail(false)} order={selected}/>

    <Modal title="新增订单" open={showCreate} onCancel={()=>setShowCreate(false)} onOk={onCreate} okText="确定" cancelText="取消" destroyOnClose>
      <Form form={form} layout="vertical">
        <Form.Item label="订单编号" name="orderNo" rules={[{required:true,message:'请输入订单编号'}]}><Input/></Form.Item>
        <Form.Item label="用户" name="user" rules={[{required:true,message:'请输入用户'}]}><Input/></Form.Item>
        <Form.Item label="设备" name="deviceName" rules={[{required:true,message:'请输入设备名称'}]}><Input/></Form.Item>
        <Form.Item label="金额" name="amount" rules={[{required:true,message:'请输入金额'}]}><Input type="number"/></Form.Item>
        <Form.Item label="状态" name="status" rules={[{required:true,message:'请选择状态'}]}>
          <Select options={[{value:'finished',label:'已完成'},{value:'processing',label:'进行中'},{value:'cancelled',label:'已取消'}]}/>
        </Form.Item>
        <Form.Item label="预约时间" name="time" rules={[{required:true,message:'请输入预约时间'}]}><Input placeholder="2025-10-23 10:00"/></Form.Item>
      </Form>
    </Modal>
  </div>
}
