import axios from 'axios';
// import {models: userList, Restaurant, Reservation} from './server.js'

let users, restaurants, reservations;

const userList = document.querySelector('#user-list');
const restaurantList = document.querySelector('#restaurant-list');
const reservationList = document.querySelector('#reservation-list');

const renderUsers = (users) => {
  const html = users.map(user=> 
    `
    <li>
      <a href='#${user.id}'>
        ${user.name}
        </a>
    </li>
  `).join('');

  userList.innerHTML = html;
};

const renderRestaurants = (restaurants) => {
  const html = restaurants.map(restaurant=> 
    `
    <li>
      <a href='#${restaurant.id}'>
        ${restaurant.name}
        </a>
    </li>
  `).join('');

  restaurantList.innerHTML = html;
};


const renderReservations = (reservations) => {
  const html = reservations.map(reservation=> {
    return `
    <li>
      <a href='#${reservation.id}'> 
        ${reservation.name}
        </a>
    </li>
  `}).join('');

  reservationList.innerHTML = html;
};


const init = async () => {
  try {
    users = (await axios.get('/api/users')).data;
    restaurants= (await axios.get('/api/restaurants/')).data;
    // reservations= (await axios.get('/api/users/:userId/reservations')).data
    renderUsers(users);
    renderRestaurants(restaurants);
    // renderReservations(reservations);
  } catch (error) {
    console.log(error);
  }
};
init();