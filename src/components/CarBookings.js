import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { getBookingsByCarId, removeBooking } from '../utils/api';
import { useParams } from "react-router-dom";

const { Column } = Table;

const currentUser = 'hui';

export default function CarBookings() {
  let [bookings, setBookings] = useState(null)
  let { id } = useParams();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    getBookingsByCarId(id).then(data => setBookings(data.map(b => ({
      key: b.id,
      id: b.id,
      user: b.driver,
      date: `${b.startDate} ${b.startTime} - ${b.endTime}`,
    }))));
  };

  const deleteBooking = (bookingId) => {
    removeBooking(bookingId).then(() => loadBookings());
  };

  return (
    <>
      {bookings && <Table dataSource={bookings}>
        <Column title="Driver" dataIndex="user" key="user" />
        <Column title="Timeslot" dataIndex="date" key="date" />
        <Column
          key="action"
          render={
            (_, record) => (
              record.user === currentUser
                ? <Button onClick={() => deleteBooking(record.id)} type="link" block icon={<DeleteTwoTone />} />
                : null
              )
          }
        />
      </Table>
      }
    </>
  );
}
