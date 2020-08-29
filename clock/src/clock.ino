/*
 * Project AlarmClock
 * Description: Final Project
 * Author: Nathan Ostdiek
 * Date: November 25th
 */


 #include "Adafruit_SSD1306/Adafruit_SSD1306.h"

//Nate's Photon
 String myParticleAccessToken2 = "9086ccc59f51f65ab07e070c1e01aaba67904208";
 String deviceId2 = "5500550005504b464d323520";
 String topic2 = "CSE222-7/finalproject/test";

//Gomoku guy
 String deviceId = "2d0030000947353138383138";
 String myParticleAccessToken = "9086ccc59f51f65ab07e070c1e01aaba67904208";
 String topic = "CSE222-7/finalproject/test2";

enum clockState {idle, wakeup_screen_idle, wakeup_screen, default_screen, weather_screen_idle};
clockState place;


const int LIGHT = D0;
const int LIGHT_SWITCH = A0;
const int BUTTON = D1;
const int WEATHER_BUTTON = D6;
bool alarmset_check;
String double_checker;
// use hardware SPI
#define OLED_DC     D3
#define OLED_CS     D4
#define OLED_RESET  D5
Adafruit_SSD1306 display(OLED_DC, OLED_RESET, OLED_CS);
String light_guy;
String alarm_time;
String alarm_on;
String alarm_going_off = "false";
int  x, minX;
bool alreadyDone = false;
String weather_des;
String weather_T;
String weather_W;
String weather_N;
bool weatherdisplay;


//Timer for Beeper to turn on and off
bool beeper = false;
void beep_onoff(){
  if(beeper == false){

    tone(D2, 10000, 500);
  }
  if(beeper == true){
    noTone(D2);
  }
  beeper = !beeper;
}
int current = 0;
void fade(){
  current += 1;
  analogWrite(LIGHT, current);
}
Timer beep(500, beep_onoff);
Timer fadetimer(1000, fade);

clockState nextState(clockState place){
  switch(place){
    case idle:
      weatherdisplay = false;
      if(digitalRead(WEATHER_BUTTON) == 0){
        place = weather_screen_idle;
      }
      if(digitalRead(LIGHT_SWITCH) == 1){
        if(light_guy == "false"){
          light_guy = "true";
          digitalWrite(LIGHT, HIGH);
        }
        else{
          fadetimer.stop();
          current = 0;
          digitalWrite(LIGHT, LOW);
          light_guy = "false";
        }

      }
      break;
    case wakeup_screen_idle:
      //display wake up screen
      alreadyDone = true;
      if(digitalRead(BUTTON) == 1){
        place = wakeup_screen;
      }
      break;
    case wakeup_screen:
      if(digitalRead(BUTTON)==0){
        turnoff_alarm();
        place = idle;
      }
      break;

    case default_screen:
      //display data
      break;

    case weather_screen_idle:
      //display weather
      weatherdisplay = true;
      if(digitalRead(WEATHER_BUTTON) == 1){
        weatherdisplay = false;
        place = idle;
      }
      if(digitalRead(LIGHT_SWITCH) == 1){
        fadetimer.stop();
        current = 0;
        digitalWrite(LIGHT, LOW);
      }

      break;

  }
  return place;
}

int newState(String s){
  publishState();
}

int c;
void wakey_wakey(){
  beep.start();
  tone(D2, 10000, 500);
  if(light_guy == "true"){
    fadetimer.start();
  }

}

//turns off alarm
void turnoff_alarm(){
  alarm_going_off = "false";
  alreadyDone = false;
  beep.stop();
  display.clearDisplay();
  noTone(D2);
  newState("S");
}

int publishState(){
  String data = "{";
  data += "\"lights_auto\": ";
  data += "\"" + light_guy+ "\"";
  data += ", ";
  data += "\"alarm\": ";
  data += "\"" + alarm_time+ "\"";
  data += ", ";
  data += "\"alarm_on\": ";
  data += "\"" + alarm_on+ "\"";
  data += ", ";
  data += "\"alarm_going_off\": ";
  data += "\"" + alarm_going_off+ "\"";
  data += "}";
  Serial.println(data);
  Particle.publish(topic, data, 60, PRIVATE);
  return 0;
}


int setAlarmP(String s){
  alarm_time = s;
  double_checker = alarm_time.substring(0,2) + alarm_time.substring(3, 5) + alarm_time.substring(alarm_time.length()-2, alarm_time.length());
  alarmset_check = true;
  newState("S");
}

int setAlarmOnP(String s){
  alarm_on = s;
  newState("S");
}

int a;
int b;
int ce;
int d;
String temp;
int setWeatherDes(String s){
  temp = s;
  a = temp.indexOf(',');
  b = temp.indexOf(',', a+1);
  ce = temp.indexOf(',', b+1);
  d = temp.indexOf(',', ce+1);
  weather_des = temp.substring(0, a);
  weather_T = temp.substring(a+1, b);
  weather_W = temp.substring(b+1, ce);
  weather_N = temp.substring(ce+1, d);

}
int setLightsP(String s){
  light_guy = s;
  newState("S");
}

 void setup() {
  Serial.begin(9600);
  display.begin(SSD1306_SWITCHCAPVCC);

 display.setTextSize(7);       // text size
 display.setTextColor(WHITE); // text color
 display.setTextWrap(false); // turn off text wrapping so we can do scrolling
 x    = display.width(); // set scrolling frame to display width
 minX = -1500; // 630 = 6 pixels/character * text size 7 * 15 characters * 2x slower

 //Particle functions and variables
 Particle.function("setAlarmP", setAlarmP);
 Particle.variable("alarm_time", alarm_time);
 Particle.function("setAlarmOnP", setAlarmOnP);
 Particle.variable("alarm_on", alarm_on);
 Particle.function("newState", newState);
 Particle.variable("light_guy", light_guy);
 Particle.function("setLightsP", setLightsP);
 Particle.variable("alarm_going_off", alarm_going_off);
 Particle.function("setWeatherDes", setWeatherDes);

 pinMode(BUTTON, INPUT_PULLDOWN);
 pinMode(LIGHT, OUTPUT);
 pinMode(WEATHER_BUTTON, INPUT_PULLUP);
 pinMode(LIGHT_SWITCH, INPUT_PULLDOWN);

 newState("S");

}
unsigned long lastSync = millis();


 void loop() {
     place = nextState(place);

     //correct time zone and format
     waitUntil(Particle.syncTimeDone);
     Time.zone(-6);

     //Draws board

     display.clearDisplay();
     display.setTextSize(1);
     display.setTextColor(WHITE);
     display.setCursor(18,0);
     //Formats time correctly
     String timething = Time.timeStr();
     int counter = timething.length();
     if(alarm_going_off == "false" && weatherdisplay == false){
       display.print(timething.substring(0, counter/2 - 1));
       display.println(timething.substring(counter-4, counter));
       display.setCursor(28,15);
       display.println(Time.format(Time.now(), "%I:%M:%S %p"));

     }

     //displays weather screen
    if(weatherdisplay == true){
      display.setCursor(0,0);
      if(temp == false){
        display.println("Please input valid");
        display.println("zipcode in field.");
      }
      else {
        display.println("Current Weather in ");
        display.print(weather_N);
        display.println(" is: ");
        display.println(" ");
        display.println(weather_des);
        display.println(weather_T);
        display.println(weather_W);
      }
    }

     //checks for alarm to go off
     if(Time.format(Time.now(), "%I%M%p") == double_checker && alarm_on == "true"){
       if(alreadyDone == false){
         wakey_wakey();
         alarm_going_off = "true";
         alarm_on = "false";
         newState("S");
         place = nextState(wakeup_screen_idle);
      }

     }

     //checks if alarm is set to display
     else if(alarm_on == "true" && alarmset_check == true && weatherdisplay == false){
       display.setCursor(8,30);
       display.print("Alarm set: ");
       display.println(alarm_time);
     }

     //display for alarm going off
     if(alarm_going_off == "true"){
       display.clearDisplay();
       display.setCursor(3,30);
       display.setTextSize(2);
       display.println("GET UP!!");
     }

     if(current > 254){
       fadetimer.stop();
       current = 0;
     }
    display.display();
 }
