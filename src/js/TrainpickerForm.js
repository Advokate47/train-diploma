import React, { useContext, useState, useEffect } from 'react';
import { TypeaheadInput } from './TypeaheadInput'
import { ApiServiceContext } from './context';
import { Link } from 'react-router-dom';
import { Datepicker } from './Datepicker';

const MainSearchForm = (props) => {
  // console.log(props)
  const api = useContext(ApiServiceContext);
  const {horizontal} = props;
  const [fromName, setFromName] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).from.name : '');
  const [fromId, setFromId] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).from.id : '');
  const [toName, setToName] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).to.name : '');
  const [toId, setToId] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).to.id : '');
  const [date, setDate] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).date : new Date());
  const [dateBack, setDateBack] = useState(props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).date : null);

  const [fromNameNew, setFromNameNew] = useState(null)

  const handleSwap = () => {
    // sessionStorage.travelFromName = fromName
    // sessionStorage.travelToName = toName
    
    setFromName(toName);
    setToName(fromName);
    setDateBack(date);
    setFromNameNew(toName)
    sessionStorage.travelFromNameSwap = fromName
    sessionStorage.travelToNameSwap = toName

    

    // console.log(toName)
    // console.log(dateBack)
    
  }

  

  const handleSubmit = () => {
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
    if (props.location.pathname !== '/') {
      window.scrollTo({
        top: document.querySelector('.col-right').offsetTop,
        behavior: 'smooth'
      })
    }
  }

  // useEffect(() => {
  //   console.log('123')
    
  // }, [fromName, toName]);
  // useEffect(() => {
    
  // }, []);

    return (
      <form  className={`trainpicker ${horizontal ? 'trainpicker-horizontal' : ''}`}>
        {horizontal ? null : <div><h2 className="trainpicker__header">Укажите направление и дату поездки:</h2></div>}
            <div className={`trainpicker__content ${horizontal ? 'trainpicker__content-horizontal' : ''} `}>
              <label className="trainpicker_label">Направление</label>
              <div className="trainpicker__inputs">
                <TypeaheadInput 
                  
                  placeholder="Откуда"
                  onSelect={city => {
                  setFromName(city.name);
                  setFromId(city.id)
                  }}
                  value={fromName}/>
                <div onClick={handleSwap} className="trainpicker__reverse" type="checkbox" name="reverse" id="reverse">
                  <i className="fas pic_reverse"></i>
                </div>
                <TypeaheadInput 
                
                  placeholder="Куда"
                  onSelect={city => {
                  setToName(city.name);
                  setToId(city.id)
                  }}
                  value={toName}/>
              </div>
            </div>
            <div className={`trainpicker__content ${horizontal ? 'trainpicker__content-horizontal' : ''} `}>
              <label className="trainpicker_label">Дата</label>
              <div className='trainpicker_data'>
                <div className="trainpicker__inputs" >
                  <Datepicker 
                    style={{width: "285px", height: "52px"}} 
                    onDateSelect={date => {
                      sessionStorage.travelDate = date;
                      setDate(date)}}
                    defaultDate={props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).date : new Date()}
                    />
                </div>

                <div className="trainpicker__inputs" >
                  <Datepicker 
                    style={{width: "285px", height: "52px"}} 
                    onDateSelect={date => {
                      sessionStorage.travelDate = dateBack;
                      setDateBack(date)}}
                    defaultDate={props.location.pathname !== '/' ? JSON.parse(sessionStorage.searchParams).dateBack : null}
                    />
                </div>
              </div>
              
            </div>

          
            
            <button onClick={e => e.preventDefault()} type="submit" disabled={!(fromName && toName)} className={`trainpicker__button ${horizontal ? 'trainpicker__button-horizontal' : ''} `}>
              {fromName && toName ? 
                <Link to='/search'
                  onClick={handleSubmit}>Найти билеты</Link> :
                "Найти билеты" }
            </button>
            
          </form>
    )
}

const TrainpickerForm = (props) => {
  const path = props.location.pathname;
  if (path === '/success') {
    return (
      <section className="main-search main-search-success"></section>
    )
  }
  if (path !== '/') {
    return (
      <section className="main-search">
        <MainSearchForm horizontal {...props}/>
      </section>
      )
  }
  if (path === '/') { 
    return (
    <section className="main" id="main">
      <div className="overlay"></div>
      <div className="main__motto">
        <div className="motto">Вся жизнь - 
          <div className="motto-bold">путешествие!</div> 
        </div>
      </div>
      <div className="main__picker">
        <MainSearchForm {...props}/>
        
      </div>
    </section>
  )
  }
  }

export {TrainpickerForm}