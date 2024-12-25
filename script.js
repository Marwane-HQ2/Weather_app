const API_KEY = "PASTE YOUR API KEY HERE !"

async function getWeatherByCity(event) {
    event.preventDefault()

    const CITY = document.getElementById("city-input").value
    
    try {
        const RESPONSE = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`)
        
        if (RESPONSE.ok) {
            // OBTENIR LES DONNEES DANS UN DICTIONNAIRE
            const DATA = await RESPONSE.json()

            // OBTENIR LES INFORMATIONS DONT ON A BESOIN
            const TEMPERATURE = Math.round(DATA["main"]["temp"] - 273.15) // DE °K À CELSIUS
            const HUMIDITY = DATA["main"]["humidity"]

            // MISE A JOUR DE CHAQUE ELEMENT
            // MAJ ICONE
            const WEATHER_DESC = DATA["weather"][0]["description"]
            
            const WEATHER_ICON_DESC = {
                "clear sky": "weather_icons/sunny.png",
                "clouds": "weather_icons/partly_cloudy.png",
                "scattered clouds": "weather_icons/cloudy.png", 
                "broken clouds": "weather_icons/cloudy.png",
                "rain": "weather_icons/rainy.png",  
                "shower rain": "weather_icons/rainy.png", 
                "drizzle": "weather_icons/rainy.png",
                "thunderstorm": "weather_icons/thunderstorm.png", 
                "snow": "weather_icons/snowy.png",
                "mist": "weather_icons/foggy.png",
            }

            let balise = document.getElementById("icon-weather")
            let path = null
            for (cle in WEATHER_ICON_DESC) {
                if (WEATHER_DESC.includes(cle)) {
                    path = WEATHER_ICON_DESC[cle]
                }
            }
            if (path) {
                balise.src = path
            }

            // MAJ VILLE
            balise = document.getElementsByClassName("city")
            for (b of balise) {
                b.innerText = CITY
            }
            
            // MAJ ADJECTIFS + PHRASES

            const WEATHER_ADJ_DESC = {
                "clear sky": "sunny",
                "clouds": "cloudy",
                "scattered clouds": "cloudy", 
                "broken clouds": "cloudy",
                "rain": "rainy",  
                "shower rain": "rainy", 
                "drizzle": "rainy",
                "thunderstorm": "stormy", 
                "snow": "snowy",
                "mist": "foggy",
            }

            balise = document.getElementById("adjective")
            let adj = null

            if (path) {
                for (cle in WEATHER_ADJ_DESC) {
                    if (WEATHER_DESC.includes(cle)) {
                        adj = WEATHER_ADJ_DESC[cle]
                    }
                }
            }
            
            balise.innerText = adj

            let selectedQuote = "Have a nice day !"
            const QUOTES = {
                "sunny": "a bright day brings bright thoughts",
                "cloudy": "even the clouds have a silver lining",
                "rainy": "let the rain wash away your worries",
                "stormy": "after the storm comes the calm",
                "snowy": "snowflakes are the winters flowers",
                "foggy": "fog makes everything feel a little more mysterious"
            }

            if (adj) {
                selectedQuote = QUOTES[adj]
            }

            balise = document.getElementById("quote")
            balise.innerText = selectedQuote

            // MAJ TEMPERATURE
            balise = document.getElementById("temperature-api")
            balise.innerText = `${TEMPERATURE}°C`

            //MAJ HUMIDITE
            balise = document.getElementById("humidity-api")
            balise.innerText = `${HUMIDITY}%`

            // MAJS HEURES
            const DATE = new Date()

            // MAJ HEURE LOCALE
            const UTC_PLUS = Math.round(DATA["timezone"]/3600)
            const HEURE_LOCALE = `${DATE.getHours() + UTC_PLUS - 1}:${DATE.getMinutes()}`

            balise = document.getElementById("time-zone-api")
            balise.innerText = HEURE_LOCALE

            // MAJ HEURE LEVER
            const SUNRISE = new Date(DATA["sys"]["sunrise"] * 1000)
            balise = document.getElementById("sunrise-api")
            balise.innerText = `${SUNRISE.getHours()}:${SUNRISE.getMinutes()}` // VOIR SI ON DOIT APPLIQUER LE DECALAGE HORAIRE OU NON
            
            // MAJ HEURE COUCHER
            const SUNSET = new Date(DATA["sys"]["sunset"] * 1000)
            balise = document.getElementById("sunset-api")
            balise.innerText = `${SUNSET.getHours()}:${SUNSET.getMinutes()}` // VOIR SI ON DOIT APPLIQUER LE DECALAGE HORAIRE OU NON

            // MAJ VITESSE VENT
            const WIND_SPEED = DATA["wind"]["speed"]
            balise = document.getElementById("wind-speed-api")
            balise.innerText = `${WIND_SPEED}m/s`
            
            // MAJ VENT DEGRE
            const WIND_DEG = DATA["wind"]["deg"]
            balise = document.getElementById("wind-deg-api")
            balise.innerText = `${WIND_DEG}°`
        }
        else {
            alert("The city provided isn't valid, too bad !")
        }
    } catch (error) {
        console.error(`Something bad happened: ${error}`)
    }
}
