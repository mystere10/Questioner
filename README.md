# Questioner

[![Build Status](https://travis-ci.org/mystere10/Questioner.svg?branch=develop)](https://travis-ci.org/mystere10/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/mystere10/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/mystere10/Questioner?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d6f6a7a20c59dbc34ba1/maintainability)](https://codeclimate.com/github/mystere10/Questioner/maintainability)
[![Packagist](https://img.shields.io/packagist/vpre/symfony/symfony.svg)]()

This project will allow users to post questions for meetups and members can prioritize by upvoting or downvoting questions to be answered.
Admin can add meetups and delete them, In order for a user to post a question to a specific meetup they need to register
into the system so that they can log in an be presented with all system features.

# ENVIRONMENT 
1. Node.js
2. No templetes used for the UI (User Interface)
3. No frameworks used for backend (Postgresql and data structure was used to store data)

# API ENDPOINTS
## Meetups endpoints
`POST /meetups`: This will post a meetup.

`GET /meetups/<meetup-id>`: Will get a stored meetups with a specific id.

`GET /meetups/`: Will get all stored meetups.

`GET /meetups/upcoming`: Will fetch all upcoming meetups.

`POST /meetups/<meetup-id>/rsvps`: Will respond to a meetup.

## Question endpoints
`POST /questions`: Post a question (create a question).

`PATCH /questions/<question-id>/upvote`: Will upvote a question.

`PATCH /questions/<question-id>/downvote`: Will downvote a question.




