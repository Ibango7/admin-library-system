'use client';
import "./globals.css";
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  SyncOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible>
            <div className="logo" />
            <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
                <Link href="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<BellOutlined />}>
                <Link href="">Publish news</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<SyncOutlined />}>
              <Link href="/self-organizing-shelf">Self-organizing shelf</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
              <Link href="/userlist">Users</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<FileTextOutlined />}>
              <Link href="">Log out</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="adminLayout">
            <Header className="adminLayoutBackground" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
               {/* Content here */}
               {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Library Management System ©2024</Footer>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}

