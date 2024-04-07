'use client';
import { Layout, Breadcrumb, Card, Button, Table, Input, Modal} from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';

const {Content, Footer } = Layout;
const { Search } = Input;

const allBooksData = [
  { key: '1', isbn: '123456789', title: 'Book 1', author: 'Author 1', genre: 'Genre 1', quantity: 5, shelf: 'Shelf 1' },
  { key: '2', isbn: '987654321', title: 'Book 2', author: 'Author 2', genre: 'Genre 2', quantity: 10, shelf: 'Shelf 2' },
  { key: '3', isbn: '567891234', title: 'Book 3', author: 'Author 3', genre: 'Genre 3', quantity: 8, shelf: 'Shelf 3' },
];

const mostBorrowedBooksData = [
  { key: '1', title: 'Book 1', genre: 'Genre 1', author: 'Author 1', isbn: '123456789' },
  { key: '2', title: 'Book 2', genre: 'Genre 2', author: 'Author 2', isbn: '987654321' },
  { key: '3', title: 'Book 3', genre: 'Genre 3', author: 'Author 3', isbn: '567891234' }
];

const overdueBooksData = [
  { key: '1', title: 'Book 1', author: 'Author 1', isbn: '123456789', daysOverdue: 5 },
  { key: '2', title: 'Book 2', author: 'Author 2', isbn: '987654321', daysOverdue: 3 },
  { key: '3', title: 'Book 3', author: 'Author 3', isbn: '567891234', daysOverdue: 7 },
];

const usersWithQueueBooksData = [
  { key: '1', userName: 'User 1', queuedBooks: ['Book 1', 'Book 2'] },
  { key: '2', userName: 'User 2', queuedBooks: ['Book 3', 'Book 4'] },
  { key: '3', userName: 'User 3', queuedBooks: ['Book 5', 'Book 6'] },
];

const Admin: React.FC = (props) => {
   // State for the search input value
   const [searchValue, setSearchValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(allBooksData);
  const [isModalVisible, setIsModalVisible] = useState(false);

    // Effect to filter books when search value changes
    useEffect(() => {
      const filtered = allBooksData.filter(book =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredBooks(filtered);
    }, [searchValue]);


   // Function to handle search input change
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim(); // Trim whitespace
    setSearchValue(trimmedValue);
  };

  const downloadPDF = () => {
    // PDF generation logic
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columnsAllBooks = [
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Genre', dataIndex: 'genre', key: 'genre' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Shelf', dataIndex: 'shelf', key: 'shelf' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: () => (
        <Button type="primary" onClick={showModal}>
          Change Book State
        </Button>
      ),
    },
  ];

  const columnsMostBorrowedBooks = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Genre', dataIndex: 'genre', key: 'genre' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
  ];

  const columnsOverdueBooks = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
    { title: 'Average of days Overdue', dataIndex: 'daysOverdue', key: 'daysOverdue' },
  ];

  const columnsUsersWithQueueBooks = [
    { title: 'User Name', dataIndex: 'userName', key: 'userName' },
    { title: 'Queued Books', dataIndex: 'queuedBooks', key: 'queuedBooks' },
  ];

  return (
    <div>
      <Layout className="adminLayout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="adminLayoutBackground" style={{ padding: 24, minHeight: 360 }}>
            <Card title="All Books">
              <Search
                placeholder="Search for books"
                allowClear
                enterButton={<SearchOutlined />}
                onChange={handleSearchChange}
                style={{ marginBottom: 16 }}
              />
              <Table dataSource={filteredBooks} columns={columnsAllBooks} pagination={{ pageSize: 10 }} />
            </Card>
            <Card title="Most Borrowed Books" style={{ marginTop: 16 }}>
              <Table dataSource={mostBorrowedBooksData} columns={columnsMostBorrowedBooks} pagination={false} />
            </Card>
            <Card title="Overdue Books" style={{ marginTop: 16 }}>
              <Table dataSource={overdueBooksData} columns={columnsOverdueBooks} pagination={false} />
            </Card>
            <Card title="Users Who Have Queued Books" style={{ marginTop: 16 }}>
              <Table dataSource={usersWithQueueBooksData} columns={columnsUsersWithQueueBooks} pagination={false} />
            </Card>
            <Button type="primary" style={{ marginTop: 16 }} onClick={downloadPDF}>
              Download PDFs
            </Button>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Library Management System ©2024</Footer>
      </Layout>
      <Modal title="Change Book State" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {/* Modal content */}
        {/* You can add form elements to change book state */}
      </Modal>
    </div>
  );
};

export default Admin;
