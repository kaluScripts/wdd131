// Dynamic footer content
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

// Static weather inputs (metric: °C and km/h) matching the displayed conditions
const temperatureC = 31;
const windSpeedKmh = 14;

// Returns the wind chill factor in °C using the Environment Canada metric formula
function calculateWindChill(temp, wind) {
  return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
}

const windChillOutput = document.getElementById("windchill");

if (temperatureC <= 10 && windSpeedKmh > 4.8) {
  windChillOutput.textContent = calculateWindChill(temperatureC, windSpeedKmh) + " °C";
} else {
  windChillOutput.textContent = "N/A";
}
