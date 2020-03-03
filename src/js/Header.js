import React, { Fragment } from 'react';
import { TrainpickerForm } from './TrainpickerForm';
import { ProgressSteps } from './ProgressSteps';
import { Link } from 'react-router-dom';


const Header = (props) => {
  // console.log(props)
  const {homepageRefs} = props;
  const handleClick = event => {
    const top = homepageRefs[event.currentTarget.dataset.id];
    const scrollOptions = {
      top: top,
      behavior: 'smooth'
    }

    if (props.location.pathname === '/') {
      event.preventDefault();
    }

    window.scrollTo(scrollOptions);
  }
    
  const handleDropdownMenu = event => {
    event.currentTarget.nextElementSibling.classList.toggle('hidden');
    (Array.from(event.currentTarget.children)).forEach( el => el.classList.toggle('hidden'));
  }

  return (
    <Fragment>
      <section className="header">
        <div className="logo"><Link className="logo__link" to="/"><h1>неРЖД</h1></Link></div>
        <nav  className="menu">
          <ul className="nav">
            <li  className="nav__item"><Link onClick={handleClick} className="nav__link" data-id="about" to='/'>О нас</Link></li>
            <li  className="nav__item"><Link to='/' onClick={handleClick} data-id="features" className="nav__link" >Как это работает</Link></li>
            <li  className="nav__item"><Link to='/' onClick={handleClick} data-id="reviews" className="nav__link" >Отзывы</Link></li>
            <li  className="nav__item"><Link to='/' onClick={handleClick} data-id="footer" className="nav__link" href="#footer">Контакты</Link></li>
          </ul>
        </nav>

        <nav className="menu-dropdown">
          <div onClick={handleDropdownMenu} className="menu-burger">
            <i className="fas fa-bars"></i>
            <i className="far fa-window-close hidden"></i>
          </div>
          <ul className="nav hidden">
            <li></li>
            <li  className="nav__item"><Link onClick={handleClick} className="nav__link" data-id="about" to='/'>О нас</Link></li>
            <li  className="nav__item"><Link to='/' onClick={handleClick} data-id="features" className="nav__link" >Как это работает</Link></li>
            <li  className="nav__item"><Link to='/' onClick={handleClick} data-id="reviews" className="nav__link" >Отзывы</Link></li>
            <li  className="nav__item"><Link to='/' onClick={handleClick} data-id="footer" className="nav__link" href="#footer">Контакты</Link></li>
          </ul>
        </nav>

      </section>
      <TrainpickerForm {...props}/>
        {(props.location.pathname === '/' ||  props.location.pathname === '/success') ? null : <ProgressSteps {...props}/>}
    </Fragment>
  )
}


export {Header}