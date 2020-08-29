
//get pages into divs by id
var login_page = document.getElementById('loginpage');
var create_account_page = document.getElementById('create_account_page');
var control_page = document.getElementById('controlpage');
var advanced_controls_page = document.getElementById('advanced_controls_page');
var night_time_page = document.getElementById('night_time_page');
var topofeverypage = document.getElementById('topofeverypage');


//get Buttons by id
var signin_button = document.getElementById('signin');
var create_account_button = document.getElementById('user_create_account');
var backto_login_button = document.getElementById('gotologin');
var advanced_controls_button = document.getElementById('advancedcontrolsbutton');
var control_page_button = document.getElementById('controlspagebutton');
var night_time_button = document.getElementById('nighttimecontrolsbutton');
var sleep_calc_input = document.getElementById('sleepcalc');
var logout_button = document.getElementById('logoutuser');
var alarm_enabled_button = document.getElementById('alarm_enabled');
var weather_submit = document.getElementById('weathercheck');
var create_to_login_button = document.getElementById('createdaccount');
var light_auto_button = document.getElementById('lightauto');

//variables values
var alarm_button = document.getElementById('timef');
var current_alarm_time;
var alarm_sound_time;
var zipcode_location = document.getElementById('zipcode_weather');
var zipcode_value;
var apikey = "630f9f047b30a2f3d4da5d93e2bf20cc";
var alarm_set_forsure;


//correct divs on page load
document.addEventListener("DOMContentLoaded", function(event) {
  login_page.style.display = "block";
  create_account_page.style.display = "none";
  control_page.style.display = "none";
  advanced_controls_page.style.display = "none";
  night_time_page.style.display = "none";
  topofeverypage.style.display = "none";
});

//screen transitions
create_account_button.addEventListener("click", function(){
  login_page.style.display = "none";
  create_account_page.style.display = "block";
});

create_to_login_button.addEventListener("click", function(){
  create_account_page.style.display = "none";
  control_page.style.display = "block";
  topofeverypage.style.display = "block";


});
logout_button.addEventListener("click", function(){
  control_page.style.display = "none";
  login_page.style.display = "block";
  topofeverypage.style.display = "none";
  advanced_controls_page.style.display = "none";
  night_time_page.style.display = "none";

});

advanced_controls_button.addEventListener("click", function(){
  topofeverypage.style.display = "block";

  control_page.style.display = "none";
  advanced_controls_page.style.display = "block";
  night_time_page.style.display = "none";

});

control_page_button.addEventListener("click", function(){
  topofeverypage.style.display = "block";

  control_page.style.display = "block";
  advanced_controls_page.style.display = "none";
  night_time_page.style.display = "none";

});

night_time_button.addEventListener("click", function(){
  night_time_page.style.display = "block";
  control_page.style.display = "none";
  advanced_controls_page.style.display = "none";
  topofeverypage.style.display = "block";

});

signin_button.addEventListener("click", function(){
  login_page.style.display = "none";
  control_page.style.display = "block";
  topofeverypage.style.display = "block";
  advanced_controls_page.style.display = "none";

});

backto_login_button.addEventListener("click", function(){
  create_account_page.style.display = "none";
  login_page.style.display = "block";
});

//updates current alarm time
alarm_button.addEventListener("change", function(){
  current_alarm_time = alarm_button.value;
  var a = new Date();
  alarm_sound_time = a.getMinutes() - current_alarm_time.substring(current_alarm_time.length - 2, current_alarm_time.length);
  if(alarm_sound_time < 0){
    alarm_sound_time = alarm_sound_time + 60;
  }
  if(parseInt(current_alarm_time.substring(0,2)) >= 12){
    var newone = parseInt(current_alarm_time.substring(0,2)) - 12;
    var newer = current_alarm_time.substring(3, current_alarm_time.length);
    if(newone < 10){
      newone = "0" + newone;
    }
    if(newone == "00"){
      newone = "12";
    }
    clock.setAlarm(newone +":"+ newer + " PM");
  }
  else{
    if(parseInt(current_alarm_time.substring(0,2)) == "00"){
      var newone = "12" + ":" + current_alarm_time.substring(3, current_alarm_time.length);
      clock.setAlarm(newone + " AM");
    }
    else{
      clock.setAlarm(current_alarm_time + " AM");

    }
  }
});

alarm_enabled_button.addEventListener("change", function(){
  if(alarm_set_forsure == true){
    clock.setAlarmOn(false);
    alarm_set_forsure = false;
  }
  else {
    clock.setAlarmOn(true);
    alarm_set_forsure = true;
  }
});

//Calculation for how much sleep you should get
sleep_calc_input.addEventListener("change", function(){
  if(sleep_calc_input.value > 24 || sleep_calc_input.value < 1){
    sleep_calc_input.value = '';
    alert("Error. Input must be between 1 and 24 hours (inclusive).");
  }
  else {

  //formats the time correctly
  var a = parseInt(current_alarm_time) - sleep_calc_input.value;
  if(current_alarm_time == null){
    document.getElementById('displaytimeforsleep').innerHTML = "No Alarm Set.";
  }
  else {

  if(a > 12){
    a = a - 12 + current_alarm_time.substring(current_alarm_time.length - 3, current_alarm_time.length) + " PM";
  }
  else if(a == 0){
    a = 12 + current_alarm_time.substring(current_alarm_time.length - 3, current_alarm_time.length) + " AM";
  }
  else {
    a = a + current_alarm_time.substring(current_alarm_time.length - 3, current_alarm_time.length) + " AM";
  }
  document.getElementById('displaytimeforsleep').innerHTML = "You should go to bed at " + a;
  }
  console.log(current_alarm_time);

}
});

zipcode_location.addEventListener("change", function(){
  zipcode_value = zipcode_location.value;
});
var l = false;
light_auto_button.addEventListener("change", function(){
  if(document.getElementById('light_input').value == ""){
    alert("Please set up lights on Feature SetUp page.");
    light_auto_button.checked = false;
  }
  else {
    if(l == false){
      l = true;
      clock.setLights(l);
    }
    else if(l == true){
      l = false;
      clock.setLights(l);

    }
  }
});
//weather variables
var weather_temp;
var weather_wind;
var weather_des;
var weather_rain;
var weatherd;

function searchingWeather(event) {
  event.preventDefault();

  var getWeather = new XMLHttpRequest();

  getWeather.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var weather = JSON.parse(this.responseText);
        weather_temp = Math.round(((weather.main.temp - 273.15) * 9/5 + 32)) + " degrees";
        weather_wind = weather.wind.speed + " mph winds";
        weather_des = weather.weather[0].description;
        weather_name = weather.name;
        weatherd = [weather_des, weather_temp, weather_wind, weather_name];
        clock.setWeather(weatherd);
        }
      else if (this.readyState == 4) {
        console.log(this.responseText);
    }
  }
  getWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?zip="+ zipcode_value + "&APPID=" + apikey);
  getWeather.send();
//407066
}


weather_submit.addEventListener("click", searchingWeather);

function clockChange(state){
   console.log("clockChange");
   console.log(state);


  if(state.alarm_going_off == "true"){
    state.alarm_going_off = "false";
    alarm_enabled_button.checked = false;
  }
  if(state.alarm_on == "false"){
    alarm_set_forsure = false;
  }
  if(state.alarm_on == "true"){
    alarm_set_forsure = true;
  }


  //show morning page screen when it is time
  // document.getElementById('weather_morn').innerHTML += weather_temp;
  // document.getElementById('weather_morn').innerHTML += weather_wind;
  // document.getElementById('weather_morn').innerHTML += weather_des;
  // document.getElementById('weather_morn').innerHTML += weather_rain;



};

//gets garage status
document.addEventListener("DOMContentLoaded", function(event){
  clock.setStateChangeListener(clockChange);
  clock.setup();

})
