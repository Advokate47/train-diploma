import React, { useContext, useState } from 'react';
import {ApiServiceContext} from './context';
import { Link } from 'react-router-dom';


const Footer = () => {
  const api = useContext(ApiServiceContext);
  const [email, setEmail] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const handleInput = event => {
    const value = event.target.value;
    if (value.match(/[^a-zA-Z0-9,_,-,@,.]/)) {
      return;
    }
    setEmail(value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/.test(email)) {
      api.subscribe(email);
      setShowHint(false);
      setShowThankYou(true);
      setEmail('');
    } else {
      setShowHint(true);
    }
  }



  return (
  <footer className="footer" id="footer">
      <div className="footer footer-main">
      <div className="contacts">
        <h3 className="footer__title">Свяжитесь с нами</h3>
        <ul className="contacts__list">
          <li className="contacts__item contacts__item-phone">8 (800) 000 00 00</li>
          <li className="contacts__item contacts__item-email">inbox@mail.ru</li>
          <li className="contacts__item contacts__item-skype">tu.train.tickets</li>
          <li className="contacts__item contacts__item-address"> г. Москва <br/> ул. Московская 27-35 <br/>  555 555</li>
        </ul>
      </div>
      <div className="subscription">
        <h3 className="footer__title">Подписка</h3>
        <form onSubmit={handleSubmit} action="" className="subscription-form">
          <label className="subscription-form__label">Будьте в курсе событий</label>
            <div><input value={email} onChange={handleInput} className="subscription-form__input" type="email" name="subscription" placeholder="e-mail"/>
            <div style={{visibility: showHint ? "visible" : "hidden" }} className="subscription_hint">Введите корректный email в формате email@mail.ru</div></div>
          <button className="subscription-form__button"  type="submit">Отправить</button>
            <div style={{visibility: showThankYou ? "visible" : "hidden"}} className="subscription_thankyou">Спасибо за подписку!</div>
        </form>
        <h3 className="footer__title">Подписывайтесь на нас</h3>
        <ul className="social">
          <li className="social__item">
            <a href="" className="social__link social__link-youtube">
            <i className="fab fa-youtube"></i>
              </a></li>
          <li className="social__item">
            <a href="" className="social__link social__link-linkedIn">
            <i className="fab fa-linkedin-in"></i>
              </a></li>
          <li className="social__item">
            <a href="" className="social__link social__link-googlePlus">
            <i className="fab fa-google-plus-g"></i>
              </a></li>
          <li className="social__item">
            <a href="" className="social__link social__link-facebook">
            <i className="fab fa-facebook-f"></i>
              </a></li>
          <li className="social__item">
            <a href="" className="social__link social__link-twitter">
            <i className="fab fa-twitter"></i>
              </a></li>
        </ul>
      </div>
    </div>
      <div className="footer-additional">
          <div className="footer__logo"><Link className="logo__link" to='/'>TrainBooking</Link></div>
          <div className="footer__home-arrow" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}></div>
          <div className="footer__copyright">2019 WEB</div>
      </div>
    </footer>
)
  }

export {Footer};