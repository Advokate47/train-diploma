import React, { useState } from 'react'

const TicketsNumber = ({passengers, setAdultSeats, setChildrenSeats, setChildrenWithoutSeats}) => {
  const [totalPassengers, setTotalPassengers] = useState(passengers.adults + passengers.children);
  const handleChange = event => {
    const type = event.currentTarget.dataset.name;

    const op = (value) => {
      if (event.currentTarget.dataset.op === "inc") {
        return value + 1;
      }
      return value - 1;
    } 

    switch (type) {
      case "children":
        if (totalPassengers <= 4) {
          setChildrenSeats(op(passengers.children));
        }
        break;
      case "childrenwithoutSeats":
          if (totalPassengers <= 4) {
        setChildrenWithoutSeats(op(passengers.childrenWithoutSeats));
          }
        break;
      case "adults":
        setAdultSeats(op(passengers.adults));
        break;
      default:
        return;
    }
  }
  return (
    <div className="tickets-number">
      <h2>Количество билетов</h2>
      <form className="tickets-number_boxes">
        <div className="tickets-number_box">
          <div className="tickets-number_count">
            <div className="tickets-number_title">Взрослых:</div> 
            <span className="tickets-number_control dec" data-op="dec" data-name="adults" onClick={handleChange}>–</span>
            <span className="tickets-number_counter">{passengers.adults}</span>
            <span className="tickets-number_control inc" data-op="inc" data-name="adults" onClick={handleChange}>+</span>
          </div>
          <div className="tickets-number_hint">
            {4 - passengers.adults - passengers.children > 0 ? 
            `Можно добавить еще ${4 - passengers.adults - passengers.children} пассажиров` :
            "В одном заказе можно оформить не больше 4 билетов"
            }
            </div>
        </div>

        <div className="tickets-number_box">
          <div className="tickets-number_count">
            <div className="tickets-number_title">Детских: </div>
            <span className="tickets-number_control dec" data-op="dec" data-name="children" onClick={handleChange}>–</span>
            <span className="tickets-number_counter">{passengers.children}</span>
            <span className="tickets-number_control inc" data-op="inc" data-name="children" onClick={handleChange}>+</span>
          </div>
          <div className="tickets-number_hint">
            {4 - passengers.adults - passengers.children > 0 ? 
              `Можно добавить еще ${4 - passengers.adults - passengers.children} детей до 10 лет` :
              "4 билета уже выбрано"
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export {TicketsNumber}