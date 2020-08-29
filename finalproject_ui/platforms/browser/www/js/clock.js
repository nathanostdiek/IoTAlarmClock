var myParticleAccessToken2 = "9086ccc59f51f65ab07e070c1e01aaba67904208";
var deviceId2 = "5500550005504b464d323520";
var topic2 = "CSE222-4/thisgarage/test";


var deviceId = "2d0030000947353138383138";
var myParticleAccessToken = "9086ccc59f51f65ab07e070c1e01aaba67904208";
var topic = "CSE222-7/finalproject/test2";
var hey = true;


function newEvent(object){
  try {
    var data = JSON.parse(object.data);

} catch(e) {
    console.log(e); // error in the above string (in this case, yes)!
}
   clock.lights_auto = data.lights_auto;
   clock.alarm = data.alarm;
   clock.alarm_on = data.alarm_on;
   clock.alarm_going_off = data.alarm_going_off;
   clock.weatherd = data.weatherd;


  clock.stateChange();
}

var clock = {
  lights_auto: null,
  alarm: null,
  alarm_on: null,
  alarm_going_off: null,
  weatherd: null,
  particle: null,
  stateChangeListener: null,



  setAlarm: function(a){
      this.alarm = a;
      var functionData = {
             deviceId: deviceId,
             name: "setAlarmP",
             argument: ""+this.alarm,
             auth: myParticleAccessToken
      }

      console.log(functionData);
      function onSuccess(e) { console.log("setAlarm call success") }
      function onFailure(e) {}// console.log("setLight call failed")//console.dir(e) }
      particle.callFunction(functionData).then(onSuccess, onFailure);

      this.stateChange();
  },

  setAlarmOn: function(a){
    this.alarm_on = a;
    var functionData = {
           deviceId: deviceId,
           name: "setAlarmOnP",
           argument: ""+this.alarm_on,
           auth: myParticleAccessToken
    }

    console.log(functionData);
    function onSuccess(e) { console.log("setAlarmOn call success") }
    function onFailure(e) {}// console.log("setLight call failed")//console.dir(e) }
    particle.callFunction(functionData).then(onSuccess, onFailure);

    this.stateChange();
  },

  setLights: function(a){
    this.lights_auto = a;
    var functionData = {
           deviceId: deviceId,
           name: "setLightsP",
           argument: ""+this.lights_auto,
           auth: myParticleAccessToken
    }

    console.log(functionData);
    function onSuccess(e) { console.log("setLights call success") }
    function onFailure(e) {}// console.log("setLight call failed")//console.dir(e) }
    particle.callFunction(functionData).then(onSuccess, onFailure);

    this.stateChange();
  },

  setWeather: function(a){
    this.weatherd = a;
    console.log(this.weatherd);
    var functionData = {
           deviceId: deviceId,
           name: "setWeatherDes",
           argument: ""+this.weatherd,
           auth: myParticleAccessToken
    }
    function onSuccess(e) { console.log("setWeather call success") }
    function onFailure(e) {}// console.log("setLight call failed")//console.dir(e) }
    particle.callFunction(functionData).then(onSuccess, onFailure);
    //
    // var functionData = {
    //        deviceId: deviceId,
    //        name: "setWeatherT",
    //        argument: ""+a[1],
    //        auth: myParticleAccessToken
    // }
    // particle.callFunction(functionData).then(onSuccess, onFailure);
    //
    // var functionData = {
    //        deviceId: deviceId,
    //        name: "setWeatherW",
    //        argument: ""+a[2],
    //        auth: myParticleAccessToken
    // }
    // particle.callFunction(functionData).then(onSuccess, onFailure);
    //
    // var functionData = {
    //        deviceId: deviceId,
    //        name: "setWeatherN",
    //        argument: ""+a[3],
    //        auth: myParticleAccessToken
    // }
    //
    // console.log(functionData);
    // function onSuccess(e) { console.log("setWeather call success") }
    // function onFailure(e) {}// console.log("setLight call failed")//console.dir(e) }
    // particle.callFunction(functionData).then(onSuccess, onFailure);

    this.stateChange();
  },

  setStateChangeListener: function(listener){
    this.stateChangeListener = listener;
  },
  //groups all data together and sends it
    stateChange: function(){
      var object = this;
      if(object.stateChangeListener){
        var state = {
          lights_auto: this.lights_auto,
          alarm: this.alarm,
          alarm_on: this.alarm_on,
          alarm_going_off: this.alarm_going_off,
          weatherd: this.weatherd
        };
      object.stateChangeListener(state);
    }
  },
  setup: function(){
      particle = new Particle();
      function onSuccess(stream){
        console.log("get stream success");
        stream.on('event', newEvent);

        var functionData = {
              deviceId: deviceId,
              name: "newState",
              argument: ""+ this,
              auth: myParticleAccessToken
        };

        console.log(functionData);

        particle.callFunction(functionData).then(onSuccess, onFailure);

        function onSuccess(e) { console.log("call success"); }
        function onFailure(e) { console.log("ERROR");
                                console.log("call call failed")
                                  console.dir(e) }
      }

      function onFailure(e) { console.log("getEventStream call failed")
                                console.dir(e) };
      particle.getEventStream(
        {
          name: topic,
          auth: myParticleAccessToken,
          deviceId: deviceId
        }
      ).then(onSuccess, onFailure);

    }

}
