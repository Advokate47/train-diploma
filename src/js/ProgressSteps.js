import React from 'react';

const ProgressSteps = (props) => {
  const current = props.location.pathname;
  const steps = [
    {
      step: "/search/seats",
      title: "Билеты"
    },
    {
      step: "/passengers",
      title: "Пассажиры"
    },
    {
      step: "/payment",
      title: "Оплата"
    },
    {
      step: "/confirmation",
      title: "Проверка"
    }
  ];

  const isCurrent = (element, i) => {
    return element.step.match(current) || i <= steps.findIndex(el => el.step === current)
  }

  return (
    <section className="progress">
      {steps.map((el, i) => (<div key={el.title} className={`progress__step ${isCurrent(el, i) ? "progress__step-current" : ""}`}>
       <span className="number">{i+1}</span>
       <span className="progress__text">{el.title}</span>
       {i === 3 ? null : <div className={`progress__arrow ${isCurrent(el, i) ? "progress__arrow-current" : ""}`}></div>}
     </div>)
     )}
   </section>
  )
}

export {ProgressSteps}

