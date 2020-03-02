import React, { Fragment, useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { CurrentTrain } from './CurrentTrain';
import { CurrentTrainBack } from './CurrentTrainBack';
import { TicketsNumber } from './TicketsNumber'
import { TrainType } from './TrainType';
import { TrainScheme } from './TrainScheme';
import {ApiServiceContext} from './context'
import { DetailsTrip } from './DetailsTrip';
import { LastTickets } from './LastTickets'
import { FiltersForm } from './FiltersForm';

const SeatsPage = (props) => {
  const api = useContext(ApiServiceContext);
  const [data, setData] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentType, setCurrentType] = useState('');
  const [currentCoach, setCurrentCoach] = useState('');
  const [adultSeats, setAdultSeats] = useState(1);
  const [childrenSeats, setChildrenSeats] = useState(0);


  const [dataBack, setDataBack] = useState([]);
  const [coachesBack, setCoachesBack] = useState([]);
  const [chosenBack, setChosenBack] = useState([]);
  const [totalPriceBack, setTotalPriceBack] = useState(0);
  const [currentTypeBack, setCurrentTypeBack] = useState('');
  const [currentCoachBack, setCurrentCoachBack] = useState('');
  const [adultSeatsBack, setAdultSeatsBack] = useState(1);
  const [childrenSeatsBack, setChildrenSeatsBack] = useState(0);

  const currentTrain = props.currentTrain[0] || JSON.parse(sessionStorage.currentTrain[0]);
  const id = currentTrain['_id'];
  const currentTrainBack = props.currentTrain[1] || JSON.parse(sessionStorage.currentTrain[1]);
  const idBack = currentTrainBack['_id'];
  
  useEffect(() => {
      api.getSeats(id)
        .then(response => {
          setData(response);
          setCurrentType(response[0].coach.class_type);
          setCoaches(response.filter(el => el.coach.class_type === response[0].coach.class_type));
          setCurrentCoach(response[0])
          sessionStorage.trainId = id;
        })

        api.getSeats(idBack)
        .then(response => {
          setDataBack(response);
          setCurrentTypeBack(response[0].coach.class_type);
          setCoachesBack(response.filter(el => el.coach.class_type === response[0].coach.class_type));
          setCurrentCoachBack(response[0])
          sessionStorage.trainIdBack = idBack;
        })
    
  }, [id, idBack]);

  return currentType &&  data ? (
    // <div>

       <section className="columns">
        <div className="col-left">
          <DetailsTrip {...props} />
          <LastTickets />
        </div>
        <div className="col-right">
          <div className="seats-choice" >
            <div className="change-train change-train-to">
              <span className="change-train_arrow">
                  <i className="material-icons">arrow_forward</i>
              </span>
              <Link to="/search" className="change-train_button">Выбрать другой поезд</Link>
            </div>



            <CurrentTrain info={currentTrain} />
            <TicketsNumber 
              passengers={{adults: adultSeats, children: childrenSeats}}
              setAdultSeats={seats => setAdultSeats(seats)}
              setChildrenSeats={seats => setChildrenSeats(seats)}
              />
            <TrainType 
              coaches={data.filter(el => el.coach.class_type === currentType)} 
              currentType={currentType} 
              currentCoach={currentCoach}
              setCurrentType={type => {
                setCurrentType(type);
                setChosen([]);
                setTotalPrice(0);
              }}
              setCurrentCoach={coach => setCurrentCoach(coach)}/>
            {currentCoach && <TrainScheme 
              passengers={adultSeats + childrenSeats}
              type={currentType} 
              coach={currentCoach}
              topPrice={currentCoach.coach.top_price}
              bottomPrice={currentCoach.coach.bottom_price}
              sidePrice={currentCoach.coach.side_price}
              chosen={chosen}
              setChosen={seat => {
                const chosenSeats = chosen.slice();
                chosenSeats.push(seat);
                setChosen(chosenSeats);
              }}
              cancelChosen={seat => {
                const chosenSeats = chosen.slice();
                const seatToCancel = chosenSeats.findIndex(el => el.index === seat.index);
                chosenSeats.splice(seatToCancel, 1);
                setChosen(chosenSeats);
              }}
              setTotalPrice={price => setTotalPrice(totalPrice + price)}
              />}
            <div className="total-price">{parseInt(totalPrice).toLocaleString()}</div>
          </div>

          {props.currentTrain[0]._id !== props.currentTrain[1]._id ? (
          <div className="seats-choice" >
            <div className="change-train change-train-from">
              <span className="change-train_arrow">
                  <i className="material-icons">arrow_back</i>
              </span>
              <Link to="/search" className="change-train_button">Выбрать другой поезд</Link>
            </div>



            <CurrentTrainBack info={currentTrainBack} />
            <TicketsNumber 
              passengers={{adults: adultSeats, children: childrenSeats}}
              setAdultSeats={seats => setAdultSeats(seats)}
              setChildrenSeats={seats => setChildrenSeats(seats)}
              />
            <TrainType 
              coaches={dataBack.filter(el => el.coach.class_type === currentTypeBack)} 
              currentType={currentTypeBack} 
              currentCoach={currentCoachBack}
              setCurrentType={type => {
                setCurrentTypeBack(type);
                setChosenBack([]);
                setTotalPriceBack(0);
              }}
              setCurrentCoach={coach => setCurrentCoachBack(coach)}/>
            {currentCoachBack && <TrainScheme 
              passengers={adultSeats + childrenSeats}
              type={currentTypeBack} 
              coach={currentCoachBack}
              topPrice={currentCoachBack.coach.top_price}
              bottomPrice={currentCoachBack.coach.bottom_price}
              sidePrice={currentCoachBack.coach.side_price}
              chosen={chosenBack}
              setChosen={seat => {
                const chosenSeats = chosenBack.slice();
                chosenSeats.push(seat);
                setChosenBack(chosenSeats);
              }}
              cancelChosen={seat => {
                const chosenSeats = chosenBack.slice();
                const seatToCancel = chosenSeats.findIndex(el => el.index === seat.index);
                chosenSeats.splice(seatToCancel, 1);
                setChosenBack(chosenSeats);
              }}
              setTotalPrice={price => setTotalPriceBack(totalPriceBack + price)}
              />}
            <div className="total-price">{parseInt(totalPriceBack).toLocaleString()}</div>
          </div>) : false}

          <div className="to-order-button-container">
            <Link to={{
              pathname: '/passengers', 
              passengers: {adults: adultSeats, children: childrenSeats},
              passengersBack: {adults: adultSeats, children: childrenSeats},
              seats: chosen,
              seatsBack: chosenBack,
              price: totalPrice,
              priceBack: totalPriceBack
              }}>
                <button className="to-order-button" 
                  disabled={chosen.length === 0 || adultSeats + childrenSeats !== chosen.length}>Далее</button>
            </Link>
          </div>
        {/* </div> */}
      </div>
    </section>
    ) : <div className="loader"><div className="loader_image"></div></div>
  
}

export {SeatsPage}