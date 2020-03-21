import React, { useContext, useState, useEffect } from 'react'
import {ApiServiceContext} from './context';


const TypeaheadInput = (props) => {
  
  const api = useContext(ApiServiceContext);
  const {placeholder, onSelect} = props;
  const [cities, setCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [hint, setHint] = useState('');
  const [inputValue, setInputValue] = useState(props.value);
  const [inputVal, setInputVal] = useState(props.value);
  
  useEffect(() => {
    sessionStorage.travelFromName = inputValue
    sessionStorage.travelToName = inputValue

  }, [props.value, inputValue]);

  const handleFocus = (event) => {
    const value = event.currentTarget.value || 'а';
    api.getCities(value).then(response => {
      setHint('');
      setShowSuggestions(true);
      setCities(response);
    });
  }

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 1000);
  }
  
  const handleInput = event => {
    const value = event.currentTarget.value;
    // if (value.match(/[^а-яА-я ]/)) {
    //   return;
    // }

    setInputValue(value);

    api.getCities(value).then(response => {
      let newHint = response.length > 0 ? response.find(el => el.name.startsWith(value)) : '';
      setHint(newHint ? newHint.name : '');
      setShowSuggestions(true);
      setCities(response);
    });
  }

  const handleSelect = event => {
    setInputValue(event.target.textContent);
    setHint('');
    onSelect({
      name: event.target.textContent, 
      id: event.target.dataset.id
    });
    setShowSuggestions(false);
  }

  let suggestions, current = -1;
  const handleKeydown = event => {
    if (!suggestions) {
      return;
    }
    if (event.key === 'ArrowDown') {
        current++;
        Array.from(suggestions.children).forEach(el => el.classList.remove('suggestion-active'));
        if (current > suggestions.children.length - 1) {
          current = 0;
        }
        suggestions.children[current].classList.add('suggestion-active');
    } else if (event.key === 'ArrowUp') {
        current--;
        Array.from(suggestions.children).forEach(el => el.classList.remove('suggestion-active')); 
        if (current < 0) {
          current = suggestions.children.length - 1;
        }
        suggestions.children[current].classList.add('suggestion-active');
    } else if (event.key === 'Enter') {
        let active = (Array.from(suggestions.children)).find(el => el.classList.contains('suggestion-active'));
        if (!active) {
          return;
        }
        onSelect({
          name: active.textContent,
          id: active.dataset.id
        });
        setInputValue(active.textContent);
        setHint('');
        setShowSuggestions(false);
      } else {
        handleInput(event);
      }
    }

  return (
    <div className="input-with-icon">
      <span className="trainpicker__hint">
        <span className="trainpicker__hint-transparent">{hint.slice(0, inputValue.length)}</span>{hint.slice(inputValue.length)}
      </span>
      { sessionStorage.travelToNameSwap !== sessionStorage.travelToName ?
          (<input className="trainpicker__input trainpicker__input-direction" value={inputValue} onChange={handleInput} onFocus={handleFocus} onBlur={handleBlur} type="text" placeholder={placeholder} onKeyDown={handleKeydown}/>) :
          (<input className="trainpicker__input trainpicker__input-direction" value={props.value} onChange={handleInput} onFocus={handleFocus} onBlur={handleBlur} type="text" placeholder={placeholder} onKeyDown={handleKeydown}/>)
      }

      <i className="material-icons trainpicker__icon">room</i>
      {showSuggestions && cities.length > 0 ? 
        <ul ref={el => suggestions = el} onClick={handleSelect} className="suggestions" >
          {cities.map(city => <li key={city._id}  data-id={city['_id']}>{city.name}</li>)}
        </ul> :
        null
      }
    </div>
  )
}

export {TypeaheadInput}