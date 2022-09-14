import { useContext} from "react";
import {Button, Modal, Form, Input, Select,message} from 'antd';
import QuestionContext from "../Services/QuestionContext";

function NewQuestionModal(props) {
    const [form] = Form.useForm();
    const {addQuestion} = useContext(QuestionContext)
    const onSubmit = async (values) => {
        const response = await addQuestion(values)
        if (response) {
            message.success('Question Added Successfully');
            form.resetFields()
            props.closeModal()
        }
    }
    return (
        <Modal title="Add New Question" visible={props.visible} onCancel={() => props.closeModal()} footer={[
            <Button key="1" onClick={() => props.closeModal()}>Close</Button>,
            <Button key="3" type="primary" onClick={() => form.submit()}>
                Add Question
            </Button>
        ]}>
            <Form
                form={form}
                onFinish={onSubmit}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="Question"
                    name="question"
                    rules={[{required: true, message: 'Please input your question!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{required: true, message: 'Please input your category!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{required: true, message: 'Please select your question status!'}]}
                >
                    <Select>
                        <Select.Option value="Published">Published</Select.Option>
                        <Select.Option value="Draft">Draft</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewQuestionModal