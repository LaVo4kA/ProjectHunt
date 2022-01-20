import React, {useState, useEffect} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from "./NowEventsPageStyles.css"
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function EventsPage() {
  var [events, setEvents] = useState([])
  var [loading, setLoading] = useState(true)
  var [isAdmin, setIsAdmin] = useState(false)
  var navigate = useNavigate()

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    CheckAdmin()
    GetEvents()
  }, [])

  function CheckAdmin(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true
    xhr.open("GET", "http://localhost:5001/secrets/isAdmin")
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
    xhr.send()

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получили список мероприятий!")
            setIsAdmin(JSON.parse("[" + xhr.responseText + "]")[0])
        }
        if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить список мероприятий")
        }
    }
  }

  function GetEvents(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true
    xhr.open("GET", "http://localhost:5001/catalogs/getNowEvents")
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
    xhr.send()

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получили список мероприятий!")
            setEvents(JSON.parse("[" + xhr.responseText + "]")[0])
            setLoading(false)
        }
        if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить список мероприятий")
        }
    }
  }

  function JoinEvent(){
    var e = document.getElementsByClassName("input-join-event")[0]
    var accessCode = e.value
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true
    xhr.open("POST", "http://localhost:5001/events/check?accessCode=" + accessCode)
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
    xhr.send(accessCode)

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
          console.log("Успешно ввели код!")
          var eventId = JSON.parse('"' + xhr.responseText + '"')
          navigate("/" + eventId + "/join")
        }
        if (xhr.readyState === 4 && xhr.status === 400){
          WrongState("Вы уже состоите в этом мероприятии")
        }
        if(xhr.readyState === 4 && xhr.status === 404){
          WrongState("Мероприятие не найдено")
        }
    }
  }

  function WrongState(comment){
    var miniText = document.getElementsByClassName("now_events-popup-content-wrapper-comment")[0]
    miniText.innerText = comment
    miniText.style.color = "#E30000"

    var img = document.getElementById("now_events-popup-content-wrapper-text-img")
    img.hidden = false

    var input = document.getElementsByClassName("input-join-event")[0]
    input.style.background = "rgba(227, 0, 0, 0.06)"
    input.style.border = "1px solid #E30000"
    input.style.color = "#E30000"
  }

  function OkState(){
    var miniText = document.getElementsByClassName("now_events-popup-content-wrapper-comment")[0]
    miniText.innerText = "Код вы можете получить у создателя мероприятия"
    miniText.style.color = "rgba(0, 0, 0, 0.6)"

    var img = document.getElementById("now_events-popup-content-wrapper-text-img")
    img.hidden = true

    var input = document.getElementsByClassName("input-join-event")[0]
    input.style.background = "#FFFFFF"
    input.style.border = "1px solid #9F87FF"
    input.style.color = "rgba(0, 0, 0, 0.6)"
  }

  function FocusColor(className){
    console.log("сработал фокус")
    var e = document.getElementsByClassName(className)[0]
    e.style.border = "1px solid #9F87FF"
    e.style.boxShadow = "0px 0px 0px 3px rgba(159, 135, 255, 0.2)"
  }

function BlurColor(className){
    var e = document.getElementsByClassName(className)[0]
    e.style.border = "1px solid rgba(0, 0, 0, 0.2)"
    e.style.boxShadow = ""
}

  return(
    <div style={styles}>
      <Header></Header>
      <div className='wrapper'>
        {loading ? <Loader></Loader> :
        <div className="now_events">
          <p className='now_events-title'>Ваши мероприятия</p>
          <div className='now_events-buttons'>
            <div className='now_events-buttons-time'>
              <Link to={"/now-events"}>
                <div className='now_events-buttons-time-now'>
                  <p>Текущие</p>
                </div>
              </Link>
              <Link to={"/old-events"}>
                <div className='now_events-buttons-time-old'>
                  <p>Прошедшие</p>
                </div>
              </Link>
            </div>
            <div className='now_events-buttons-actions'>
              {isAdmin && 
              <Link to={"/create-event"}>
                <div className='now_events-buttons-actions-create'>
                  <img src='../img/plus-dark.svg'></img>
                  <p>Создать</p>
                </div>
              </Link>}
              <div onClick={() => HidePopup()} className='now_events-buttons-actions-join'>
                <img src='../img/plus.svg'></img>
                <p>Присоединиться</p>
              </div>
            </div>
          </div>
          <div className='now_events-events'>
            {CheckEventsCount(events)}
          </div>
          <div hidden className='now_events-popup'>
            <div className='now_events-popup-content'>
              <div className='now_events-popup-content-cross'>
                <img onClick={() => HidePopup()} src='../img/cross.svg'></img>
              </div>
              <div className='now_events-popup-content-wrapper'>
                <h2>Введите код мероприятия</h2>
                <input onFocus={() => FocusColor("input-join-event")} onBlur={() => BlurColor("input-join-event")} onChange={() => OkState()} className="input-join-event" type={"text"}></input>
                <div className='now_events-popup-content-wrapper-text'>
                  <img hidden id='now_events-popup-content-wrapper-text-img' src='../img/wrong-field-!.svg'></img>
                  <p className='now_events-popup-content-wrapper-comment'>Код вы можете получить у создателя мероприятия</p>
                </div>
                <div onClick={() => JoinEvent()} className='now_events-popup-content-submit'>
                  <p>Применить</p>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    <Footer></Footer>
    </div>
  )
}

function CheckEventsCount(events){
  var id = 1
  console.log(events)
  if(events.length === 0){
    return (
      <div className='now-events-page-empty'>
        <div className='now-events-page-empty-message'>
          <p>У вас пока что нет текущих мероприятий</p>
        </div>
        <img src='../img/empty-events.svg'></img>
      </div>
    )
  }

  return(
    events.map(event => {
    return (
      <Link to={"/" + event.id + "/projects-list"} key={id++}>
        <div className='now_events-events-event'>
            <h2>{event.name}</h2>
            <p>Заканчивается - {event.closeTime}</p>
        </div>
      </Link>
    )
  }))
  
}

function HidePopup(){
  var e = document.getElementsByClassName("now_events-popup")[0]
  e.hidden = !e.hidden

  var miniText = document.getElementsByClassName("now_events-popup-content-wrapper-comment")[0]
  miniText.innerText = "Код вы можете получить у создателя мероприятия"
  miniText.style.color = "rgba(0, 0, 0, 0.6)"

  var input = document.getElementsByClassName("input-join-event")[0]
  input.value = ""
  input.style.background = "#FFFFFF"
  input.style.border = "1px solid rgba(0, 0, 0, 0.2)"
  input.style.color = "rgba(0, 0, 0, 0.6)"
}