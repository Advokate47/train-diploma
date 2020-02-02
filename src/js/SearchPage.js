import React, { Fragment, useContext, useState, useEffect } from 'react';
import {TrainpickerForm} from './TrainpickerForm'
import {ProgressSteps} from './ProgressSteps'
import { FiltersForm } from './FiltersForm';
import { LastTickets } from './LastTickets'
import { TrainCard } from './TrainCard';
import { Pagination } from './Pagination'; 

import {ApiServiceContext} from './context';



const SearchPage = (props) => {
  const api = useContext(ApiServiceContext);
  const {trains, setTrains} = props;
  const {trainsReverse, setTrainsReverse} = props;
  const [trainsArr, setTrainsArr] = useState();


  const params = props.searchParams || JSON.parse(sessionStorage.searchParams);
  const newParams = Object.assign({}, params);
  if (params.dateBack !== null) {
    
    newParams.to = params.toReverse;
    newParams.from = params.fromReverse;
  }
  


  const [showNotice, setShowNotice] = useState(false);
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState('duration');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const update = (filters) => {
    params.filters = filters; 
    api.getRoutes(params, sortBy, limit, offset)
    .then(response => {
        sessionStorage.trains = JSON.stringify(response.items);
        const count = response.items.length === 0 ? 0 : response.total_count;
        setCount(count);
        setTrains(response.items);
        if (response.items.length === 0) {
          setShowNotice(true);
        } 
      }
    );

    

    api.getRoutes(newParams, sortBy, limit, offset)
    .then(response => {
        sessionStorage.trainsReverse = JSON.stringify(response.items);
        const count = response.items.length === 0 ? 0 : response.total_count;
        setCount(count);
        setTrainsReverse(response.items);
        if (response.items.length === 0) {
          setShowNotice(true);
        } 
      }
    );
    
  }

  useEffect(() => {
    update(); 
    
  }, [params.from.name, params.to.name, newParams.from.name, newParams.to.name, sortBy, limit, offset]);

  const handleSortBy = event => {
    const list = event.currentTarget;
    const item = event.target;
    list.classList.toggle('sort_list-open');
    Array.from(list.children).forEach(el => el.classList.remove('sort-by-current'));
    item.classList.add('sort-by-current');
    setSortBy(item.dataset.sort);
    setCurrentPage(1);
  }
  
  const handleLimit = event => {
    
    if (!event.target.classList.contains('limit-by')) {
      return;
    }
    const list = event.currentTarget;
    const item = event.target;
    Array.from(list.children).forEach(el => el.classList.remove('limit-by-current'));
    item.classList.add('limit-by-current');
    setLimit(item.dataset.limit);
    setCurrentPage(1);
  }

  const setPage = (page) => {
    setOffset(limit * (page - 1));
    setCurrentPage(page);
  }


  return  (
    
    <Fragment>
      <section className="columns">
        <div className="col-left">
          <FiltersForm {...props} update={update} />
          <LastTickets />
        </div>
        <div className="col-right">
          <div className="results-display">
            <div className="trains-count">
              <span className="results-option">Найдено</span>
              <span>{count}</span>
            </div>
            <div className="sort">
              <span className="results-option">сортировать по:</span>
              <ul onClick={handleSortBy} className="sort_list">
                <li className="sort-by" data-sort="date">отправлению</li>
                <li className="sort-by sort-by-current" data-sort="duration">длительности</li>
              </ul>
            </div>
            <div className="limit">
              <span className="results-option">показывать по:</span>
              <ul className="limit_list" onClick={handleLimit}>
                <li className="limit-by limit-by-current" data-limit={5}>5</li>
                <li className="limit-by" data-limit={10}>10</li>
                <li className="limit-by" data-limit={20}>20</li>
              </ul>
            </div>
          </div>
          
          {trains.length > 0 ? 
            trains.map(function(train, index){
              const trainsBack = trainsReverse[index];
              return ( 
              <TrainCard trainsBack={trainsBack}
                                key={index}
                                params={params}
                                departure={train.departure} 
                                
                                currentTrain={props.currentTrain} 
  setCurrentTrain={props.setCurrentTrain}/>)}) :
            showNotice ? <div className="not-found-notice">К сожалению, ничего не найдено. Попробуйте изменить параметры поиска.</div> : <div className="loader"><div className="loader_image"></div></div>
          }
          
          <Pagination 
              trains={trains}
              count={count} 
              limit={limit} 
              currentPage={currentPage}
              setCurrentPage={setPage}/> 
        </div>
      </section>
    </Fragment>
  )
  
}

export {SearchPage}
