import React, { useRef, useState, Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { TripDetails } from './TripDetails';
import MaskedInput from './MaskedInput';
import {Datepicker} from './Datepicker';

const PassengersPage = (props) => {
  
  if (props.location.passengers) {
    sessionStorage.passengers = JSON.stringify(props.location.passengers);
    sessionStorage.seats = JSON.stringify(props.location.seats);
    sessionStorage.price = props.location.price;
    sessionStorage.passengersBack = JSON.stringify(props.location.passengersBack);
    sessionStorage.seatsBack = JSON.stringify(props.location.seatsBack);
    sessionStorage.priceBack = props.location.priceBack;
  }

  const passengers = props.location.passengers || JSON.parse(sessionStorage.passengers);
  const price = props.location.price || JSON.parse(sessionStorage.price);
  const passengersBack = props.location.passengersBack || JSON.parse(sessionStorage.passengersBack);
  const priceBack = props.location.priceBack || JSON.parse(sessionStorage.priceBack);
  const totalPrice = price + (typeof(priceBack) === 'number' ? priceBack : 0);
  sessionStorage.totalPrice = JSON.stringify(totalPrice);
  
  const [valid, setValid] = useState([]);
  const [passengersList, setPassengersList] = useState([])

  const savePassengers = passenger => {
    const passengers = passengersList.slice();
    passengers.push(passenger);
    setPassengersList(passengers);
  }
  
  return (
    <div className="columns">
      <div className="col-left">
        <TripDetails props={props} passengers={passengers} price={totalPrice}/>
      </div>
      <div className="col-right">
        {(new Array(passengers.adults))
            .fill('')
            .map((p, i) => <PassengerCard 
                              passenger={i + 1} 
                              open={i > 0 ? false : true} 
                              adult 
                              setValid={(i) => setValid(i)} 
                              valid={valid}
                              setPassengers={(passenger) => savePassengers(passenger)}/>)}

        {(new Array(passengers.children))
              .fill('')
              .map((p, i) => <PassengerCard 
                              passenger={passengers.adults + 1 + i} 
                              open={false} 
                              child 
                              setValid={(i) => setValid(i)} 
                              valid={valid}
                              setPassengers={(passenger) => savePassengers(passenger)}/>)}

        <Link to='/payment' >
          <button disabled={valid.length !== passengers.adults + passengers.children}  onClick={() => sessionStorage.passengersList = JSON.stringify(passengersList)} className="to-order-button">Далее</button>
        </Link>
      </div>
    </div>
  )
}


const PassengerCard = ({open, passenger, child, adult, valid, setValid, setPassengers}) => {
  const [isOpen, setOpen] = useState(open);
  let formRef = useRef(null);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState('мужской');
  const [disabilities, setDisabilities] = useState(false);
  const [passport1, setPassport1] = useState('');
  const [passport2, setPassport2] = useState('');
  const [certificate, setCertificate] = useState('');
  const [isPassportChosen, setIsPassportChosen] = useState(adult);
 
  const handleInput = event => {
    const value = event.target.value;
    if (value.match(/[^А-Яа-яЁё -]/g)) {
      return;
    }
    switch(event.target.name) {
      case "last-name":
        setLastName(value);
        break;
      case "first-name":
        setFirstName(value);
        break;
      case "patronymic": 
        setPatronymic(value);
        break;
      default: 
        return;
    }
  }

  const isNameValid = () => {
    if (firstName.trim().match(/[ ]{2,}|[-]{2,}|[-\b]/)) {
      throw new Error("Введите корректное имя!")
    }
    if (lastName.trim().match(/[ ]{2,}|[-]{2,}|[-\b]/)) {
      throw new Error("Введите корректную фамилию")
    }
    if (patronymic.trim().match(/[ ]{2,}|[-]{2,}|[-\b]/)) {
      throw new Error("Введите корректное отчество")
    }
  }

  const isPassportValid = () => {
    if (isPassportChosen) {
      if (passport1.match(/_/)) {
        throw new Error ("Введите 4 цифры серии паспорта")
      }
      if (passport2.match(/_/)) {
        throw new Error ("Введите 6 цифр номера паспорта")
      }
    } else {
      if (certificate.match(/_/)) {
        throw new Error ("Введите 12 цифр номера свидетельства о рождении")
      }
    }
  }

  const isValid = () => {
    try {
      isNameValid();
      isPassportValid();
    } catch (e) {
      return <span className="error">{e.message}</span>;
    }
    if (!valid.find(el => el === passenger)) {
      const validated = valid.slice();
      validated.push(passenger);
      setValid(validated);
    }
    return <span className="valid">Готово!</span>;
  }

  const isPassportComplete = passport1.replace(/\s|_/g, '').length === 4 && passport2.replace(/\s|_/g, '').length === 6;
  const isCertificateComplete = certificate.replace(/\s|_/g, '').length === 12;
  const isComplete = firstName && lastName && patronymic && (isPassportComplete || isCertificateComplete) && dateOfBirth;

  useEffect(() => {
    if (isComplete) {
      setPassengers({
      name: lastName + " " + firstName + " " + patronymic,
      gender: "Пол " + gender,
      dateOfBirth: "Дата рождения " + dateOfBirth,
      document: isPassportChosen ? 
                "Паспорт РФ " + passport1.replace(/\s/g, "") + passport2.replace(/\s/g, "") : 
                "Свидетельство о рождении " + certificate.replace(/\s/g, ""),
      adult: adult
    })
  }
  },  [isComplete]);
 
  if (isOpen) {
    const today = new Date();
    const minDate = adult ? new Date(today.setYear(today.getFullYear() - 100)) : new Date(today.setYear(today.getFullYear() - 10));
    
    return (
      <div className="passengers-card passengers-card_open">
        <div onClick={() => setOpen(!isOpen)} className="passengers-card_title">Пассажир {passenger}</div>
        <form ref={formRef} action="" className="passengers-card_form">
        <fieldset>
          <div className="select-container">
            <select defaultValue={adult ? "adult" : "child"} className="passengers-card_select" name="" id="">
              <option disabled={child} value="adult">Взрослый</option>
              <option disabled={adult} value="child">Детский</option>
            </select>
          </div>
          <div className="personal-details">
            <label htmlFor="last-name">Фамилия
              <input value={lastName} onChange={handleInput}  type="text" name="last-name" className="passengers-card_last-name" id=""/>
            </label>
            <label htmlFor="first-name">Имя
              <input value={firstName} onChange={handleInput} type="text" name="first-name" className="passengers-card_name" id=""/>
            </label>
            <label htmlFor="patronymic">Отчество
              <input value={patronymic} onChange={handleInput} type="text" name="patronymic" className="passengers-card_patronymic-name" id=""/>
            </label>
          </div>
          <div className="personal-details">
            <label className="gender_label" htmlFor="gender">Пол <br/>
              <input onChange={() => setGender("мужской")} defaultChecked value="М" type="radio" className="gender" name="gender" id="gender"/>
              <input onChange={() => setGender("женский")} value="Ж" type="radio" className="gender" name="gender" id="gender"/>
            </label>
            <label className="birth-picker">
              Дата рождения 
              <Datepicker
                minDate={minDate}
                minDateMessage="Введите корректную дату рождения"
                disableFuture
                adornment={{style: {display: "none"}}} 
                defaultDate={null}
                onDateSelect={(date) => setDateOfBirth(date.toLocaleDateString())}/>
            </label>
          </div>
          <div className="disabilities-check">
            <input checked={disabilities} onChange={() => setDisabilities(!disabilities)} type="checkbox" id="disabilities" className="disabilities"/>
            <label htmlFor="disabilities">ограниченная подвижность</label>
          </div>
        </fieldset>

        <fieldset>
          <div>
            <label className="select-label" htmlFor="">
              Тип документа
              <select defaultValue={adult ? "паспорт" : "свидетельство"} onChange={() => setIsPassportChosen(!isPassportChosen)}  name="" id="">
                <option value="паспорт">Паспорт</option>
                <option disabled={adult} value="свидетельство">Свидетельство о рождении</option>
              </select>
            </label>
            {adult  ? 
              <Fragment>
                <label htmlFor="">
                Серия
                <MaskedInput value={passport1} onChange={value => setPassport1(value)} inputmask={[/\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/]}/>
                </label>
              <label htmlFor="">
                Номер
                <MaskedInput value={passport2} onChange={value => setPassport2(value)} inputmask={[/\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/]}/>
                </label>
              </Fragment> :
              <label htmlFor="">
              Номер
              <MaskedInput value={certificate} onChange={value => setCertificate(value)} inputmask={[/\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/]}/>
              </label>
            }
          </div>
        </fieldset>

        <fieldset>
          {firstName && lastName && patronymic && ((passport1 && passport2) || certificate) && dateOfBirth ? <output className="error">{isValid()}</output> : <output><span className="warning">Пожалуйста, заполните все поля формы!</span></output>}
          
        </fieldset>
      </form>
      </div>
    )
  } else {
    return (
      <div className="passengers-card ">
        <div onClick={() => setOpen(!isOpen)}  className="passengers-card_title ">Пассажир {passenger}</div>
      </div>
    )
  }
}

export {PassengersPage}