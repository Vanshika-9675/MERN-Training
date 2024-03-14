import React, { useState } from "react"
import './WeatherApp.css'
import NotFound from "./NotFound";


import search_icon from "./assets/search.png"
import cloud from "./assets/cloud.png";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";


const WeatherApp =()=>{

    const [input,setInput] = useState("");
    const [temp,setTemp] = useState("");
    const [cityName , setCityName] = useState("");
    const [flag_src,SetFlag_src]= useState("");
    const [desc,setDesc] = useState("");
    const [icon_src,SetIcon_src]= useState("");
    const [windy ,setWindy] = useState("");
    const [humid, setHumid] = useState("");
    const [cloudy, setCloudy] = useState("");


    const [found , setFound] = useState(true);
    const[data,setdata]=useState(null)


    
    let APIkey= "b57e6ab9eb24ead898b300ba80c387dd";

    const fetchInput = (e)=>{
          e.preventDefault();
          const Inputcity =  e.target.value;
          setInput(()=>{
               return Inputcity;
          });
    }

    const fetchSearchWeatherInfo = async(e)=>{

        e.preventDefault();
        console.log(input);
        try{
            const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIkey}&units=metric`);

            if(response.ok){
                const data = await response.json();
                const temp = `${data?.main?.temp} °C`;
                const countryCode =  data?.sys?.country.toLowerCase();
                const flag_src =  `https://flagcdn.com/48x36/${countryCode}.png`;
                const desc = data?.weather?.[0]?.description;
                const Icon_src = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`;
                const windspeed =`${data?.wind?.speed} m/s`;
                const humidity = `${data?.main?.humidity} %`;
                const cloudiness =  `${data?.clouds?.all} %`;
                const cityy = data?.name;
    
                console.log(temp);
                setTemp(()=>{
                    return temp;
                })
                SetFlag_src(()=>{
                    return flag_src;
                })
                setDesc(()=>{
                    return desc;
                })
                SetIcon_src(()=>{
                    return Icon_src; 
                })
                setCloudy(()=>{
                    return cloudiness;
                })
                setHumid(()=>{
                    return humidity;
                })
                setWindy(()=>{
                    return windspeed;
                })
                SetFlag_src(()=>{
                    return flag_src;
                })
                setCityName(()=>{
                    return cityy;
                })

               setdata(response);
               setFound(true);

            } else {
                setFound(false); 
                setdata(null);
            }
        }
        catch(err){
            console.log("city not found!");
            setdata(null);
            setFound(false);
        }
    }

    return (
       <div className="wrapper">
           <h1>WEATHER APP</h1>  
         <div className="parent">
          <form className="search-bar">
            <input type="text" className="cityInput" placeholder="Enter city.." onChange={fetchInput}/>
            <button className="btn" onClick={fetchSearchWeatherInfo} >
              <img src={search_icon} alt=""
              height={40} width={40} />
            </button>
          </form>
          {data && (<div>
              <div className="name">
                <p>{cityName}</p>
                <img className="flag" src={flag_src}/>
                <p>{desc}</p>
                <img className="weatherIcon" src={icon_src}/>
              </div>
             {/* weather desc, weather Icon and temperature */}
                <h1>{temp}</h1>
             <div className="parameter-container">
                <div className="parameter">
                    <img src={wind} />
                    <p>WINDSPEED</p>
                    <p>{windy}</p>
                </div>
                <div className="parameter">
                    <img src={humidity} />
                    <p>HUMIDITY</p>
                    <p >{humid}</p>
                </div>
                <div className="parameter">
                    <img src={cloud}/>
                    <p>CLOUDS</p>
                    <p >{cloudy}</p>
                </div>
              </div>
           </div>)}
           {!found && (<NotFound/>)}
         </div>
       </div>
    )
}

export default WeatherApp;