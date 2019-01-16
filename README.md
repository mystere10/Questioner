# Questioner

[![Build Status](https://travis-ci.org/mystere10/Questioner.svg?branch=develop)](https://travis-ci.org/mystere10/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/mystere10/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/mystere10/Questioner?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d6f6a7a20c59dbc34ba1/maintainability)](https://codeclimate.com/github/mystere10/Questioner/maintainability)
[![Packagist](https://img.shields.io/packagist/vpre/symfony/symfony.svg)]()

This project will allow users to post questions for meet up and members can prioritize by up voting or down voting a questions to be answered 
This project will allow users to post questions for meetups and members can prioritize by upvoting or downvoting questions to be answered.
Admin can add meetups and delete them, In order for a user to post a question to a specific meetup they need to register
into the system so that they can log in an be presented with all system features.

# ENVIRONMENT 
1. Node.js
2. No templates used for the UI (User Interface)
3. No frameworks used for backend (Postgresql and data structure was used to store data)

# DEPLOYMENTS
[https://mystere10.github.io/Questioner/register.html](UI is hosted on gh-pages)

[https://nku-questioner.herokuapp.com/](The backend is hosted on heroku)

[https://mystere10.github.io/Questioner/userhome.html](User homepage)

[https://mystere10.github.io/Questioner/profile.html](Profile page)

[https://mystere10.github.io/Questioner/admin](Admin homepage)

[https://mystere10.github.io/Questioner/create.html](Create meetup page)

# UI links
[https://mystere10.github.io/Questioner/register.html](Rgistration page)

[https://mystere10.github.io/Questioner/login.html](Login page)

# API ENDPOINTS
## Meetups endpoints
`POST /api/v1/meetups`: [https://nku-questioner.herokuapp.com/api/v1/meetups](This will post a meetup).

`GET /api/v1/meetups/<meetup-id>`: [https://nku-questioner.herokuapp.com/api/v1/meetups/<meetup-id>](Will get a stored meetups with a specific id).

`GET /api/v1/meetups/`: [https://nku-questioner.herokuapp.com/api/v1/meetups/](Will get all stored meetups).

`GET /api/v1/meetups/upcoming/`: [https://nku-questioner.herokuapp.com/api/v1/meetups/upcoming/meetups](Will fetch all upcoming meetups).

`POST /api/v1/meetups/<meetup-id>/rsvps`: [https://nku-questioner.herokuapp.com/api/v1/meetups/1/rsvps](Will respond to a meetup).

## Question endpoints
`POST /api/v1/meetups/<meetup-id>/questions`: [https://nku-questioner.herokuapp.com/api/v1/meetups/<meetup-id>/questions](Post a question).

`PATCH /api/v1/questions/<question-id>/upvote`: [https://nku-questioner.herokuapp.com/api/v1/questions/<question-id>/upvote](Will upvote a question).

`PATCH /api/v1/questions/<question-id>/downvote`: [https://nku-questioner.herokuapp.com/api/v1/questions/<question-id>/downvote](Will downvote a question).

## User endpoints
`POST /api/v1/signup`: [https://nku-questioner.herokuapp.com/api/v1/signup](Post a user).

# POSTMAN
[https://www.getpostman.com/](Get postman for the implementation of the above enpoints).


