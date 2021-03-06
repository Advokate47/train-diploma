import React, { useEffect, useRef, useState, useContext } from 'react';
import { CurrentTrain } from './CurrentTrain';

const TripDetails = (props) => {
  const currentTrain = props.props.currentTrain[0] || JSON.parse(sessionStorage.currentTrain[0]);
  const id = currentTrain['_id'];
  const currentTrainBack = props.props.currentTrain[1] || JSON.parse(sessionStorage.currentTrain[1]);
  const idBack = currentTrainBack['_id'];

  const trainBack = id !== idBack;

  const [forth, setForth] = useState(true);
  const [back, setBack] = useState(true);

  const data = currentTrain;
  const travelDate = new Date(JSON.parse(sessionStorage.searchParams).date);
  const dateBack = currentTrainBack;
  const travelDateBack = new Date(JSON.parse(sessionStorage.searchParams).dateBack);
  const arrivalDate = new Date(travelDate);
  arrivalDate.setHours(arrivalDate.getHours() + (new Date(data.duration * 1000)).getHours());

  const handleSortByForth = event => {
    const list = event.currentTarget;
    list.classList.toggle('time-picker_roll-less');
    setForth(!forth)
  }
  const handleSortByBack = event => {
    const list = event.currentTarget;
    list.classList.toggle('time-picker_roll-less');
    setBack(!back)
  }

  return (
    <div className="trip-details">
      <h2>Детали поездки</h2>
      <div className="trip-details_to">

      <div className="trip-details_title">
          <h3  className="trainpicker_label trainpicker_label-to">Туда</h3>
          <div className="trainpicker_label-date">
            <span>{travelDate.toLocaleDateString()}</span>
          </div>
          <div onClick={handleSortByForth} className="time-picker_roll-more time-picker_roll-less">
              </div>
      </div>

      {forth ? (<div>

        <div className="trip-details_date"></div>

        <div className="train-details">
          <div>
            {/* <span>Дата</span> */}
            <span>№ Поезда</span>
            <span>Название</span>
          </div>
          <div>
            <span><b>{data.train.name}</b></span>
            <span><b>{data.from.city.name}<br/>{data.to.city.name}</b></span>
          </div>
        </div>
              
        <div className="time-details">
          <div>
            <span className="time-details_time">{(new Date(data.from.datetime * 1000)).toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</span>
            <span className="time-details_date">{travelDate.toLocaleDateString()}</span>
          </div>
          <div className="time-details_arrow">{Math.floor(data.duration  / 60 / 60) + ":" +  Math.floor((data.duration / 60) % 60) }</div>
          <div>
            <span className="time-details_time">{(new Date(data.to.datetime * 1000)).toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</span>
            <span className="time-details_date">{arrivalDate.toLocaleDateString()}</span>
          </div>
        </div>
        <div className="direction-details">
          <div>
            <span className="direction-details_city">{data.from.city.name}</span>
            <br/>
            <span className="direction-details_station">{data.from.railway_station_name}</span>
          </div>
          <div>
            <span className="direction-details_city">{data.to.city.name}</span>
            <br/>
            <span className="direction-details_station">{data.to.railway_station_name}</span>
          </div>
        </div>
      </div>) : false}





      
  </div>


  {trainBack ? (
  <div className="trip-details_back">
      <div className="trip-details_title">
          <h3  className="trainpicker_label trainpicker_label-to">Обратно</h3>
          <div className="trainpicker_label-date">
            <span>{travelDateBack.toLocaleDateString()}</span>
          </div>
          <div onClick={handleSortByBack} className="time-picker_roll-more time-picker_roll-less">
              </div>
      </div>

      {back ? (<div>

        <div className="trip-details_date"></div>

        <div className="train-details">
          <div>
            <span>№ Поезда</span>
            <span>Название</span>
          </div>
          <div>
            <span><b>{dateBack.train.name}</b></span>
            <span><b>{dateBack.from.city.name}<br/>{dateBack.to.city.name}</b></span>
          </div>
        </div>
              
        <div className="time-details">
          <div>
            <span className="time-details_time">{(new Date(dateBack.from.datetime * 1000)).toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</span>
            <span className="time-details_date">{travelDateBack.toLocaleDateString()}</span>
          </div>
          <div className="time-details_arrow time-details_arrow-back">{Math.floor(dateBack.duration  / 60 / 60) + ":" +  Math.floor((dateBack.duration / 60) % 60) }</div>
          <div>
            <span className="time-details_time">{(new Date(dateBack.to.datetime * 1000)).toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</span>
            <span className="time-details_date">{arrivalDate.toLocaleDateString()}</span>
          </div>
        </div>
        <div className="direction-details">
          
          <div>
            <span className="direction-details_city">{dateBack.to.city.name}</span>
            <br/>
            <span className="direction-details_station">{dateBack.to.railway_station_name}</span>
          </div>
          <div>
            <span className="direction-details_city">{dateBack.from.city.name}</span>
            <br/>
            <span className="direction-details_station">{dateBack.from.railway_station_name}</span>
          </div>
        </div>
      </div>) : false}</div>
    ) : false}
  
    <div className="trip-details_passengers">
      <div className="trip-details_title ">
        <h3  className="trainpicker_label trainpicker_label-passenger">Пассажиры</h3>
      </div>
      <div className="train-details passengers-details ">
        <div>{"Взрослых: "}<b>{props.passengers.adults}</b></div>
        <div>{"Детей: "}<b>{props.passengers.children}</b></div>
        </div>
    </div>

      <div className="trip-details_total">
        <span>ИТОГ</span>
        <span className="">{parseInt(props.price).toLocaleString()}</span>
      </div>
    </div> 
  )
}

export {TripDetails}