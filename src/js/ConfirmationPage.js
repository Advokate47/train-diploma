import React from 'react';
import { TripDetails } from './TripDetails';
import { CurrentTrain } from './CurrentTrain';
import {Link} from 'react-router-dom';
import { TrainCardFinal } from './TrainCardFinal';

const ConfirmationPage = (props) => {
  console.log(props)
  const passengersList = JSON.parse(sessionStorage.passengersList);
  const passengers = JSON.parse(sessionStorage.passengers);
  const price = JSON.parse(sessionStorage.totalPrice);
  const train = JSON.parse(sessionStorage.currentTrain);
  
  
  const {paymentMethod} = props.location;

  const formatPaymentMethod = () => {
    switch (paymentMethod) {
      case "paypal": 
        return "PayPal";
      case "credit-card":
        return "Банковской картой";
      case "qiwi-wallet":
        return "Visa QIWI Wallet";
      default:
        return;
    }
  }

  return (
    <div className="columns">
      <div className="col-left">
        <TripDetails props={props} passengers={passengers} price={price}/>
      </div>

      <div className="col-right">
        <div className="confirmation">
          <div className="order_title">Поезд</div>
          <TrainCardFinal 
          trainsBack={props.currentTrain[1]}
                                
                                departure={props.currentTrain[0]} 
                                
  />
        </div>

        <div className="confirmation">
          <div className="order_title">Пассажиры</div>
          <PassengersList list={passengersList} />
        </div>

        <div className="confirmation">
          <div className="order_title">Способ оплаты</div>
          <div className="confirmation_payment">
            <div className="confirmation_method">{formatPaymentMethod()}</div>
            <div className="confirmation_price">
              <span>Всего:</span>
              <span>{parseInt(price).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Link to='/success' >
          <button className="purchase-button">Подтвердить</button>
        </Link>
      </div>
    </div>
  )
}

export {ConfirmationPage}


const PassengersList = (props) => {
  const {list} = props;
  return list.map((el, i) => <PassengersListItem key={i} info={el}/>)
}

const PassengersListItem = ({key, info}) => {
  return (
    <div className="passenger">
      <div className="passenger-icon">
        <div className="passenger-icon_img"></div>
        <div className="passenger-icon_title">{info.adult ? "Взрослый" : "Детский"}</div>
      </div>
      <div className="passenger-info">
        <div className="passenger-info_name">{info.name}</div>
        <div className="passenger-info_other">{info.gender}</div>
        <div className="passenger-info_other">{info.dateOfBirth}</div>
        <div className="passenger-info_other">{info.document}</div>
      </div>
    </div>
  )
}

