import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';
import { usePagination } from './usePagination'; // Import the custom pagination hook

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  data: User[];
  totalRecords: number;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]| any>([]);
  const [loading, setLoading] = useState(false);

  // Use the custom pagination hook
  const pagination = usePagination('users', 10);

  const fetchData = async () => {
    setLoading(true);
    try {
      const  response  = await axios.get<ApiResponse>(
        `http://localhost:5000/api/users?skip=${pagination.skip}&take=${pagination.take}`
      )
      
      setUsers(response.data.data as User[]);
 
      pagination.updateTotalCount(response.data.totalRecords); 
    } catch (error) {
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
  ];

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <Table
        style={{ width: '100%', height: '100%' }}
        dataSource={users}
        columns={columns}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          onChange: pagination.onChange,
          showTotal: pagination.showTotal,
        }}
        rowKey={(record) => record.id.toString()}
      />
    </div>
  );
};

export default App;
