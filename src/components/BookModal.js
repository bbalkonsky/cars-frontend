import { Modal } from 'antd';
import { getBookingsByCarId } from '../utils/api';

import React, { useState, useEffect } from 'react';


import { DatePicker, TimePicker, Form, Checkbox } from 'antd';
const { RangePicker } = DatePicker;


export default function BookModal({ openModal, carData, dataUpdated }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeBookings, setActiveBookings] = useState([]);

    useEffect(() => {
        if (carData) {
            getBookingsByCarId(carData.id).then(bookings => {
                setActiveBookings(bookings);
                // console.log(
                    // new Date(bookings[0].startDate)
                // )
            });
        }
    }, [carData]);

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

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      };
      const onOk = (value) => {
        console.log('onOk: ', value);
      };

      const disabledDate = (current) => {
        // Can not select days before today and today
        console.log(current)
        return current.$D % 3 === 0;
      };

      const disabledDateTime = () => ({
        disabledHours: () => [12, 13, 15, 18],
        disabledMinutes: () => [50, 20],
      });

    return (
        <Modal
            title={`Book car: ${carData?.name}`}
            // bodyStyle={{ height: '85vh', overflowY: 'auto' }}
            style={{ top: 20 }}
            destroyOnClose={true}
            open={isModalOpen}
            okText="Save"
            onOk={handleCancel}
            onCancel={handleCancel}>

            <Form
                // form={newForm}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={() => {}}
                // disabled={isLoading}
                layout="vertical">
                    <Form.Item
                        label="Date"
                        name="date">
                            <DatePicker
                                inputReadOnly={true}
                                style={{ width: '100%' }}
                                disabledDate={disabledDate}
                                format="YYYY-MM-DD"
                                onChange={onChange}
                                onOk={onOk}
                            />
                    </Form.Item>

                    <Form.Item
                        label="Time"
                        name="time">
                            <>
                                <TimePicker.RangePicker
                                    inputReadOnly={true}
                                    style={{ width: '100%' }}
                                    disabledTime={disabledDateTime}
                                    minuteStep={10} format="h:mm"
                                />
                                <Checkbox onChange={onChange}>Whole day</Checkbox>
                            </>
                    </Form.Item>
                </Form>
        </Modal>
    );
}
