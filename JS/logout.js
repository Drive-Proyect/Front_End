//cerrar sesion
// function logout() {
    
// }
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cors = require('cors');
// Assuming you have an axios instance named 'axios'
function logout() {
  fetch('http://localhost:5009/api/logout', {
    method: 'POST',     
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
  .then(response => {
    console.log(response.data);
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    return window.location.href = "../HTML/Login.html"
  })
  .catch(error => {
    console.error(error);
  });
}