import React, {useState, useEffect} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from "./OldEventsPageStyles.css"
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function EventsPage() {
  var [events, setEvents] = useState([])
  var [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    GetEvents()
  }, [])

  function GetEvents(){
    var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/catalogs/getOldEvents")
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

  return(
    <div style={styles}>
      <Header></Header>
      <div className='wrapper'>
        {loading ? <Loader/> :
        <div className="old_events">
          <p className='old_events-title'>Ваши мероприятия</p>
          <div className='old_events-buttons'>
            <div className='old_events-buttons-time'>
                <Link to={"/now-events"}>
                    <div className='old_events-buttons-time-now'>
                    <p>Текущие</p>
                    </div>
                </Link>
                <Link to={"/old-events"}>
                    <div className='old_events-buttons-time-old'>
                    <p>Прошедшие</p>
                    </div>
                </Link>
            </div>
            <div className='old_events-buttons-actions'>
              <div style={{display: "none"}} className='old_events-buttons-actions-create'>
                <img src='../img/plus-dark.svg'></img>
                <p>Создать</p>
              </div>
            </div>
          </div>
          <div className='old_events-events'>
            {CheckEventsCount(events)}
          </div>
        </div>}
      </div>
    <Footer></Footer>
    </div>
  )
}

function CheckEventsCount(events){
  var id = 1
  if(events.length === 0){
    return (
      <div className='old-events-page-empty'>
        <div className='old-events-page-empty-message'>
          <p>У вас пока что нет прошедших мероприятий</p>
        </div>
        <img src='../img/empty-events.svg'></img>
      </div>
    )
  }

  return(
    events.map(event => {
    return (
      <Link to={"/" + event.id + "/projects-list"} key={id++}>
        <div className='old_events-events-event'>
            <h2>{event.name}</h2>
            <p>Заканчилось - {event.closeTime}</p>
        </div>
      </Link>
    )
  }))
  
}