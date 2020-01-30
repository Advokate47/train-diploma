import React, { Fragment, useEffect } from 'react';
import { TrainpickerForm } from './TrainpickerForm';

const Homepage = (props) => {
  let about, features, reviews, footer;
  useEffect(() => {
    about = document.getElementById('about');
    features = document.getElementById('features');
    reviews = document.getElementById('reviews');
    footer = document.getElementById('footer');
    props.setHomepageRefs({
      about: about.offsetTop,
      features: features.offsetTop,
      reviews: reviews.offsetTop,
      footer: footer.offsetTop
    });
  }, [about]);

  window.onresize = () => {
    about = document.getElementById('about');
    features = document.getElementById('features');
    reviews = document.getElementById('reviews');
    footer = document.getElementById('footer');
    props.setHomepageRefs({
      about: about.offsetTop,
      features: features.offsetTop,
      reviews: reviews.offsetTop,
      footer: footer.offsetTop
    })
  }

   return (
     <Fragment>
      <About />
      <Features />
      <Reviews />
    </Fragment>
   )
}


const About = () => (
  <section className="about" id="about">
      <div className="about__title"><h2>О нас</h2></div>
      <div className="about__text">
        <div className="about__deco"></div>
        <div className="about__items">
          <p className="about__item">Мы рады видеть вас! Мы работаем для Вас с 2003 года. 15 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.</p>
          <p className="about__item">Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.</p>
          <p className="about__item about__item-bold">Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.</p>
        </div>
      </div>
    </section>
)

const Features = () => (
  <section className="features" id="features">
      <div className="description">
        <h2 className="description__title">Как это работает</h2>
        <button className="description__button">Узнать больше</button>
      </div>
      <div className="features__items">
        <div className="features__item features__item-monitor">Удобный заказ на сайте</div>
        <div className="features__item features__item-office">Нет необходимости ехать в офис</div>
        <div className="features__item features__item-globe">Огромный выбор направлений</div>
      </div>
    </section>
  )

const Reviews = () => (
  <section className="reviews" id="reviews">
      <h2 className="reviews__title">Отзывы</h2>
      <div className="reviews__slide">
          <div className="review">
          <img className="review__avatar" src="https://i.ibb.co/Z1RgQdZ/av-1.png" alt="av"/>
          <div className="review__content">
            <h4 className="review__author">Екатерина Вальнова</h4>
            <p className="review__text">
              Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.</p>
          </div>
      </div>
        <div className="review">
            <img className="review__avatar" src="https://i.ibb.co/47wFWkj/av-2.png" alt="av"/>
            <div className="review__content">
              <h4 className="review__author">Евгений Стрыкало</h4>
              <p className="review__text">
                СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.</p>
            </div>
        </div>
      </div>
      
      <div className="carousel">
        <div className="carousel__controls">
          <span className="carousel__item carousel__item-active"></span>
          <span className="carousel__item"></span>
          <span className="carousel__item"></span>
          <span className="carousel__item"></span>
          <span className="carousel__item"></span>
        </div>
        </div>
    </section>
)

export {Homepage}