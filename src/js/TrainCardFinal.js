import React from 'react';
import {Link} from 'react-router-dom';
import { TrainSchedule } from './TrainSchedule';
import { TrainScheduleBack } from './TrainScheduleBack';


const TrainCardFinal = (props) => {
  
  const {departure} = props;
  const trainsBack = props.trainsBack.departure  || props.trainsBack;
  const ArrCurrentTrains = [];
  ArrCurrentTrains.push(departure, trainsBack)

  return (
    <div className="train">
      <div className="train-info">
        <div className="train-icon"></div>
        <h4 className="train-info_number">{departure.train.name}</h4>
        <div className="train-info_destination">
          <div className="train-info_name">{departure.from.city.name}</div>
          <div className="train-info_name">{departure.to.city.name}</div>
        </div>
      </div>
      <div className="train-schedule-all">
      <TrainSchedule info={departure} showTravelTime />
      <TrainScheduleBack info={trainsBack} showTravelTime />
        </div>  
      

         <div className="train-seats">
            <ul className="train-seats_list">
              {departure.have_fourth_class ?  
                <li >
                  <span className="train-seats_type">Сидячий</span>
                  <span className="train-seats_amount">{departure.available_seats_info.fourth}</span>
                  <span className="train-seats_price">{departure.price_info.fourth.top_price}</span>
                </li> :
                null
              }
              {departure.have_second_class ?  
                <li >
                  <span className="train-seats_type">Плацкарт</span>
                  <span className="train-seats_amount">{departure.available_seats_info.second}</span>
                  <span className="train-seats_price">{departure.price_info.second.top_price}</span>
                </li> :
                null
              }
              {departure.have_third_class ?  
                <li >
                  <span className="train-seats_type">Купе</span>
                  <span className="train-seats_amount">{departure.available_seats_info.third}</span>
                  <span className="train-seats_price">{departure.price_info.third.top_price}</span>
                </li> :
                null
              }
              {departure.have_first_class ?  
                <li >
                  <span className="train-seats_type">Люкс</span>
                  <span className="train-seats_amount">{departure.available_seats_info.first}</span>
                  <span className="train-seats_price">{departure.price_info.first.top_price}</span>
                </li> :
                null
              }
              </ul>

              <ul className="train-seats_list">
              {trainsBack.have_fourth_class ?  
                <li >
                  <span className="train-seats_type">Сидячий</span>
                  <span className="train-seats_amount">{trainsBack.available_seats_info.fourth}</span>
                  <span className="train-seats_price">{trainsBack.price_info.fourth.top_price}</span>
                </li> :
                null
              }
              {trainsBack.have_second_class ?  
                <li >
                  <span className="train-seats_type">Плацкарт</span>
                  <span className="train-seats_amount">{trainsBack.available_seats_info.second}</span>
                  <span className="train-seats_price">{trainsBack.price_info.second.top_price}</span>
                </li> :
                null
              }
              {trainsBack.have_third_class ?  
                <li >
                  <span className="train-seats_type">Купе</span>
                  <span className="train-seats_amount">{trainsBack.available_seats_info.third}</span>
                  <span className="train-seats_price">{trainsBack.price_info.third.top_price}</span>
                </li> :
                null
              }
              {trainsBack.have_first_class ?  
                <li >
                  <span className="train-seats_type">Люкс</span>
                  <span className="train-seats_amount">{trainsBack.available_seats_info.first}</span>
                  <span className="train-seats_price">{trainsBack.price_info.first.top_price}</span>
                </li> :
                null
              }
              </ul>

            <div>
              <div className="train-seats_icons">
                {departure.have_wifi ? <span title="Есть wi-fi"><i className="fas fa-wifi"></i></span> : null}
                {departure.have_air_conditioning ? <span title="Есть кондиционер"><i className="far fa-snowflake"></i></span> : null}
                {departure.is_express ? <span title="Экспресс"><span className="rocket"></span></span> : null}
              </div>
              <div className="train-seats_button-container">
                <Link className="train-seats_button train-seats_button-not-color" to='/search'>
                 Изменить</Link>
              </div>
            </div>
       </div>
      </div>
      
  )
}

export {TrainCardFinal}