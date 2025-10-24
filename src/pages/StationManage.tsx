import { useMemo, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Row, Col, Card, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import StationDetailModal from '../components/StationDetailModal';

const genStations=(n:number)=>{
  const arr:any[]=[];
  for(let i=1;i<=n;i++){
    arr.push({
      id:i,
      name:`场站${i}`,
      address:`XX市XX区XX路${i}号`,
      deviceCount: Math.floor(Math.random()*20)+1,
      owner:`负责人${i}`,
      status: i%2===0?'active':'pending'
    });
  }
  return arr;
};

const initial = genStations(26);

export default function StationManage(){
  const [data,setData]=useState(initial);
  const [filters,setFilters]=useState({keyword:'',status:''});
  const [showCreate,setShowCreate]=useState(false);
  const [showDetail,setShowDetail]=useState(false);
  const [selected,setSelected]=useState(null);
  const [form]=Form.useForm();

  const filtered = useMemo(()=>{
    return data.filter(s=>{
      const kw = filters.keyword.trim().toLowerCase();
      const kwOk = !kw || s.name.toLowerCase().includes(kw);
      const stOk = !filters.status || s.status===filters.status;
      return kwOk && stOk;
    });
  },[data,filters]);

  const statusTag=(s:string)=> s==='active'?<Tag color="green">运营中</Tag>:<Tag>未上线</Tag>;

  const columns=[
    {title:'场站名称',dataIndex:'name'},
    {title:'地址',dataIndex:'address'},
    {title:'设备数量',dataIndex:'deviceCount'},
    {title:'负责人',dataIndex:'owner'},
    {title:'状态',dataIndex:'status',render:(s:string)=>statusTag(s)},
    {title:'操作',dataIndex:'op',render:(_:any,r:any)=><Button type="link" onClick={()=>{setSelected(r);setShowDetail(true);}}>详情</Button>}
  ];

  const onCreate=async()=>{
    try{
      const v=await form.validateFields();
      const next={ id:Date.now(), name:v.name.trim(), address:v.address.trim(), deviceCount:Number(v.deviceCount), owner:v.owner.trim(), status:v.status };
      setData(prev=>[next,...prev]);
      message.success('新增场站成功（模拟）');
      setShowCreate(false); form.resetFields();
    }catch{}
  };

  return <div>
    <h2>场站管理</h2>

    <Card size="small" style={{marginBottom:16}}>
      <Row gutter={16}>
        <Col span={8}><Input placeholder="场站名称" prefix={<SearchOutlined/>} allowClear value={filters.keyword} onChange={e=>setFilters(p=>({...p,keyword:e.target.value}))}/></Col>
        <Col span={6}><Select placeholder="状态" allowClear style={{width:'100%'}} value={filters.status} onChange={v=>setFilters(p=>({...p,status:v}))} options={[{value:'active',label:'运营中'},{value:'pending',label:'未上线'}]}/></Col>
        <Col span={4}><Button icon={<ReloadOutlined/>} onClick={()=>setFilters({keyword:'',status:''})}>重置筛选</Button></Col>
      </Row>
    </Card>

    <div style={{ display:'flex', justifyContent:'flex-end', margin:'-8px 0 8px 0' }}>
      <Button type="primary" icon={<PlusOutlined/>} onClick={()=>setShowCreate(true)}>新增场站</Button>
    </div>

    <Table columns={columns} rowKey="id" dataSource={filtered} pagination={{pageSize:10, showSizeChanger:true, pageSizeOptions:['5','10','20','50'], showTotal:(t:number)=>`共 ${t} 条`}}/>

    <StationDetailModal open={showDetail} onCancel={()=>setShowDetail(false)} station={selected}/>

    <Modal title="新增场站" open={showCreate} onCancel={()=>setShowCreate(false)} onOk={onCreate} okText="确定" cancelText="取消" destroyOnClose>
      <Form form={form} layout="vertical">
        <Form.Item label="场站名称" name="name" rules={[{required:true,message:'请输入场站名称'}]}><Input/></Form.Item>
        <Form.Item label="地址" name="address" rules={[{required:true,message:'请输入地址'}]}><Input/></Form.Item>
        <Form.Item label="设备数量" name="deviceCount" rules={[{required:true,message:'请输入设备数量'}]}><Input type="number"/></Form.Item>
        <Form.Item label="负责人" name="owner" rules={[{required:true,message:'请输入负责人'}]}><Input/></Form.Item>
        <Form.Item label="状态" name="status" rules={[{required:true,message:'请选择状态'}]}>
          <Select options={[{value:'active',label:'运营中'},{value:'pending',label:'未上线'}]}/>
        </Form.Item>
      </Form>
    </Modal>
  </div>
}
