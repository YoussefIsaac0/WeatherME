export async function GetGeoLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          const errorMessage = {
            [error.PERMISSION_DENIED]: "User denied the request for Geolocation.",
            [error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
            [error.TIMEOUT]: "The request to get user location timed out.",
            [error.UNKNOWN_ERROR]: "An unknown error occurred.",
          }[error.code] || "An unknown error occurred.";
          reject(new Error(errorMessage));
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

export function GetCurrentData(array, propertyName) { //fetching data from the current_condition property in the responce
  try{
  const value = array?.['data']?.current_condition?.[0]?.[propertyName];
  if (value === undefined) {
    console.warn("Invalid property name provided.");
    return "Not available";
  }
  return value;
}catch(e){
  console.log('a')
}
}


export function GetHourlyTemperature(arr) {
  try{
  const hourly = arr['data'].weather[0].hourly
  const clocks = ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"];

  // Ensure mapping will work as intended
  if (hourly.length !== clocks.length) {
    console.error("The number of hourly data points does not match the number of clocks.");
    return [];
  }

  // Map hourly temperature data to the corresponding clock times
  const result = hourly.map((entry, index) => ({
    hour: clocks[index],
    tempC: Number(entry.tempC)
  }));
  return result;
}catch(e){
  console.log('a')
}
}

export function GetDailyTemperature(arr) {
  try{
  const daily = arr['data'].weather
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   
  
  // Map hourly temperature data to the corresponding clock times
  const result = daily
  .slice(0, 7) // only a week
  .map((entry, index) => ({
    day: days[new Date(entry.date).getDay()],
    tempC: Number(entry.avgtempC), 
    minTemp:Number(entry.mintempC),
    maxTemp:Number(entry.maxtempC),
  }));
  console.log(result)
  return result;
}catch(e){
  console.log('Error Getting Daily Temperature')
}
}


