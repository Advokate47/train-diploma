import React from 'react';

const LastTickets = () => {
  return (
    <div className="last-tickets">
         <h2 className="last-tickets_title">Последние билеты</h2>
         <div className="last-tickets_card">
           <div className="last-tickets_directions">
           <div className="last-tickets_from">
             <div className="train-schedule_city">Самара</div>
             <div className="train-schedule_station">Курский вокзал</div>
           </div>
           <div className="last-tickets_to">
              <div className="train-schedule_city">Москва</div>
              <div className="train-schedule_station">Рижский вокзал</div>
            </div>
          </div>
          <div className="last-tickets_info">
            <div className="last-tickets_labels">
              <span className="switches_label wi-fi"></span>
              <span className="switches_label express"></span>
              <span className="switches_label breakfast"></span>
            </div>
            <div className="last-tickets_price">
              <span>3 500</span>
            </div>
          </div>
         </div>
       </div>
  )
}

export {LastTickets}