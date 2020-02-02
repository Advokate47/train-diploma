import React from 'react'


const TrainScheduleBack = ({info, showTravelTime}) => {
  const travelTimeHours = Math.floor(info.duration  / 60 / 60);
  const travelTimeMinutes = Math.floor((info.duration / 60) % 60);
  
  return (
    <div className="train-schedule">
        <div className="train-schedule_wayback">
          <div className="train-schedule_from">
            <h4 className="train-schedule_time">{(new Date(info.from.datetime * 1000)).toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</h4>
            <div className="train-schedule_city">{info.from.city.name}</div>
            <div className="train-schedule_station">{info.from.railway_station_name}</div>
          </div>
          <div className="train-schedule_travel-arrow">
            {showTravelTime ? <span>{travelTimeHours} ч {travelTimeMinutes} мин</span> : null}
            <i className="material-icons">arrow_back</i>
          </div>
          <div className="train-schedule_to">
            <h4 className="train-schedule_time">{(new Date(info.to.datetime * 1000)).toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</h4>
            <div className="train-schedule_city">{info.to.city.name}</div>
            <div className="train-schedule_station">{info.to.railway_station_name}</div>
          </div>
        </div>
      </div>

  )
}

export {TrainScheduleBack}