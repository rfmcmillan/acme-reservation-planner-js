import axios from 'axios';
// import {models: userList, Restaurant, Reservation} from './server.js'

let users, restaurants, reservations;

const userList = document.querySelector('#user-list');
const restaurantList = document.querySelector('#restaurant-list');
const reservationList = document.querySelector('#reservation-list');

const renderUsers = (users) => {
  const html = `

  `;

  userList.innerHTML = html;
};

const init = async () => {
  try {
    users = (await axios.get('/api/users')).data;
    renderUsers();
  } catch (error) {
    console.log(error);
  }
};
