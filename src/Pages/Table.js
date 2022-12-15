import { Button, Form, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
// import "antd/dist/antd.css";

const CrudTable = () => {
const [crads,setCrads]= useState([])
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
useEffect(()=>{
  fetch('products.json')
  .then(res=>res.json())
  .then(data=>{
    setCrads(data.data);
    console.log(data.data)
  })
},[])
useEffect(() => {
  const data = [];
  for (let index = 0; index < 20; index++) {
    data.push({
      key: `${index}`,
      name: `jamal`,
      Description: `Hi jhon smith`,
    });
  }
  setDataSource(data);
}, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Description",
      dataIndex: "Description",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="Description">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  Description: record.Description,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];
  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };
    return (
        <>
        <div className="lg:mx-20 lg:my-20">
        <Form form={form} onFinish={onFinish}>
          <Table columns={columns} dataSource={dataSource}></Table>
        </Form>
        </div>
        </>
    );
};

export default CrudTable;