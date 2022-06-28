import React from "react"
import { Modal, Form } from "antd"

export default function DeleteModal(props){
    return(
        <div>
            <Modal className="modal-delete" title="Are you sure?"
                visible={props.isModalVisible} 
                onOk={props.handleOk}
                onCancel={props.handleCancel}

                closable={false}
                cancelButtonProps={{ style: { height: "30px", 
                    borderRadius: "6px", border: "0.2px solid #222222", backgroundColor: "white",
                    color: "black", fontWeight: "500", float: "right", marginRight: "5px", cursor: "pointer" } 
                }}

                okButtonProps={{ style: { height: "30px", width: "70px",
                    borderRadius: "6px", border: "none", backgroundColor: "red",
                    color: "white", fontWeight: "500", float: "right", marginRight: "5px", cursor: "pointer" }
                }}
                okText="DELETE"
            >
                <Form
                    className="modal-form-delete"
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    autoComplete="off"
                >
                    <Form.Item className="modal-text">
                        You want to delete item "{props.name}"?
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}