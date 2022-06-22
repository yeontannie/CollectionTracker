import React from "react"
import { Button, Form, Input } from 'antd';

export default function EmailForm(props){
    return(
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            autoComplete="off"
            >
            <Form.Item
                label="Email"
                name="email"
                className="labels"
                onChange={(event) => {props.handleChange(event, "email")}}
                value={props.email}
                rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}
            >
                <Input type="email" className="form-input" />
            </Form.Item>

            <Form.Item
                className="labels"
                label="Password"
                name="password"
                onChange={(event) => {props.handleChange(event, "password")}}
                value={props.password}
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input type="password" className="form-input" />
            </Form.Item>

            { props.btnText === "Register" &&
                <Form.Item
                    className="labels"
                    label="Confirmation"
                    name="confirmation"
                    onChange={(event) => {props.handleChange(event, "confirmation")}}
                    value={props.confirmation}
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ]}
                >
                    <Input type="password" className="form-input" />
                </Form.Item>
            }

            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" className="form-btn" onClick={props.userSubmit}>
                    {props.btnText}
                </Button>
            </Form.Item>
        </Form>
    )
}