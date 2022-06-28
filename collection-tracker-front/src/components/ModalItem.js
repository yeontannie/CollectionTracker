import React from "react"
import { Modal, Form, Input } from "antd"

export default function ModalItem(props){
    const collectionEls = props.collections.map(c => (
        <option className="option" key={c.id} value={c.id}>
            {c.name}
        </option>)
    )

    return(
        <div>
            <Modal className="modal-item" title={props.title}
                visible={props.isModalVisible} 
                onOk={props.handleOk}
                onCancel={props.handleCancel}

                closable={false}
                cancelButtonProps={{ style: { height: "30px", 
                    borderRadius: "6px", border: "0.2px solid #222222", backgroundColor: "white",
                    color: "black", fontWeight: "500", float: "right", marginRight: "5px", cursor: "pointer" } 
                }}

                okButtonProps={{ style: { height: "30px", width: "60px",
                    borderRadius: "6px", border: "none", backgroundColor: "#4F46E5",
                    color: "white", fontWeight: "500", float: "right", marginRight: "5px", cursor: "pointer" }
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
                        label="Name" className="modal-labels"
                        onChange={(event) => {props.handleChange(event, "name")}}
                        rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                        ]}
                    >
                        {props.title === "Create Item" ? <>
                            <Input type="text" className="modal-input" defaultValue="" />
                        </> : <>
                            <Input type="text" className="modal-input" defaultValue={props.item.name} />
                        </> }
                    </Form.Item>

                    {props.title === "Create Item" ? <>
                        <Form.Item name="collectionId"
                            onChange={(event) => {props.handleChange(event, "collectionId")}}>
                            <select className="form-select"> 
                                <option className="option" key="0" disabled selected>Choose Collection</option>
                                { collectionEls }
                            </select>
                        </Form.Item>
                    </> : <>
                        <Form.Item name="collectionId"
                        onChange={(event) => {props.handleChange(event, "collectionId")}}>
                            <select className="form-select" defaultValue={props.item.collectionId}>
                                { collectionEls }
                            </select>
                        </Form.Item></>
                    }
                </Form>
                <hr className="modal-hr" />
            </Modal>
        </div>
    )
}