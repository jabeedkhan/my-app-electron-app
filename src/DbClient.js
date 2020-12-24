import React, { Component } from 'react'
const { Client} = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });
export const  dbConnection = () => {
  const query = `CREATE TABLE IF NOT EXISTS users ( emailId varchar NOT NULL PRIMARY KEY, firstName varchar, lastName varchar, password varchar, city varchar, imageUrl varchar)`;
  client.connect().
  then(() => {
    console.log('Database connected successfully');
  }).
  then(() => {
    client.query(query);
  }).
  then(() => {
    console.log('users table created successfully');
  }).
  catch((e) =>{
    alert('Unable to connect db. Please check db config');
  });
};
export const insertNewUserInfomation = async (emailId, firstName, lastName, password, city) => {
    const query = `
      INSERT INTO users (emailId, firstName, lastName, city, password)
      VALUES ('${emailId}', '${firstName}', '${lastName}', '${city}', '${password}')
    `;
  
    console.log('query ', query);
   
    try {
      const result = await client.query(query);
      alert("New user created successfully. Please login");
      console.log('New user informated added into db');
    } catch(e) {
      console.log('error in insert query ', e);
    } finally {
      client.end();
    }
};

export const getLoginUserInformatiomFromDb = async (username, password, event) => {
    const query = `SELECT * FROM users WHERE emailId='${username}' AND password='${password}'`;
    console.log('query ', query);
    try {
        const result = await client.query(query);
        const userArrary = result.rows;
        if(userArrary.length === 0){
            event.preventDefault();
            event.stopPropagation();
            alert('Invalide User Name And Password');
            return false;
        } else {
          console.log('Logged in user details ', userArrary);
          const userInfo = userArrary[0];
          if (userInfo) {
            localStorage.setItem("city", userInfo.city);
            localStorage.setItem("firstname", userInfo.firstname);
            localStorage.setItem("lastname", userInfo.lastname);
            localStorage.setItem("emailid", userInfo.emailid);
          }
          window.location.href = "HomePage.html";
            // window.location.href = "HomePage.html";
            // ipcRenderer.send('toggle-homescreen')
            return true;
        }
      } catch(e) {
        console.log('error in select query ', e);
        event.preventDefault();
        return false;
      } finally {
        // client.end();
        console.log('finally block');
      }
  };
  
export default class DbClient {
}   

