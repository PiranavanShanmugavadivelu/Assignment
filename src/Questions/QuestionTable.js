import { Table, Tag, Input, Button, Dropdown, Menu, message} from 'antd';
import {useEffect, useContext, useState} from "react";
import QuestionContext from "../Services/QuestionContext";
import {
    EllipsisOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    DeleteOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import NewQuestionModal from "./NewQuestionModal";

function QuestionTable() {
    const {questions, isLoading, getQuestions, total, deleteQuestion, deactivateQuestion} = useContext(QuestionContext)
    const initialValue = {
        currentPage: 1,
        pageSize: 10,
    };
    const [pagination, setPagination] = useState(initialValue);
    const [searchValue, setSearchValue] = useState('')
    const [questionModalVisible, setQuestionModalVisible] = useState(false)

    useEffect(() => {
        getQuestions(pagination.currentPage, pagination.pageSize, searchValue)
    }, [pagination])

    const deleteQuestionHandle = async (id) => {
        const response = await deleteQuestion(id)
        if (response) {
            message.success("Message deleted Successfully")
        }
    }
    const deactivateQuestionHandle = async (id,body) => {
        const response = await deactivateQuestion(id,body)
        if (response) {
            message.success("Message deactivated Successfully")
        }
    }

    const menu = (record) => {
        return (
            <Menu
                items={[
                    {
                        key: '1',
                        label: (
                            <Button icon={<EyeOutlined/>} size={"small"} type="link">View</Button>
                        ),
                    },
                    {
                        key: '2',
                        label: (
                            <Button icon={<CheckCircleOutlined/>} size={"small"} type="link"
                                    onClick={() => deactivateQuestionHandle(record.id,record)} disabled={!record.active}>Deactivate</Button>
                        ),
                    },
                    {
                        key: '3',
                        label: (
                            <Button icon={<DeleteOutlined/>} size={"small"} type="link"
                                    onClick={() => deleteQuestionHandle(record.id)}>Delete</Button>
                        ),
                    },
                ]}
            />)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => <>
                {record.status === 'Published' ? <Tag color="#4caf50" >Published</Tag> : <Tag color="gray">Draft</Tag>}
            </>
        },
        {
            title: 'Action',
            dataIndex: 'name',
            render: (text, record) => <>
                <Dropdown overlay={() => menu(record)} placement="bottomLeft" arrow>
                    <Button icon={<EllipsisOutlined/>} size={"small"} type="link"/>
                </Dropdown>
            </>
            ,
        },
    ];

    const handlePageChange = (tableSize) => {
        setPagination({currentPage: tableSize.current, pageSize: tableSize.pageSize});
    };

    const closeModal = () => {
        setQuestionModalVisible(false)
    }
    return (
        <>
            <NewQuestionModal visible={questionModalVisible} closeModal={() => closeModal()}/>
            <div className='table-parent'>
                <div className='title-box'>
                    <h1>FAQ Manager - iLabs</h1>
                    <Button className='add-button' size={"large"} icon={<PlusCircleOutlined/>}
                            onClick={() => setQuestionModalVisible(true)}>Add New Question</Button>
                </div>
                <div className='search-box'>
                    <Input
                        className='search-input'
                        placeholder="Search"
                        size="large"
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                    <Button className='search-button' size={"large"}
                            onClick={() => getQuestions(1, pagination.pageSize, searchValue)}>Search</Button>
                </div>
                <div className='table'>
                    <Table columns={columns} dataSource={questions}
                           loading={isLoading}
                           pagination={{
                               pageSize: pagination.pageSize,
                               current: pagination.currentPage,
                               total: total,
                               showSizeChanger: true,

                           }}
                           onChange={handlePageChange}
                    />
                </div>


            </div>
        </>
    );
}

export default QuestionTable;
