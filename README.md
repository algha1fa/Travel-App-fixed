# Weather-Journal App Project

## Overview

This project demonstate how api can be nest to each other to get the weateher forecast
## Instructions
`cd` into your new folder and run:
- `npm install`

This step will install all the dependencies required :
devDependencies": {
        "@babel/core": "^7.5.4",   //
        "@babel/preset-env": "^7.5.4",
        "babel-loader": "^8.0.6",
        "clean-webpack-plugin": "^3.0.0",
        "css-loader": "^5.0.1",
        "html-webpack-plugin": "^3.2.0",
        "jest": "^26.6.3",
        "node-sass": "^5.0.0",
        "sass-loader": "^10.1.0",
        "style-loader": "^2.0.0",
        "webpack-dev-server": "^3.7.2"

This will ensure that user's javascript and styles are incorporated into the final project.Pocessed indexx.html and main.js is generated on successful build.

## Setting up the APIs:
### Step 1: Signup for an API key
A>First go to : http://api.geonames.org , create an account and  you will get api  key.
B>Next go to https://www.weatherbit.io/api and create an account
C>Then go to https://pixabay.com/accounts/register/?source=main_nav to create new account

Note down all the necesasary api keys/user names and configure it as API needed for URL

Once user runs the appliation , he will enter the zipcode and location where is he planning to travel(Its assumed location is within USA).Also user has to enter start date and end date.
If the startdate of the travel is withing 7 days from today's date it will call api http://api.weatherbit.io/v2.0/forecast/daily to fetch the weather forecast.
But if the travel date is more than 7 days, we are using historical data to predict the weather.To get the historical data we use http://api.weatherbit.io/v2.0/history/daily
To get this ,we decrement current year by 1 and then we pass that date to this api so that we get the data og exact 1 year back date 

Once we fetch the data, we try to fetch the picture of the location where user is planning to travel and display it.




## Extras
Note to Instructor:
I have implemented the optional work project as number of days of trips.This is done by adding the field end date .
Then the difference of end date and start date is found and displyaed in the result.