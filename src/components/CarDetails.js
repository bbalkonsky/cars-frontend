import { Descriptions } from 'antd';

export default function CarDetails({ details }) {
  return (
    <>
      { details &&
          <Descriptions bordered>
          <Descriptions.Item label="Availability">{details.status ? 'Available' : 'Unavailable'}</Descriptions.Item>
          <Descriptions.Item label="Last drive">{details.lastDriver}</Descriptions.Item>
          <Descriptions.Item label="Location">{details.location}</Descriptions.Item>
          <Descriptions.Item label="Mileage">{details.mileage} km</Descriptions.Item>
          <Descriptions.Item label="Gas level">{details.gas}</Descriptions.Item>
        </Descriptions>
      }
    </>
  );
}
