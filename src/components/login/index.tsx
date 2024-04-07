import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './styles/login.module.scss';

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = (values: any) => {
        setLoading(true);
        // Simulating login request
        setTimeout(() => {
            console.log('Received values of form: ', values);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className={styles.loginContainer}>
            <Form
                name="normal_login"
                className={styles.loginForm}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h3 style={{textAlign:"center"}}>Admin login</h3>
                <Form.Item
                    name="email"
                    rules={[{ type:"email", required: true, message: 'Please input valid email' }]}
                >
                    <Input prefix={<UserOutlined className={styles.siteFormItemIcon} />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className={styles.siteFormItemIcon} />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.loginFormButton} loading={loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
