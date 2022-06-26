import React from "react"
import { Modal } from "antd"
import { Form, Input } from 'antd';

export default function ModalWindow(props){
    return(
        <div>
            <Modal className="modal" title="Create Collection" 
                visible={props.isModalVisible} 
                onOk={props.handleOk}
                onCancel={props.handleCancel}

                closable={false}
                cancelButtonProps={{ style: { height: "30px", 
                    borderRadius: "6px", border: "0.2px solid #222222", backgroundColor: "white",
                    color: "black", fontWeight: "500", float: "right", marginRight: "5px" } 
                }}

                okButtonProps={{ style: { height: "30px", width: "60px",
                    borderRadius: "6px", border: "none", backgroundColor: "#4F46E5",
                    color: "white", fontWeight: "500", float: "right", marginRight: "5px" }
                }}
                okText="SAVE"
            >
                <hr className="modal-hr" />
                <Form
                    className="modal-form"
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
                        label="Name"
                        name="name"
                        className="modal-labels"
                        onChange={(event) => {props.handleChange(event, "name")}}
                        value={props.collection.name}
                        rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                        ]}
                    >
                        <Input type="text" className="modal-input" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        className="modal-labels"
                        onChange={(event) => {props.handleChange(event, "description")}}
                        value={props.collection.description}
                        rules={[
                        {
                            required: true,
                            message: 'Please input your description!',
                        },
                        ]}
                    >
                        <Input type="text" className="modal-input" />
                    </Form.Item>

                    <Form.Item
                        label="Theme"
                        name="theme"
                        className="modal-labels"
                        onChange={(event) => {props.handleChange(event, "theme")}}
                        value={props.collection.theme}
                        rules={[
                        {
                            required: true,
                            message: 'Please input your theme!',
                        },
                        ]}
                    >
                        <Input type="text" className="modal-input" />
                    </Form.Item>
                </Form>
                <hr className="modal-hr" />
            </Modal>
        </div>
    )
}