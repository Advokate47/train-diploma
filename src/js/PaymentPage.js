import React, { useState } from 'react';
import { TripDetails } from './TripDetails';
import MaskedInput from './MaskedInput';
import { Link } from 'react-router-dom';

const PaymentPage = (props) => {
  const passengers = JSON.parse(sessionStorage.passengers);
  const price = JSON.parse(sessionStorage.totalPrice);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const handleInput = event => {
    const value = event.target.value;
    if (value.match(/[^А-Яа-яЁё]/g)) {
      return;
    }
    switch(event.target.name) {
      case "last-name":
        setLastName(value);
        break;
      case "first-name":
        setFirstName(value);
        break;
      case "patronymic": 
        setPatronymic(value);
        break;
      default: 
        return;
    }
  }

  const handleEmail = event => {
    const value = event.target.value;
    if (value.match(/[^a-zA-Z0-9,_,-,@,.]/)) {
      return;
    }
    setEmail(value);
  }

  const handlePayment = event => {
    setPaymentMethod(event.currentTarget.id);
  }

  
  const isEmailValid = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,10}$/i.test(email);
  const isPhoneIncomplete = /_/.test(phone);
  const isNameComplete = firstName && lastName && patronymic;
  
  return (
    <div className="columns">
      <div className="col-left">
        <TripDetails props={props} passengers={passengers} price={price}/>
      </div>
      <div className="col-right">
      <div className="order">
        <form className="order-details" id="order-details">
          <div className="order_title">Персональные данные плательщика</div>
            <fieldset className="order_payer">
              <div className="personal-details">
                  <label htmlFor="last-name">Фамилия
                    <input required value={lastName} onChange={handleInput} type="text" name="last-name" className="passengers-card_last-name" id=""/>
                  </label>
                  <label htmlFor="first-name">Имя
                    <input required value={firstName} onChange={handleInput} type="text" name="first-name" className="passengers-card_name" id=""/>
                  </label>
                  <label htmlFor="patronymic">Отчество
                    <input required value={patronymic} onChange={handleInput} type="text" name="patronymic" className="passengers-card_patronymic-name" id=""/>
                  </label>
              </div>
              <div className="contact-details">
                  <label htmlFor="">Контактный телефон
                    <MaskedInput  value={phone} onChange={value => setPhone(value)} prefix="+7" inputmask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}/>
                    {isPhoneIncomplete ? <div style={{color: "red"}}>Введите 10 цифр номера телефона без +7 и пробелов в формате 987 654 3210</div> : ""}
                  </label>
                  <label htmlFor="">Email
                    <input value={email} onChange={handleEmail} type="email" name="email" placeholder="email@mail.ru" className="passengers-card_email" style={{textTransform: "none"}}/>
                    {isEmailValid ? "" : <div style={{color: "red"}}>Введите корректный email в формате email@mail.ru</div>}
                  </label>
              </div>
            </fieldset>
 
            <div className="order_title">Способ оплаты</div>
            
            <fieldset className="payment-methods">
              <div>
                <input onChange={handlePayment} defaultChecked type="radio" name="payment-method" id="credit-card"/>
                <label htmlFor="credit-card">Банковской картой
                </label>

                <input onChange={handlePayment} type="radio" name="payment-method" id="paypal"/>
                <label htmlFor="paypal">PayPal
                </label>

                <input onChange={handlePayment} type="radio" name="payment-method" id="qiwi-wallet"/>
                <label htmlFor="qiwi-wallet">Visa QIWI Wallet
                </label>
              </div>
            </fieldset>
        </form>

      </div>
        <Link to={{ pathname: '/confirmation', paymentMethod: paymentMethod}}>
          <button onClick={() => sessionStorage.payer = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            patronymic: patronymic,
            phone: phone,
            email: email,
            payment_method: "online"
            })} className="purchase-button" disabled={!(isEmailValid && !isPhoneIncomplete && isNameComplete)}>Купить билеты</button>
        </Link>
      </div>
    </div>
    
  )
}

export {PaymentPage}