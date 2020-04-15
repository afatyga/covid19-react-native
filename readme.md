# HW 7 Alex Fatyga

# Assignment
Use CODVID-19 API (Documentation using postman) to build mobile application that displays:
- CODVID cases per country on a MAP
- CODVID cases per country Live on a MAP (changes)
- CODVID cases per country based on a date.
- Summary of total cases for the world
- Live Summary for the World <br><br>
Stretch goal:
- Display data per Province
- User can put their address and track CODVID-19 in their neighborhood (Only in countries where regional data is provided)
<br>
You should document your architecture and design decisions as you go on GitHub.
Provide screenshots and video links for all steps in your GitHub repository

# Steps
1. Setup your REACT Native Environment
2. Go through REACT native Tutorial
- Build Hello Applications
- Run Hello applications on emulator and your phone.
- It will be great to run it on two phones if you can (iOS and Android)
3. Develop use case to display a map.  (GitHub location)
4. On separate branch, exercise the CODVID-19 API (Documentation using postman) and display the data in your application as text.  Be fancy!  Style your results.
5. Overlay the data on the maps.

# Milestone Deadlines
- Step 1 Completed - April 8, 2020 Done <br>   
- Step 2 Completed - April 10, 2020 Done <br>
- Step 3 Completed - April 12, 2020  Done <br>
- Step 4 Completed - April 17, 2020  Done <br>
- Step 5 Completed - April 24, 2020 <br>

# Milestone 2
I went through the tutorials and was able to create a hello world application on my cell phone (iPhone) and emulator (Pixel 3). I then tried a few different examples on my phone. The following images show my work - screenshots on my phone and the process of getting it to work on my phone:<br><br>
<img src="./Step2/IMG_2134.PNG" width="55%" height="40%"/> <br> <br>
<img src="./Step2/IMG_2135.jpg" width="55%" /> <br> <br>
<img src="./Step2/IMG_2136.jpg" width="55%" /> - Phyllis the iphone is my iphone<br> <br>
<img src="./Step2/IMG_2137.jpg" width="55%" /> <br> <br>
<img src="./Step2/IMG_2138.PNG" width="55%" /> <br> <br>
<img src="./Step2/IMG_2139.PNG" width="55%" /> <br> <br>
<img src="./Step2/IMG_2140.PNG" width="55%" /> <br> <br>
<img src="./Step2/IMG_2141.PNG" width="55%" /> <br> <br>
<img src="./Step2/IMG_2142.PNG" width="55%" /> <br> <br>
app.js in the Step2 folder is the hello world file

# Milestone 3
I had difficulty trying to get a more difficult use case but realized I just needed to understand how maps in react-native worked. I ccompleted step 3 by having an app that is set to photonics on a map and allows the marker to be moved and gives an alert of the new coordinates. I play on spending the next couple days trying to understand react-native-maps even further. Attached are screenshots of my app working. <br>
<img src="./Step3/IMG_2149.PNG" width="55%" /> <br> <br>
<img src="./Step3/IMG_2150.PNG" width="55%" /> <br> <br>
<img src="./Step3/IMG_2151.PNG" width="55%" /> <br> <br>
app.js is in the Step3 folder that was able to do this.

# Milestone 4
Milestone 4 is located in branch Step4 and in a folder called Step4 - There are 3 different javascript files for the 3 different applications I made. USUsingSummary.js and byCountry.js created the same view but used the API differently - they created the 1st picture. App.js allowed the user to put in a country and click a submit button to receive the statistics listed on the same view and are shown in the next 3 pictures. 
