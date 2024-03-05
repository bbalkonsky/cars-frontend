import React, { useState, useEffect } from 'react';
import { Modal, Radio, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { finishRide } from '../utils/api';

const currentUser = 'hui';

export default function ReturnModal({ openModal, carData, dataUpdated }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [returnForm] = Form.useForm();

    useEffect(() => {
        if (openModal) {
            showModal();
        }
    }, [openModal]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const returnCar = async () => {
        const values = await returnForm.validateFields();

        finishRide(carData.id, {
            driver: currentUser,
            mileage: values.mileage,
            reason: values.reason,
            comment: values.comment
        }).then(() => {
            dataUpdated();
            handleCancel();
        })
    };

    return (
        <Modal
            title={"Return car: " + carData?.name}
            // bodyStyle={{ height: '85vh', overflowY: 'auto' }}
            style={{ top: 20 }}
            destroyOnClose={true}
            open={isModalOpen}
            okText="Save"
            onOk={returnCar}
            onCancel={handleCancel}>

            <Form
                form={returnForm}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={() => {}}
                // disabled={isLoading}
                layout="vertical">
                    <Form.Item
                        label="Mileage"
                        name="mileage">
                            <Input addonBefore={<><span>{carData?.mileage}</span> <ArrowRightOutlined /></>} />
                    </Form.Item>

                    <Form.Item
                        label="Reason"
                        name="reason">
                            <Radio.Group value="personal">
                                <Radio value="personal">Personal</Radio>
                                <Radio value="work">Work</Radio>
                            </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Comment"
                        name="comment">
                            <Input placeholder='fill-up, accident, etc...'/>
                    </Form.Item>
                </Form>
        </Modal>
    );
}
