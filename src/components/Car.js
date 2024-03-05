import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Table, Tabs, Button, Carousel } from 'antd';
import { ArrowLeftOutlined, DeleteTwoTone } from '@ant-design/icons';
import { getCarById } from '../utils/api';
import CarDetails from './CarDetails';
import CarBookings from './CarBookings';

const currentUser = 'hui';

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default function Car() {
  let [car, setCar] = useState(null)

  let navigate = useNavigate()
  let { id } = useParams();

  useEffect(() => {
    getCarById(id).then(data => setCar(data));
  }, []);


  const items = [
    {
      key: '1',
      label: 'Info',
      children:
        <CarDetails details={car} />
    },
    {
      key: '2',
      label: 'Active bookings',
      children:
        <CarBookings />,
    },
    // {
    //   key: '3',
    //   label: 'Damage',
    //   children:
    //     <Carousel>
    //       <div>
    //         <h3 style={contentStyle}>1</h3>
    //       </div>
    //       <div>
    //         <h3 style={contentStyle}>2</h3>
    //       </div>
    //       <div>
    //         <h3 style={contentStyle}>3</h3>
    //       </div>
    //       <div>
    //         <h3 style={contentStyle}>4</h3>
    //       </div>
    //     </Carousel>,
    // },
  ];

  return (
    <>
      {car &&
        <>
          <Button
            onClick={() => navigate(`/`)}
            type="text"
            size='large'
            icon={<ArrowLeftOutlined />}
          >
            {car.name}
          </Button>

          <img
            className='car-photo'
            src={car.image} />
        </>
      }

      <Tabs items={items} />
    </>
  );
}
