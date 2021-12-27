import React from 'react'
import './styles/home.css'
import { useEffect,useState,useRef } from 'react'
import axios from 'axios'

const Home = () => {

    const [days, setdays] = useState('00')
    const [hours, sethours] = useState('00')
    const [minutes, setminutes] = useState('00')
    const [secs, setsecs] = useState('00')
    const [res, setres] = useState([])

    let interval = useRef()

    const startTimer=()=>{
        const countdownDate=new Date('January 5,2022 00:00:00').getTime()

        interval=setInterval(() => {
            const current=new Date().getTime()
            const offset=countdownDate-current

            const days=Math.floor(offset/(1000*60*60*24))
            const hours=Math.floor(offset%(1000*60*60*24)/(1000*60*60))
            const minutes=Math.floor(offset%(1000*60*60)/(1000*60))
            const seconds=Math.floor(offset%(1000*60)/1000)

            
            if(offset>0){
                setdays(days)
                sethours(hours)
                setminutes(minutes)
                setsecs(seconds)

            }
            else
            {
                clearInterval(interval.current)
            }
        }, 1000);
    }
    useEffect(() => {
        startTimer()
        getResponse()

      
        return () => {
            clearInterval(interval.current)
           
        }
    }, [])

    const getResponse=async ()=>{
        let response=await axios.get('https://codeinit-reg.herokuapp.com/getall')
        await console.log(response.data)
        setres(response.data)

    }
    return (
        <div className="body">
        <div className='hero'>
            <div className="hero-text">
                <h1>Get Set Code !</h1>
            </div>
            <div className="container">
                <div className="timer-box">
                    <div className="digit">
                        {days}
                    </div>
                    <p className='timer-text'>Days</p>
                </div>
                
                <div className="timer-box">
                    <div className="digit">
                        {hours}
                    </div>
                    <p className='timer-text'>Hours</p>
                </div>
                <div className="timer-box">
                    <div className="digit">
                        {minutes}
                    </div>
                    <p className='timer-text'>Minutes</p>
                </div>
                <div className="timer-box">
                    <div className="digit">
                        {secs}
                    </div>
                    <p className='timer-text'>Seconds</p>
                </div>
            </div>

         
        </div>
        <div className="entries">
            <h1 className='heading-secondary'>Registerations</h1>
            <div className="box">
                <ul className="list">
                   {res.map((item,key)=>{
                       return <li key={key}><h3>{`${item.name}(${item.rollno})`}</h3></li>
                   })
                   }
                </ul>

            </div>
        </div>
        </div>
    )
}

export default Home
