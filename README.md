# Quebec 2022 Elections - Visualizer
### Davit Voskerchyan
### [davitvoskerchyan@outlook.com](mailto:davitvokserchyan@outlook.com)

# DESCRIPTION
<p>
Using the MERN stack, as a team we created the Quebec 2022 Election results. <br>
https://gitlab.com/520-01-F22/section01/projteam03/dabbaghian-voskerchyan-yildirim/-/tree/staging.<br> We used a ESLinter to have standarzied code ovcer all developers. We also used a basic CI/CD pipeline to ensure all our tests, eslint and build commands function<br>
</p>
<p>
<b>
I redid the whole project using TypeScript and Vite and Redis for server side caching</b> <br>
During my development, I optomized the code and made it cleaner. 
I also made it more modular to be able to include other election data in the future. <br>
I than deployed it to railway.app. <br>
<br>
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
