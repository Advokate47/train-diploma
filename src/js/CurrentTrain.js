import React from 'react';
import { TrainSchedule } from './TrainSchedule';

const CurrentTrain = ({info}) => {
  const travelTimeHours = Math.floor(info.duration  / 60 / 60);
  const travelTimeMinutes = Math.floor((info.duration / 60) % 60);

  return (
    <div className="current-train">
      <div className="train-icon"></div>
      <div className="train-info">
        <h4 className="train-info_number">{info.train.name}</h4>
        <div>
          <div className="train-info_name">{info.from.city.name}</div>
          <div className="train-info_name">{info.to.city.name}</div>
        </div>
        </div>

      <TrainSchedule info={info} showTravelTime={false}/>
      
     <div className="current-train_travel-time">
        <div className="travel-time_icon"></div>
        <div className="travel-time_text">
          <div className="hours">{travelTimeHours} ч</div>
          <div className="hours">{travelTimeMinutes} мин</div>
        </div>
     </div>
    </div>
  )
}

export {CurrentTrain};