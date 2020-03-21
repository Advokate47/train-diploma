import React, { useState } from 'react';
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom'

import {Homepage} from './js/Homepage';
import {Header } from './js/Header';
import {Footer} from './js/Footer';
import {SearchPage} from './js/SearchPage';
import { SeatsPage } from './js/SeatsPage';
import { PassengersPage } from './js/PassengersPage';
import { PaymentPage } from './js/PaymentPage';
import { ConfirmationPage } from './js/ConfirmationPage';
import { SuccessPage } from './js/SuccessPage';

import { ApiService } from './js/ApiService';
import { ApiServiceContext } from './js/context'

const apiService = new ApiService();

const App = () => {
  if (sessionStorage.searchParams === undefined && sessionStorage.currentTrain === undefined) {
    sessionStorage.searchParams = JSON.stringify({});
    sessionStorage.currentTrain = JSON.stringify({});
  }

  const HeaderComponent = withRouter(Header);

  const [searchParams, setSearchParams] = useState(JSON.parse(sessionStorage.searchParams));
  const [currentTrain, setCurrentTrain] = useState(JSON.parse(sessionStorage.currentTrain));
  const [trains, setTrains] = useState([]);
  const [trainsReverse, setTrainsReverse] = useState([]);


  const [homepageRefs, setHomepageRefs] = useState({
    about: 700,
    how: 1100,
    reviews: 1700,
    contacts: 2300
  });

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL+'/'}>
    <ApiServiceContext.Provider value={apiService}>
      <HeaderComponent 
        homepageRefs={homepageRefs}
        setSearchParams={params => {
          setSearchParams(params);
          sessionStorage.searchParams = JSON.stringify(params);
        }}/>
      <Switch>
        <Route path='/search' 
                render={props => <SearchPage 
                                  {...props}  
                                  searchParams={searchParams} 
                                  trains={trains}
                                  setTrains={trains => setTrains(trains)}


                                  trainsReverse={trainsReverse}
                                  setTrainsReverse={trainsReverse => setTrainsReverse(trainsReverse)}
                                  
                                  setSearchParams={params => {
                                    setSearchParams(params);
                                    sessionStorage.searchParams = JSON.stringify(params);
                                  }}
                                  
                                  
                                  setCurrentTrain={train => {
                                    sessionStorage.currentTrain = JSON.stringify(train);
                                    setCurrentTrain(train);
                                  }} />}
                                  />
        <Route path='/seats' 
                render={props => <SeatsPage 
                                  {...props} 
                                  currentTrain={currentTrain}/>}
                                />
        <Route path='/payment' render={props => <PaymentPage 
                                  {...props} 
                                  currentTrain={currentTrain}/>} 
                                  />
        <Route path='/passengers' render={props => <PassengersPage 
                                  {...props} 
                                  currentTrain={currentTrain}/>} 
                                  />
        <Route path='/confirmation' render={props => <ConfirmationPage 
                                  {...props} 
                                  currentTrain={currentTrain}/>} 
                                  />
        <Route path='/success' component={SuccessPage}/>
        <Route path='/' exact render={props => <Homepage {...props} setHomepageRefs={setHomepageRefs}/>} />
      </Switch>
      <Footer/>
      </ApiServiceContext.Provider>
    </BrowserRouter>
  )

}

export default App;

