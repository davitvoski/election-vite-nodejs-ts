# Quebec 2022 Elections - Visualizer
### Davit Voskerchyan
### [davitvoskerchyan@outlook.com](mailto:davitvokserchyan@outlook.com)

## DESCRIPTION
<p>
Using the MERN stack, I lead my team to create the Quebec 2022 Election results visualizer. <br>
We used a ESLinter to have standarzied code with all developers. We also used a basic CI/CD pipeline to ensure all our tests, eslint and build commands are passed.

 https://gitlab.com/520-01-F22/section01/projteam03/dabbaghian-voskerchyan-yildirim/-/tree/staging.

</p>

## What I Did?
<p>
I led the team to create the Quebec 2022 Election results visualizer. <br>
I redid the project using Typescript for both backend and frontend. <br>
I optomized and modularized the code to make it more readable and easier to maintain of mine and my teammates. 
<br>

##### The Frontend was done with React using Vite, TailwindCSS, and some viusalization libraries (react-simple-maps & recharts). <br>
I added 2018 Quebec election results.
I added 2020 British-Columbia election results.
I used react-router-dom to create the routes for the different provinces and its election years.

##### The Backend was done with NodeJS, Express, and MongoDB.
I used Redis to cache the results of the API calls.
I created Scripts to be save the data to the database.
</p>

## Website
https://elections.up.railway.app/
https://elections-md6y.onrender.com/

## To Create a Map
1. Import Electoral Districts shapefile to https://mapshaper.org/
2. Use $ proj wgs84 commmand to convert the shapefile to WGS84

# Set Up - Local

1. Clone the repository: git clone https://github.com/davitvoski/quebec-election-vite-ts

2. Add .env file inside the ./server folder.
3. Add the following variables to the .env file:

    - ATLAS_URI="YOUR_MONGODB_URI" - https://www.mongodb.com/
    - DATABASE_NAME="ElectionResultsQC_2022"
    - REDIS_URL="Your Redis URL" - https://app.redislabs.com/#/login

4. If you get .env errors please try to move the .env file to the root folder.

    - The error should contain something like "startswith...".

5. Run the following commands:

    1. npm run build
    2. cd ./server/util/quebec
    3. ts-node addDistrictsToDB.ts
    4. ts-node addMapDataToDB.ts
    5. Repeat step 2-4 for each state and its election years by changing the paths;
6. npm run start

6. Open http://localhost:3001 to view it in the browser.

# THANK YOU
