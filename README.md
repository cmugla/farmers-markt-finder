# Farmer's Market Finder
  
  A mobile app for Farmer's Market enthusiasts.

  When opened, the app uses geolocation to show the user's nearby Farmer's markets that are currently happening. As a farmer, you can add your Farm to the Farmer's Market you have a booth at. When a user clicks on a market, all relevant info about that market show, including the location, contact info, and hours; as well as any recent posts made by their farmers. Users can save their favorite market and follow their favorite farms. If they are following a farm, they'll see their posts on their feed when the app is opened.

## User's stories

  - A guest should be able to view their nearby Farmer's Markets currently happening
  - A user should be able to save their favorite Farmer's Market
  - A farmer (super user) should be able to add their Farm to the Farmer's Market page
  - A farmer should be able to post updates 
  - A user should be able to star Farms they like at a Market
  - A user should be able to see a feed of the most recent updates to their favorite markets and farms, when they open the app

## Technologies
  
  - NodeJS: back-end server with models for api data and user data
  - React Native: front-end user interface
  - API: <a href="https://data.ny.gov/Economic-Development/Farmers-Markets-in-New-York-State-API/xjya-f8ng" target="_blank">Farmers Markets in NYC</a>
  - API: <a href="http://maps.googleapis.com/maps/api/geocode/json" target="_blank">Google Maps API</a>
  - PSQL: 
    - User table stores user name (and login info), favorite markets, and favorite farms
    - Farmer table stores Farmer's name/contact info and their updates

## Wireframes

  Three different Experiences: guest, user, and farmer
  
  ![wireframes](./wireframes/IMG_0079.JPG)

## Special Thanks

  - <a href="https://facebook.github.io/react-native/docs/getting-started.html" target="_blank">React Native Docs</a>
