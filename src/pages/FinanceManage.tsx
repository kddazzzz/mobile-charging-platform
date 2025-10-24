import { useMemo, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Row, Col, Card, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import FinanceDetailModal from '../components/FinanceDetailModal';

const genFinances=(n:number)=>{
  const arr:any[]=[];
  for(let i=1;i<=n;i++){
    arr.push({
      id:i,
      title:`收入项${i}`,
      amount:Number((Math.random()*500).toFixed(2)),
      type: i%2===0?'收入':'支出',
      reconciled: i%3===0,
      period: `2025-Q${(i%4)+1}`
    });
  }
  return arr;
};

const initial = genFinances(36);

export default function FinanceManage(){
  const [data,setData]=useState(initial);
  const [filters,setFilters]=useState({keyword:'',type:'',reconciled:''});
  const [showCreate,setShowCreate]=useState(false);
  const [showDetail,setShowDetail]=useState(false);
  const [selected,setSelected]=useState(null);
  const [form]=Form.useForm();

  const filtered=useMemo(()=>{
    return data.filter(r=>{
      const kw = filters.keyword.trim().toLowerCase();
      const kwOk = !kw || r.title.toLowerCase().includes(kw);
      const typeOk = !filters.type || r.type===filters.type;
      const recOk = filters.reconciled==='' || String(r.reconciled)===filters.reconciled;
      return kwOk && typeOk && recOk;
    })
  },[data,filters]);

  const statusTag=(b:boolean)=> b?<Tag color="green">已对账</Tag>:<Tag color="warning">未对账</Tag>;

  const columns=[
    {title:'标题',dataIndex:'title'},
    {title:'金额',dataIndex:'amount',render:(v:number)=>`¥${v}`},
    {title:'类型',dataIndex:'type'},
    {title:'对账状态',dataIndex:'reconciled',render:(b:boolean)=>statusTag(b)},
    {title:'周期',dataIndex:'period'},
    {title:'操作',dataIndex:'op',render:(_:any,r:any)=><Button type="link" onClick={()=>{setSelected(r);setShowDetail(true);}}>详情</Button>}
  ];

  const onCreate=async()=>{
    try{
      const v=await form.validateFields();
      const next={ id:Date.now(), title:v.title.trim(), amount:Number(v.amount), type:v.type, reconciled:v.reconciled==='true', period:v.period };
      setData(prev=>[next,...prev]);
      message.success('新增记录成功（模拟）');
      setShowCreate(false); form.resetFields();
    }catch{}
  };

  return <div>
    <h2>财务管理</h2>

    <Card size="small" style={{marginBottom:16}}>
      <Row gutter={16}>
        <Col span={8}><Input placeholder="标题" prefix={<SearchOutlined/>} allowClear value={filters.keyword} onChange={e=>setFilters(p=>({...p,keyword:e.target.value}))}/></Col>
        <Col span={4}><Select placeholder="类型" allowClear value={filters.type} onChange={v=>setFilters(p=>({...p,type:v}))} style={{width:'100%'}} options={[{value:'收入',label:'收入'},{value:'支出',label:'支出'}]}/></Col>
        <Col span={6}><Select placeholder="对账状态" allowClear value={filters.reconciled} onChange={v=>setFilters(p=>({...p,reconciled:v}))} style={{width:'100%'}} options={[{value:'true',label:'已对账'},{value:'false',label:'未对账'}]}/></Col>
        <Col span={4}><Button icon={<ReloadOutlined/>} onClick={()=>setFilters({keyword:'',type:'',reconciled:''})}>重置筛选</Button></Col>
      </Row>
    </Card>

    <div style={{ display:'flex', justifyContent:'flex-end', margin:'-8px 0 8px 0' }}>
      <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setShowCreate(true)}>新增记录</Button>
    </div>

    <Table columns={columns} rowKey="id" dataSource={filtered} pagination={{pageSize:10, showSizeChanger:true, pageSizeOptions:['5','10','20','50'], showTotal:(t:number)=>`共 ${t} 条`}}/>

    <FinanceDetailModal open={showDetail} onCancel={()=>setShowDetail(false)} record={selected}/>

    <Modal title="新增记录" open={showCreate} onCancel={()=>setShowCreate(false)} onOk={onCreate} okText="确定" cancelText="取消" destroyOnClose>
      <Form form={form} layout="vertical">
        <Form.Item label="标题" name="title" rules={[{required:true,message:'请输入标题'}]}><Input/></Form.Item>
        <Form.Item label="金额" name="amount" rules={[{required:true,message:'请输入金额'}]}><Input type="number"/></Form.Item>
        <Form.Item label="类型" name="type" rules={[{required:true,message:'请选择类型'}]}>
          <Select options={[{value:'收入',label:'收入'},{value:'支出',label:'支出'}]}/>
        </Form.Item>
        <Form.Item label="对账状态" name="reconciled" rules={[{required:true,message:'请选择对账状态'}]}>
          <Select options={[{value:'true',label:'已对账'},{value:'false',label:'未对账'}]}/>
        </Form.Item>
        <Form.Item label="周期" name="period" rules={[{required:true,message:'请输入周期'}]}><Input placeholder="2025-Q4"/></Form.Item>
      </Form>
    </Modal>
  </div>
}
