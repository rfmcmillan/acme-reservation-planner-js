import axios from 'axios';
// import {models: userList, Restaurant, Reservation} from './server.js'
// const {
//   models: { Reservation },
// } = require('../server.js');
// import Reservation from '../server.js';

let users, restaurants, reservations;

const userList = document.querySelector('#user-list');
const restaurantList = document.querySelector('#restaurant-list');
const reservationList = document.querySelector('#reservation-list');

const renderUsers = (users) => {
  const userId = window.location.hash.slice(1) * 1;
  const html = users
    .map(
      (user) =>
        `
    <li>
      <a href='#${user.id}' class=${user.id === userId ? 'selected' : ''}>
        ${user.name}
        </a>
    </li>
  `
    )
    .join('');

  userList.innerHTML = html;
};

const renderRestaurants = (restaurants) => {
  const userId = window.location.hash.slice(1);
  const html = restaurants
    .map(
      (restaurant) =>
        `
    <li>
      <a href='#${userId}' data-id="${restaurant.id}">
        ${restaurant.name}
        </a>
    </li>
  `
    )
    .join('');

  restaurantList.innerHTML = html;
};

const renderReservations = async (reservations) => {
  const html = reservations
    .map((reservation) => {
      return `
    <li>${reservation.restaurant.name} @ ${reservation.time}
    <form method="POST" action="/api/reservations/${reservation.id}/?_method=DELETE">
    <button name="id" value=${reservation.id}>X</button>
    </form>
    </li>
  `;
    })
    .join('');

  reservationList.innerHTML = html;
};

restaurantList.addEventListener('click', async (event) => {
  const target = event.target;
  const userId = window.location.hash.slice(1);
  if (target.tagName === 'A') {
    const newReservation = {
      restaurantId: target.getAttribute('data-id'),
    };
    await axios.post(`api/users/${userId}/reservations`, newReservation);
    const response = await axios.get(`api/users/${userId}/reservations`);
    const reservations = response.data;
    console.log('reservations:', reservations);
    renderReservations(reservations);
  }
});

const init = async () => {
  try {
    users = (await axios.get('/api/users')).data;
    restaurants = (await axios.get('/api/restaurants/')).data;
    renderUsers(users);
    renderRestaurants(restaurants);
    const userId = window.location.hash.slice(1);
    if (userId) {
      reservations = (await axios.get(`/api/users/${userId}/reservations`))
        .data;
      renderReservations(reservations);
    }
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('hashchange', async () => {
  const userId = window.location.hash.slice(1);
  const url = `/api/users/${userId}/reservations`;
  reservations = (await axios(url)).data;
  renderReservations(reservations);
  renderRestaurants(restaurants);
  renderUsers(users);
});

init();
