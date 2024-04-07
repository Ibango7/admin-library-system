'use client';
import { Layout, Breadcrumb, Card, Button, Table, Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useContext } from 'react';
import { BookStateContext, BookActionContext } from '@/providers/bookProvider/context';
import { IBook } from '../self-organizing-shelf/self-organizing-class/Node';
const { Content, Footer } = Layout;
const { Search } = Input;

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
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { books } = useContext(BookStateContext);
  const { getAllBooks, getBookByISBN } = useContext(BookActionContext);

  // Store the original array of books
  const [originalBooks, setOriginalBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const handleGetAllBooks = async () => {
      try {
        if (getAllBooks) {
          const response = await getAllBooks();
          setOriginalBooks(response);
        }
      } catch (error) {
        console.log("Error in useEffect while trying to get books", error);
      }
    }

    handleGetAllBooks();
  }, []);

  // Function to handle search input change
  const handleSearch = async () => {
    const trimmedValue = searchValue.trim();

    try {
      const response = await getBookByISBN(trimmedValue);
      // console.log("Response::;?",response);
      if (response) {
        setFilteredBooks([response]);
      } else {
        console.log("Response::;?",response);
        setFilteredBooks([]);
      }
    } catch (error) {
      console.log("Error searching for book", error);
    }
  };

  // Function to handle clearing the search
  const handleClearSearch = () => {
    setSearchValue('');
    setFilteredBooks(originalBooks); // Reset filteredBooks to the original list of books
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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={handleSearch}
                style={{ marginBottom: 16 }}
              />
              <Button onClick={handleClearSearch}>Clear Search</Button>
              <Table dataSource={filteredBooks.length ? filteredBooks : books} columns={columnsAllBooks} pagination={{ pageSize: 18 }} />
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
