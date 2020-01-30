import React from 'react';

export const ApiContext = React.createContext();

export class ApiService {
  fetchData = async (urlEntity, options = {method: 'GET'}) => {
    const res = await fetch(`https://netology-trainbooking.herokuapp.com${urlEntity}`, options);
    if (!res.ok) {
      throw new Error(`Could not fetch ${urlEntity}, status - ${res.status}`)
    } 
    return await res.json()
  }

  getCities = async (query) => {
    return await this.fetchData(`/routes/cities?name=${query}`)
  }

  getRoutes = async (params, sortBy, limit, offset) => {
    return await this.fetchData(`/routes?from_city_id=${params.from.id}&to_city_id=${params.to.id}&sort=${sortBy}&limit=${limit}&offset=${offset}&${params.filters || "?"}`)
  }

  getRoutesReverse = async (params, sortBy, limit, offset) => {
    return await this.fetchData(`/routes?from_city_id=${params.to.id}&to_city_id=${params.from.id}&sort=${sortBy}&limit=${limit}&offset=${offset}&${params.filters || "?"}`)
  }

  getSeats = async (id) => {
    return await this.fetchData(`/routes/${id}/seats`)
  }

  createOrder = async (order) => {
    return await this.fetchData(`/order`, {
      method: 'POST',
      body: JSON.stringify(order)
    })
  }

  subscribe = async (email) => {
    return await this.fetchData(`/subscribe?${email}`, {
      method: 'POST'
    })
  }
}
