import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookModal from "./BookModal";
import ReturnModal from "./ReturnModal";
import { Button, Badge } from "antd";
import { getCars, startNewRide } from '../utils/api';

const currentUser = 'hui';

export default function Cars() {
    const [cars, setCars] = useState(null)
    const [dataUpdated, setDataUpdated] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [trigger2, setTrigger2] = useState(0);
    const [activeCar, setActiveCar] = useState(null);
    let navigate = useNavigate() 
    
    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = () => {
        getCars().then(cars => setCars(mapCars(cars)));
    };

    const navigateToCar = (id) => {
        navigate(`/${id}`);
    };

    const mapCars = (items) => items.map(car =>
        <div
            onClick={() => navigateToCar(car.id)}
            className='car-item'
            key={car.id}>
            <img
                className='car-image'
                src={car.image}
                alt="foto"
            />
            <div className='car-description-container'>
                <p className='car-description-text'>
                    <Badge status={car.status ? 'success' : 'error'} />
                    {car.name}
                </p>
                <p className='car-description-text'>{car.location}</p>
            </div>

            <div className="car-buttons-container">
                { car.status &&
                    <Button
                        onClick={(e) => startRide(e, car.id)}
                        shape="round"
                        key="back">
                        Start
                    </Button>
                }

                { !car.status && car.lastDriver === currentUser &&
                    <Button
                        onClick={(e) => showReturnModal(e, car)}
                        shape="round"
                        key="back">
                        Return
                    </Button>
                }

                <Button
                    onClick={(e) => showBookModal(e, car)}
                    shape="round"
                    key="back1">
                    Book
                </Button>
            </div>
        </div>
      );

    const modalClosed = () => {
        setDataUpdated(dataUpdated + 1);
        loadCars();
    };

    const showBookModal = (event, currentCar) => {
        event.stopPropagation();
        setActiveCar(currentCar);
        setTrigger((trigger) => ++trigger);
    };

    const showReturnModal = (event, currentCar) => {
        event.stopPropagation();
        setActiveCar(currentCar);
        setTrigger2((trigger2) => ++trigger2);
    };

    const startRide = (event, id) => {
        event.stopPropagation();
        startNewRide(id, {driver: currentUser}).then(() => {
            loadCars();
        });
    };

  return (
    <>
        { cars }
        <BookModal openModal={trigger} carData={activeCar} dataUpdated={modalClosed}/>
        <ReturnModal openModal={trigger2} carData={activeCar} dataUpdated={modalClosed}/>
    </>
  );
}
