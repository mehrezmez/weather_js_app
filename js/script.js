let keyApi = "ee1a135bd0ed8e48236d3a3ef71ce92a";

navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${keyApi}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        let currentHour = document.querySelector(".hour");
        let currentDate = document.querySelector(".date");
        let humidity = document.querySelector(".humidity > span:nth-of-type(2)");
        let pressure = document.querySelector(".pressure > span:nth-of-type(2)");
        let wind = document.querySelector(".wind > span:nth-of-type(2)");
        let sunrise = document.querySelector(".sunrise > span:nth-of-type(2)");
        let sunset = document.querySelector(".sunset > span:nth-of-type(2)");
        let locationWord = document.querySelector(".location-word");
        let locationCoord = document.querySelector(".location-coord");

        humidity.textContent = data.current.humidity + "%";
        pressure.textContent = data.current.pressure;
        wind.textContent = data.current.wind_speed;

        let sunriseTime = new Date((data.current.sunrise) * 1000);
        sunrise.textContent = `${sunriseTime.getUTCHours() + 1}:${sunriseTime.getUTCMinutes()}`;
        let sunsetTime = new Date((data.current.sunset) * 1000);
        sunset.textContent = `${sunsetTime.getUTCHours() + 1}:${sunsetTime.getUTCMinutes()}`;

        let dateTime = new Date((data.current.dt) * 1000);
        if (dateTime.getUTCMinutes() < 10) {
            currentHour.textContent = `${dateTime.getUTCHours() + 1}:0${dateTime.getUTCMinutes()}`;
        } else {
            currentHour.textContent = `${dateTime.getUTCHours() + 1}:${dateTime.getUTCMinutes()}`;
        }

        let day;
        let month;
        switch (dateTime.getUTCDay()) {
            case 0: {
                day = "Sunday";
                break;
            } case 1: {
                day = "Monday";
                break;
            } case 2: {
                day = "Tuesday";
                break;
            } case 3: {
                day = "Wednesday";
                break;
            } case 4: {
                day = "Thursday";
                break;
            } case 5: {
                day = "Friday";
                break;
            } case 6: {
                day = "Saturday";
                break;
            }
        }
        switch (dateTime.getUTCMonth()) {
            case 0: {
                month = "Jan";
                break;
            } case 1: {
                month = "Feb";
                break;
            } case 2: {
                month = "Mar";
                break;
            } case 3: {
                month = "Apr";
                break;
            } case 4: {
                month = "May";
                break;
            } case 5: {
                month = "Jun";
                break;
            } case 6: {
                month = "Jul";
                break;
            } case 7: {
                month = "Aug";
                break;
            } case 8: {
                month = "Seb";
                break;
            } case 9: {
                month = "Oct";
                break;
            } case 10: {
                month = "Nov";
                break;
            } case 11: {
                month = "Dec";
                break;
            }
        }
        currentDate.textContent = `${day}, ${dateTime.getUTCDate()} ${month}`;

        locationWord.textContent = data.timezone;
        locationCoord.textContent = `${data.lat} / ${data.lon}`;

        let daySectionTwo = [];
        let dayText = document.querySelectorAll(".section-two .day");
        for (let i = 0; i < data.daily.length - 1; i++) {
            daySectionTwo.push(data.daily[i].dt);
            let dayName = new Date((daySectionTwo[i]) * 1000);
            switch(dayName.getUTCDay()) {
                case 0: {
                    if (dayText[i].parentElement.className == "big") {
                        dayText[i].textContent = "Sunday";
                    } else {
                        dayText[i].textContent = "Sun";
                    }
                    break;
                } case 1: {
                    if (dayText[i].parentElement.className == "big") {
                        dayText[i].textContent = "Monday";
                    } else {
                        dayText[i].textContent = "Mon";
                    }
                    break;
                } case 2: {
                    if (dayText[i].parentElement.className == "big") {
                        dayText[i].textContent = "Tuesday";
                    } else {
                        dayText[i].textContent = "Tue";
                    }
                    break;
                } case 3: {
                    if (dayText[i].parentElement.className == "big") {
                        dayText[i].textContent = "Wednesday";
                    } else {
                        dayText[i].textContent = "Wed";
                    }
                    break;
                } case 4: {
                    if (dayText[i].parentElement.className == "big") {
                        dayText[i].textContent = "Thursday";
                    } else {
                        dayText[i].textContent = "Thu";
                    }
                    break;
                } case 5: {
                    if (dayText[i].parentElement.className == "big") {
                        dayText[i].textContent = "Friday";
                    } else {
                        dayText[i].textContent = "Fri";
                    }
                    break;
                } case 6: {
                    if (dayText[i].parentElement.className == "big") {
                        dayText[i].textContent = "Saturday";
                    } else {
                        dayText[i].textContent = "Sat";
                    }
                    break;
                }
            }
        }

        let nightTemp = document.querySelectorAll(".night-temp");
        let dayTemp = document.querySelectorAll(".day-temp");
        for (let i = 0; i < data.daily.length - 1; i++) {
            nightTemp[i].textContent = "night - " + data.daily[i].temp.night + "°C";
            dayTemp[i].textContent = "day - " + data.daily[i].temp.day + "°C";
        }

        let icon = document.querySelectorAll(".section-two img");
        for (let i = 0; i < data.daily.length - 1; i++) {
            if (i == 0) {
                icon[i].src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@4x.png`;
            } else {
                icon[i].src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
            }
        }

        console.log(data);
    })
})