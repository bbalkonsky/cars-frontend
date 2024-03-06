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
    getBookingsByCarId(id).then(data => setBookings(data.map(b => {
      const newDate = new Date(b.startDatetime);
      return {
        key: b.id,
        id: b.id,
        user: b.driver,
        date: `${newDate.getDate()}.${newDate.getMonth() + 1}, ${mapWeekDays[newDate.getDay()]}`,
        timeslot: ` ${b.startTime.split(':').slice(0, 2).join(':')} - ${b.endTime.split(':').slice(0, 2).join(':')}`
      }
    })));
  };

  const mapWeekDays = {
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thurs',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun',
  };

  const deleteBooking = (bookingId) => {
    removeBooking(bookingId).then(() => loadBookings());
  };

  return (
    <>
      {bookings && <Table dataSource={bookings}>
        <Column title="Driver" dataIndex="user" key="user" />
        <Column title="Date" dataIndex="date" key="date" />
        <Column title="Timeslot" dataIndex="timeslot" key="timeslot" />
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
