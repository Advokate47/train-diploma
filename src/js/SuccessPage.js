import React, { useEffect, useContext, useState } from 'react';
import {ApiServiceContext} from './context';


const SuccessPage = (props) => {
  const api = useContext(ApiServiceContext);
  const payer = JSON.parse(sessionStorage.payer);
  const train = JSON.parse(sessionStorage.currentTrain);
  const passengersList = JSON.parse(sessionStorage.passengersList);
  const seats = JSON.parse(sessionStorage.seats);
  const price = parseInt(sessionStorage.totalPrice);
  
  const order = {
    user: payer,
    departure: {
      route_direction_id: train["_id"],
      seats: passengersList.map((el, i) => { 
        return {
          person_info: {
            is_adult: el.adult,
            first_name: el.firstName,
            last_name: el.lastName,
            patronymic: el.patronymic,
            gender: el.gender,
            birthday: el.dateOfBirth,
            document_type: el.document
          },
          seat_number: seats[i]
        }
        })
    }
  }
  useEffect(() => {
    api.createOrder(order)
      .then(response => console.log(response))
  }, []);

  return (
    <div className="success">
      <h1 className="success_title">Благодарим Вас за заказ!</h1>
      <div className="success_banner">
        <div className="success_order">
          <div className="success_id">№ Заказа 285АА</div>
          <div className="success_price">{price.toLocaleString()}</div>
        </div>

        <ul className="success_icons">
          <li className="success_item">
            <span className="success_icon success_icon-computer"></span>
            <span className="success_text">билеты будут отправлены на ваш e-mail</span>
          </li>
          <li className="success_item">
            <span className="success_icon success_icon-tickets"></span>
            <span className="success_text">распечатайте и сохраняйте билеты до даты поездки</span>
          </li>
          <li className="success_item">
            <span className="success_icon success_icon-conductor"></span>
            <span className="success_text">предьявите распечатанные билеты при посадке</span>
          </li>
        </ul>

        <div className="success-info">
          <h2 className="success-info_title">{payer.first_name + " " + payer.patronymic + "!"}</h2>
          <p>
            Ваш заказ успешно оформлен. <br/>
            В ближайшее время с вами свяжется наш оператор для подтверждения.
          </p>
          <h3>Благодарим за оказанное доверие и желаем приятного путешествия!</h3>
        </div>

        <div className="rating">
          <span className="rating_text">Оценить сервис</span>
          <Stars />
        </div>
      </div>
    </div>
  )
}

export { SuccessPage }


const Stars = () => {
  const starList = (new Array(5)).fill('');
  const [rating, setRating] = useState(-1);
  const handleClick = event => {
    setRating(event.currentTarget.dataset.id);
  };
  return (
    <div className="rating_stars">
      {starList.map((el, i) => <Star index={i} rating={rating} onClick={handleClick}/>)}
    </div>
  )
}

const Star = ({index, rating, onClick}) => {
  const fill = index > rating ? "none" : "#FFFFFF";
  return (
    <svg data-id={index} onClick={onClick} width="36" height="34" viewBox="0 0 56 44" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" stroke-width="2"/>
    </svg>
  )
}