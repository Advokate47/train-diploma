import React, { useEffect, useRef, useState, useContext } from 'react';
import RangeSlider from 'react-ion-slider';
import Switches from './CustomSwitch';
import {ApiServiceContext} from './context';
import { Datepicker } from './Datepicker';
import { Link } from 'react-router-dom';


const FiltersForm = (props) => {
  const api = useContext(ApiServiceContext);
  const params = props.searchParams || JSON.parse(sessionStorage.searchParams);
  
  const [cost, setCost] = useState({from: 500, to: 7000});
  const [departureTime, setDepartureTime] = useState({from: 0, to: 24});
  const [arrivalTime, setArrivalTime] = useState({from: 0, to: 24});
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(true);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [express, setExpress] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dateBack, setDateBack] = useState(null);

  const [fromName, setFromName] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).from.name : '');
  const [fromId, setFromId] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).from.id : '');
  const [toName, setToName] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).to.name : '');
  const [toId, setToId] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).to.id : '');

  const [forth, setForth] = useState(true);
  const [back, setBack] = useState(true);

  params.filters = `price_from=${cost.from}&price_to=${cost.to}${first ? '&have_first_className=true' : ''}${second ? '&have_second_className=true' : ''}${third ? '&have_third_className=true' : ''}${fourth ? '&have_fourth_className=true' : ''}${wifi ? '&have_wifi=true' : ''}${express ? '&have_express=true' : ''}`;


  const addFilters = event => {
    event.preventDefault();
    props.update(params.filters)
    props.setSearchParams({
      from: {
        name: fromName,
        id: fromId
      },
      to: {
        name: toName,
        id: toId 
      },
      fromReverse: {
        name: toName,
        id: toId
      },
      toReverse: {
        name: fromName,
        id: fromId
      },
      // date: date.toISOString().substr(0, 10),
      // dateBack: dateBack && dateBack.toISOString().substr(0, 10)
      date: date,
      dateBack: dateBack
    });
  }

  const resetFilters = event => {
    event.preventDefault();

    setCost({from: 500, to: 7000});
    setDepartureTime({from: 0, to: 24});
    setArrivalTime({from: 0, to: 24});
    params.filters = '';
    window.location.href = '/search';
  }
let formref;
  const handleDropdownFilter = () => {
    formref.classList.toggle('minimized');
  }

  const handleSortByForth = event => {
    const list = event.currentTarget;
    list.classList.toggle('time-picker_roll-less');
    setForth(!forth)
  }
  const handleSortByBack = event => {
    const list = event.currentTarget;
    // const item = event.target;
    list.classList.toggle('time-picker_roll-less');
    setBack(!back)
  }

  return (
    <div className="filters-container">
      <div onClick={handleDropdownFilter} className="filter-cog">
            <i className="fas fa-cog"></i>
            <i className="far fa-window-close hidden"></i>
          </div>
    <form ref={el => formref = el} action="" className="search-form minimized">
         <fieldset onClick={handleDropdownFilter} className="search-form__set" >

        <div>
          <h2>Дата поездки</h2>
          <Datepicker 
                    style={{width: "285px", height: "52px"}} 
                    onDateSelect={date => {
                      let newDate = Date.parse(date);
                      sessionStorage.travelDate = newDate;
                      setDate(date)}}
                    defaultDate={props.searchParams.date}
                    />
        </div>
        <div>
          <h2>Дата возвращения</h2>
          <Datepicker 
                    style={{width: "285px", height: "52px"}} 
                    onDateSelect={date => {
                      sessionStorage.travelDateBack = date;
                      setDateBack(date)}}
                    defaultDate={props.searchParams.dateBack}
                    />
        </div>
         </fieldset>
         <fieldset className="seat-types">
           <Switches 
            first={first}
            second={second}
            third={third}
            fourth={fourth}
            express={express}
            wifi={wifi}
            setFirst={() => setFirst(!first)}
            setSecond={() => setSecond(!second)}
            setThird={() => setThird(!third)}
            setFourth={() => setFourth(!fourth)}
            setExpress={() => setExpress(!express)}
            setWifi={() => setWifi(!wifi)}
          />
         </fieldset>
         <fieldset className="cost-picker" >
           <label className="trainpicker_label">Стоимость</label>
           <RangeSlider 
              onChange={data => setCost({from: data.from, to: data.to})}
              type="double"
              grid={false}
              from={cost.from}
              to={cost.to}
              min={500}
              max={7000}
              hide_min_max={true}
              skin="material"/>
         </fieldset>

         <div>
          
          
          <fieldset className="time-picker">
            <div className="time-picker_titel">
              <div className="time-picker_icon">
              <span ><i className="material-icons">arrow_forward</i></span>
              </div>
              <h2>Туда</h2>
              <div onClick={handleSortByForth} className="time-picker_roll-more time-picker_roll-less">
                
              </div>
            </div>
              {forth ? (<div>
              <label className="range-picker_label" htmlFor="">Время отбытия</label>
              <RangeSlider 
                onChange={data => setDepartureTime({from: data.from, to: data.to})}
                type="double"
                grid={false}
                from={departureTime.from}
                to={departureTime.to}
                min={0}
                max={24}
                hide_min_max={ false}
                skin="material"
                prettify={n => n + ':00'}/>

              <label className="range-picker_label" htmlFor="">Время прибытия</label>
              <RangeSlider 
                onChange={data => setArrivalTime({from: data.from, to: data.to})}
                type="double"
                grid={false}
                from={arrivalTime.from}
                to={arrivalTime.to}
                min={0}
                max={24}
                hide_min_max={ false}
                skin="material"
                prettify={n => n + ':00'}/></div>) : false}

          </fieldset>
         </div>

         <div>
          
          <fieldset className="time-picker">
              <div className="time-picker_titel">
                  <div className="time-picker_icon">
                  <span ><i className="material-icons">arrow_back</i></span>
                  </div>
                  <h2>Обратно</h2>
                  <div onClick={handleSortByBack} className="time-picker_roll-more time-picker_roll-less"></div>
                </div>
              {back ? (<div>
              <label className="range-picker_label" htmlFor="">Время отбытия</label>
              <RangeSlider 
                onChange={data => setDepartureTime({from: data.from, to: data.to})}
                type="double"
                grid={false}
                from={departureTime.from}
                to={departureTime.to}
                min={0}
                max={24}
                hide_min_max={ false}
                skin="material"
                prettify={n => n + ':00'}/>

              <label className="range-picker_label" htmlFor="">Время прибытия</label>
              <RangeSlider 
                onChange={data => setArrivalTime({from: data.from, to: data.to})}
                type="double"
                grid={false}
                from={arrivalTime.from}
                to={arrivalTime.to}
                min={0}
                max={24}
                hide_min_max={ false}
                skin="material"
                prettify={n => n + ':00'}/></div>) : false}

          </fieldset>
         </div>
         
         <fieldset className="filters__buttons ">
            {/* <button>
            <Link to='/search' onClick={addFilters} className="filters__button">Применить</Link>
            </button> */}
            <button onClick={addFilters} className="filters__button">Применить</button>
         </fieldset>
       </form>
      </div>
  )
}

export {FiltersForm}