import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*function ConfigOptions(){
  var xhr = new XMLHttpRequest();
  xhr.open("OPTIONS", "http://localhost:5001/secrets")
  xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
  xhr.send()
}*/

/*function Logout(){
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("POST", "http://localhost:5001/secrets/logout")
  xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
  xhr.send()

  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200){
      console.log("Пользователь успешно разлогирован")
    }
  }
}*/



//ConfigOptions()
//Logout()
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
