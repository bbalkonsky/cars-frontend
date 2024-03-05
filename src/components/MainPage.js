import Cars from './Cars';
import { Button } from 'antd';
import { getCardStatus, takeCard, returnCard } from '../utils/api';
import { useState, useEffect } from 'react';

const currentUser = 'hui';

export default function MainPage() {
  const [card, setCard] = useState(null);

  useEffect(() => {
    loadCardStatus();
  }, []);

  const loadCardStatus = () => {
    getCardStatus().then(data => setCard(data));
  };

  const startCardUsage = () => {
    takeCard({user: currentUser}).then(() => {
      loadCardStatus();
    });
  };

  const endCardUsage = () => {
    returnCard().then(() => {
      loadCardStatus();
    });
  };

  return (
    <>
      <Cars />
      { card && 
        <div
          className='car-item'>
          <img
            className='car-image'
            src="./karta.jpg"
            alt="foto"
          />
          <div className="car-buttons-container">
            { card.endDate && 
              <Button
                onClick={startCardUsage}
                shape="round"
                key="back">
                Get
              </Button>
            }
            { !card.endDate && card.user === currentUser &&
              <Button
                onClick={endCardUsage}
                shape="round"
                key="back">
                Return
              </Button>
            }
          </div>
        </div>
      }
    </>
  );
}
