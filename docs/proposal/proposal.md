

# 1. Description
  I am going to design and create a physical alarm clock for users. The specified user will be a college
  student. It is hard to get out of bed and into the classroom on some mornings. A lot of planning has to go into getting ready for the day. When should I get up? What should I wear? How I am I going to get to class? Should I shave? All of these questions hinder the amount of time it takes to get ready and ultimately if the user will get out of bed at all. The solution of my alarm clock can help.

  This alarm clock will have an app that allows the user to control what features they want to use. There could be a light setting where when enough light is detected, it starts a specified timer to wake up the user. This device will solve the problem of getting students out of bed before class starts. It will provide them with information in order to get ready for the day quickly and efficiently. It would wake the user up, inform the weather outside, start a coffee maker, turn on the lights, etc. It also doubles as a nigh time clock that will play soothing sounds and predict when you should go to sleep based on alarm the next day. The sounds will be able to turn off after a set amount of time, so it doesn't run all night. Another feature will be to look up local transportation services and see when they are leaving for school. All of these features will hopefully make it easier for the user to get up out of bed quicker.

  This alarm clock holds value over other physical alarm clocks because it allows the user to program certain tools used by device for their usage. It does much more than wake up the user, it provides a useful experience that provides information so the user doesn't have to spend time searching for it on their phone. Using IoT is beneficial because an easy to use interface on a user's phone or computer will be compatible with the clock to set the features. The cost is extremely low and affordable for the services it provides. The maintenance and installation will be minimal as it is a clock. More developing features could be added in the future based on user feedback or advances in technology.

# 2. Hardware and Cloud Infrastructure Needed

## Hardware:
  - OLED to display data (or speaker if I had it)
  - light sensor for time
  - photon, wires, LEDs, resistors
  - buzzing or beeping device to wake up user

## Cloud Infrastructure:
  - transportation API to check Metro and shuttle
  - Weather API to check local weather based on location
  - Music library that allows user to play sounds

# 3. Unknowns and Challenges
  I am unsure of the amount of features that I will be able to implement and make work together.
  If there is a way to get local metro data or WashU shuttle data based on location.
  I don't know if I will get a speaker or if it is possible to say certain information or display it on the OLED.
  What all to display on the OLED screen.

# 4. User Stories & Usage Scenarios
  My roommate sometimes skips class because he cannot get out of his warm, cozy bed. He wants to be a good student, but sometimes his lack of sleep catches up to him. I want to help him with his problem by creating an alarm clock that provides features so he can get ready quickly. He needs to get up early enough so he can catch a Metro or WashU shuttle to campus and get to class. The weather will provide him information on what to wear. The night before, it will calculate how much sleep he needs for him to be will rested and will help fall into a deep sleep with soothing sounds.

# 5. Paper Prototypes

# 6. Implementation: Sequence Diagrams

title Transportation
participant OLED
participant Photon
participant Particle.io
participant API
Particle.io -> API: Timer went off
API -> Particle.io: returns data about train
Particle.io -> Photon: receives data
Photon -> OLED: displays data for user

Getting Transportation information (the weather API would work similarly)

title Alarm
participant Speaker
participant Photon
participant Particle.io
participant UI

UI -> Particle.io: User sets time for alarm

Particle.io -> Photon: sends data

Photon -> Speaker: emits sound when the time is reached

Setting alarm and speaker going off (Turning on lights will work similarly)

# 7. Plan and Schedule

## Weekly Schedule / Progress

| Week End     | Deliverables & Accomplishments |
|:-------------|:-------------------------------|
| By Nov 16    |    UI and one feature                    |
| By Nov. 23   |    All features and slight cloud functionality                             |
| By Nov. 30   |    Cloud functions working with UI                            |
| Dec. 3       |  Complete Project Due!         |

## Group Member Responsibilities (Groups only)

| Name         | Responsibilities |
|:-------------|:-----------------|
|   Nathan Ostdiek           |         Everything         |
|              |                  |

## Times Reserved for Project Work

Fill in a schedule of times reserved for the project.  If you can't set regular weekly times, create a schedule based on specific days.

| Week Day | Times | Who (if on a team) |
|:---------|:------|--------------------|
| Monday   |       |                    |
| Tuesday  |  1 hour      |        ME            |
| Wednesday|       |                    |
| Thursday |       |                    |
| Friday   |   2 hours    |      Me              |
| Saturday |   2 hours    |         Me           |
| Sunday   |   2 hours    |       Me             |
