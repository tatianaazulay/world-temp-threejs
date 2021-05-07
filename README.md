world temperatures three js visualization

Demo app with three.js and node.js deployed at heroku.
https://threejs-data-visualization.herokuapp.com/

The data for the project comes from Kaggle public datasets portal, where it can be downloaded by Country, State or Major City under License CC BY-NC-SA 4.0: https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data

For this project I used Global Land Temperatures By Major City CSV file. I used SQL to filter 100 cities to be included in the visualization and I calculated average temperatures by year for each city. I narrowed the number of years to be represented to 17 years.

This app uses three.js to render 3D meshed to represent avarage land temperatures for a year at certain locations.
dat.gui dropdown controll allowes to change the yaer for representation.

How to install

You can install it locally (node js and npm are required):
cd to world-temp-threejs folder

run

npm install

How to use

run

node index.js
or
npm start

It'll be served at 127.0.0.1:5000
