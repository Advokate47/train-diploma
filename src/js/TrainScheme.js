import React, { useEffect } from 'react';

const TrainScheme = (props) => {
  let Car, price;
  const {type, coach, passengers, chosen, setChosen, cancelChosen, setTotalPrice, topPrice, bottomPrice, sidePrice} = props;

  const getFirstClassPrice = () => bottomPrice;
  const getSecondClassPrice = seat => seat % 2 === 0 ? topPrice : bottomPrice;
  const getThirdClassPrice = seat => seat > 36 ? sidePrice : getSecondClassPrice(seat);
  const getFourthClassPrice = () => bottomPrice;
  
  useEffect(() => {
    const seats = document.querySelectorAll('.scheme_seat');
    if (chosen.length === passengers) {
      seats.forEach(el => {
        if (el.classList.contains('scheme_seat-free') && !el.classList.contains('scheme_seat-chosen')) {
          el.classList.add('scheme_seat-inactive') 
        }
      });
    } else {
      seats.forEach(el => el.classList.remove('scheme_seat-inactive'))
    }
  }, [chosen, passengers]);

  switch (type) {
    case "first":
      Car = FirstClassScheme;
      price = getFirstClassPrice;
      break;
    case "second":
      Car = SecondClassScheme;
      price = getSecondClassPrice; 
      break;
    case "third":
      Car = ThirdClassScheme;
      price = getThirdClassPrice;
      break;
    case "fourth":
      Car = FourthClassScheme;
      price = getFourthClassPrice;
      break;
    default:
      return;
  }



  const handleClick = event => {
    if (!event.target.classList.contains('scheme_seat') || !event.target.classList.contains('scheme_seat-free')) {
      return;
    }

    const seat = event.target;
    const seatId = +seat.textContent;

    if (seat.classList.contains('scheme_seat-chosen')) {
      seat.classList.remove('scheme_seat-chosen');
      cancelChosen(seatId);
      setTotalPrice(-price(seatId));
    } else if (seat.classList.contains('scheme_seat-free') && chosen.length < passengers) {
        event.target.classList.add('scheme_seat-chosen');
        setChosen(seatId);
        setTotalPrice(price(seatId));
    }
  }

  const getCoachNumber = (name) => {
    return name.match(/\d/g);
  }

  return (
    <div className="train-scheme">
      <div className="train-hint">{type === "second" || type === "third" ? "Нижние - нечетные, верхние - четные" : "В один заказ можно добавить не более 4 мест"}</div>
      <div className="scheme_train-number" title="Номер вагона">
        <span>{getCoachNumber(coach.coach.name)}</span>
      </div>
      <div className="scheme" onClick={handleClick}>
        <Car />
      </div>
    </div>
  )
}

export {TrainScheme};


const FirstClassScheme = () => {
  return (
    <div className="scheme_train-first-class" >
      <div className="scheme_room"> 
        <div className="scheme_seat scheme_seat-free">1</div>
        <div className="scheme_seat">2</div>
      </div>
      <div className="scheme_room">
        <div className="scheme_seat">3</div>
        <div className="scheme_seat">4</div>
      </div>
      <div className="scheme_room">
        <div className="scheme_seat">5</div>
        <div className="scheme_seat">6</div>
      </div>
      <div className="scheme_room">
        <div className="scheme_seat">7</div>
        <div className="scheme_seat">8</div>
      </div>
      <div className="scheme_room">
        <div className="scheme_seat">9</div>
        <div className="scheme_seat scheme_seat-free">10</div>
      </div>
      <div className="scheme_room">
        <div className="scheme_seat">11</div>
        <div className="scheme_seat">12</div>
      </div>
      <div className="scheme_room">
        <div className="scheme_seat">13</div>
        <div className="scheme_seat">14</div>
      </div>
      <div className="scheme_room">
        <div className="scheme_seat scheme_seat-free">15</div>
        <div className="scheme_seat scheme_seat-free">16</div>
      </div> 
    </div>
  )
}

const SecondClassScheme = () => {
  return (
    <div className="scheme_train-second-class" > 
      <div className="scheme_room"> 
        <div>
          <div className="scheme_seat scheme_seat-free">1</div>
          <div className="scheme_seat">2</div>
        </div>
      <div>
        <div className="scheme_seat scheme_seat-free">3</div>
        <div className="scheme_seat">4</div>
      </div>
      </div>
    <div className="scheme_room">
      <div>
        <div className="scheme_seat">5</div>
        <div className="scheme_seat">6</div>
      </div>
      <div>
        <div className="scheme_seat">7</div>
        <div className="scheme_seat">8</div>
      </div>
    </div>
    <div className="scheme_room">
      <div>
        <div className="scheme_seat">9</div>
        <div className="scheme_seat">10</div>
      </div>
      <div>
        <div className="scheme_seat scheme_seat-free">11</div>
        <div className="scheme_seat">12</div>
      </div>
    </div>
    <div className="scheme_room"> 
      <div>
        <div className="scheme_seat scheme_seat-free">13</div>
        <div className="scheme_seat">14</div>
      </div>
      <div>
          <div className="scheme_seat scheme_seat-free">15</div>
        <div className="scheme_seat">16</div>
      </div>
    </div>
    <div className="scheme_room">
      <div>
        <div className="scheme_seat">17</div>
        <div className="scheme_seat scheme_seat-free">18</div>
      </div>
      <div>
        <div className="scheme_seat scheme_seat-free">19</div>
        <div className="scheme_seat">20</div>
      </div>
    </div>
    <div className="scheme_room">
        <div>
            <div className="scheme_seat">21</div>
            <div className="scheme_seat scheme_seat-free">22</div>
          </div>
          <div>
            <div className="scheme_seat scheme_seat-free">23</div>
            <div className="scheme_seat">24</div>
          </div>
      </div>
    <div className="scheme_room">
      <div>
        <div className="scheme_seat">25</div>
        <div className="scheme_seat">26</div>
      </div>
      <div>
        <div className="scheme_seat scheme_seat-free">27</div>
        <div className="scheme_seat">28</div>
      </div>
    </div>
    <div className="scheme_room">
      <div>
        <div className="scheme_seat">29</div>
        <div className="scheme_seat scheme_seat-free">30</div>
      </div>
      <div>
        <div className="scheme_seat scheme_seat-free">31</div>
        <div className="scheme_seat scheme_seat-free">32</div>
      </div>
    </div>
    </div>
  )
}

const ThirdClassScheme = () => {
  return (
    <div className="scheme_train-third-class">
      <SecondClassScheme />
      <div className="scheme_train-side">
        <div>
          <div className="scheme_seat scheme_seat-free">33</div>
          <div className="scheme_seat">34</div>
        </div>
        <div>
          <div className="scheme_seat">35</div>
          <div className="scheme_seat">36</div>
        </div>
        <div>
          <div className="scheme_seat scheme_seat-free">37</div>
          <div className="scheme_seat scheme_seat-free">38</div>
        </div>
        <div>
          <div className="scheme_seat scheme_seat-free">39</div>
          <div className="scheme_seat">40</div>
        </div>
        <div>
          <div className="scheme_seat">41</div>
          <div className="scheme_seat">42</div>
        </div>
        <div>
          <div className="scheme_seat">43</div>
          <div className="scheme_seat scheme_seat-free">44</div>
        </div>
        <div>
          <div className="scheme_seat">45</div>
          <div className="scheme_seat scheme_seat-free">46</div>
        </div>
        <div>
          <div className="scheme_seat scheme_seat-free">47</div>
          <div className="scheme_seat scheme_seat-free">48</div>
        </div>
      </div>
    </div>
  )
}

const FourthClassScheme = () => {
  return (
    <div className="scheme_train-fourth-class" >
      <div className="scheme_row">
        <div className="scheme_seat scheme_seat-free">1</div>
        <div className="scheme_seat">2</div>
        <div className="scheme_seat">3</div>
        <div className="scheme_seat scheme_seat-free">4</div>
        <div className="scheme_seat scheme_seat-free">5</div>
        <div className="scheme_seat scheme_seat-free">6</div>
        <div className="scheme_seat scheme_seat-free">7</div>
        <div className="scheme_seat">8</div>
        <div className="scheme_seat">9</div>
        <div className="scheme_seat">10</div>
        <div className="scheme_seat">11</div>
        <div className="scheme_seat scheme_seat-free">12</div>
        <div className="scheme_seat">13</div>
        <div className="scheme_seat">14</div>
        <div className="scheme_seat">15</div>
        <div className="scheme_seat">16</div>
        <div className="scheme_seat">17</div>
        <div className="scheme_seat">18</div>
        <div className="scheme_seat">19</div>
        <div className="scheme_seat">20</div>
        <div className="scheme_seat scheme_seat-free">21</div>
        <div className="scheme_seat">22</div>
        <div className="scheme_seat">23</div>
        <div className="scheme_seat scheme_seat-free">24</div>
        <div className="scheme_seat scheme_seat-free">25</div>
        <div className="scheme_seat">26</div>
        <div className="scheme_seat">27</div>
        <div className="scheme_seat">28</div>
        <div className="scheme_seat">29</div>
        <div className="scheme_seat">30</div>
        <div className="scheme_seat scheme_seat-free">31</div>
        <div className="scheme_seat scheme_seat-free">32</div>
      </div>

      <div className="scheme_row scheme_row-second">
        <div className="scheme_seat">33</div>
        <div className="scheme_seat">34</div>
        <div className="scheme_seat">35</div>
        <div className="scheme_seat scheme_seat-free">36</div>
        <div className="scheme_seat scheme_seat-free">37</div>
        <div className="scheme_seat scheme_seat-free">38</div>
        <div className="scheme_seat">39</div>
        <div className="scheme_seat">40</div>
        <div className="scheme_seat">41</div>
        <div className="scheme_seat">42</div>
        <div className="scheme_seat scheme_seat-free">43</div>
        <div className="scheme_seat scheme_seat-free">44</div>
        <div className="scheme_seat scheme_seat-free">45</div>
        <div className="scheme_seat scheme_seat-free">46</div>
        <div className="scheme_seat">47</div>
        <div className="scheme_seat">48</div>
        <div className="scheme_seat scheme_seat-free">49</div>
        <div className="scheme_seat scheme_seat-free">50</div>
        <div className="scheme_seat">51</div>
        <div className="scheme_seat">52</div>
        <div className="scheme_seat">53</div>
        <div className="scheme_seat">54</div>
        <div className="scheme_seat scheme_seat-free">55</div>
        <div className="scheme_seat">56</div>
        <div className="scheme_seat scheme_seat-free">57</div>
        <div className="scheme_seat scheme_seat-free">58</div>
        <div className="scheme_seat">59</div>
        <div className="scheme_seat scheme_seat-free">60</div>
        <div className="scheme_seat">61</div>
        <div className="scheme_seat scheme_seat-free">62</div>
      </div>
    </div>
  )
}