# Project Title
Open Menu

## Overview

Open Menu is a menu item-focused review app that helps foodies find and share their thoughts on the best food in their area.

### Problem Space

When a person visits a restaurant for the first time, they often have little idea how good each individual item on the menu is. Perhaps they may know that the restaurant itself has a high rating, but what about the seperate items? Perhaps the restaurant has amazing pasta, but their burgers are average. Perhaps you love curry and you saw this 4.8 star restaurant has curry so you go there, but actually they get good reviews only because of their stew. What are you to do? Read through every single review to see if they mention the item you're interested in? Well, what if instead you had a rating for each individual menu item itself.

Currently, most of the big apps for finding and reviewing places to eat such as Yelp, TripAdvisor, or Google Maps are focused on rating the restaurant as a whole. However, restaurants often have several different types of items on their menu and a single monolithic review of the store may fail to convey the individual quality of each one. Furthermore, if you're craving a very specific dish, it can be difficult to find restaurants that have it and directly compare them. Open Menu aims to assuage this problem by bringing the focus on the menu items themselves.

### User Profile

- Foodies:
    - wanting to know which dishes a restaurant does well or poorly
    - wanting to remember which menu items they've tried and how much they liked them
    - wanting to find the best of a specific food in an area

### Features

- As a user, I want to be able to search for menu items in my area
- As a user, I want to be able to search for restaurants in my area
- As a user, I want to be able to see ratings and reviews for menu items
- As a user, I want to be able to see a restaurant's menu items
- As a user, I want to be able to leave my own rating and review for a menu item

## Instructions

1. Create .env files using the environment variable names and values in the .env.example files
2. npm install the following dependencies in their respective projects to run this app

#### Client Dependencies:

- axios
- dotenv
- react-router-dom
- react-select
- sass

#### Server Dependencies:

- axios
- cors
- dotenv
- express
- knex
- mysql2
- nodemon

3. Create a database with the values in the server's .env.example and then run the following commands in the server project terminal:
- npx knex migrate:latest
- npx knex seed:run


## Implementation

### Tech Stack

- React
- JavaScript
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - axios
    - react-select
- Server libraries:
    - knex
    - express
    - axios

### APIs

- Google Places API

### Sitemap

- Home Page
- Search Page
- View Menu Item
- View Restaurant
- Finder Page
- Rating Page
- Add Page

### Endpoints 

**GET /foods**

- Get all menu items

Parameters:
- N/A

Response:
```
[
    {
        "id": 1,
        "restaurant_id": 1,
        "name": "Big Mac",
        "rating": 4.8,
        "price": 7.79,
        "category": "Burgers"
    },
    ...
]
```

**GET /restaurants**

- Get all restaurants

Parameters:
- N/A

Response:
```
[
    {
        "id": 1,
        "name": "McDonalds",
        "category": "Fast Food",
        "address": "1280 Markham Rd, Scarborough, ON M1H 3B4",
        "area": "Scarborough",
        "average_rating": 3.8,
        "price_range": "$10 - $20"
    },
    ...
]
```

**GET /foods/:id**

- Get a specific menu item

Parameters:
- id: menu item id as a number

Response:
```
[
    {
        "id": 1,
        "restaurant_id": 1,
        "name": "Big Mac",
        "rating": 4.8,
        "price": 7.79,
        "category": "Burgers"
    }
]
```

**GET /ratings/food/:id**

- Get all reviews for a specific menu item

Parameters:
- id: menu item id as a number

Response:
```
[
    {
        "id": 1,
        "menu_item_id": 1,
        "restaurant_id": 1,
        "reviewer_name": "Ronald McDonald",
        "rating": 5,
        "timestamp": 17000000001,
        "review": "I'm Loving It!"
    },
    ...
]
```

**GET /restaurants/:id**

- Get a specific restaurant

Parameters:
- id: restaurant id as a number

Response:
```
[
    {
        "id": 1,
        "name": "McDonalds",
        "category": "Fast Food",
        "address": "1280 Markham Rd, Scarborough, ON M1H 3B4",
        "area": "Scarborough",
        "average_rating": 3.8,
        "price_range": "$10 - $20"
    }
]
```

**GET /foods/restaurant/:id**

- Get all menu items for a specific restaurant

Parameters:
- id: restaurant id as a number

```
[
    {
        "id": 1,
        "restaurant_id": 1,
        "name": "Big Mac",
        "rating": 4.8,
        "price": 7.79,
        "category": "Burgers"
    },
    ...
]
```

**POST /ratings**

- Post a review for a menu item

Parameters:
- id: menu item id as a number
- rating: rating of menu item as a number
- reviewer_name: name of reviewer as a string
- review: review text as a string

Response:
```
[
    {
        "id": 1,
        "menu_item_id": 1,
        "restaurant_id": 1,
        "reviewer_name": "Ronald McDonald",
        "rating": 5,
        "timestamp": 17000000001,
        "review": "I'm Loving It!"
    }
]
```
    

---

## Future Implementations
Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

- Log-in Function
    - Logged-in users will be able to see a record of their reviews
    - Logged-in users will be able to favorite menu items

- Add Footer navigation

- Ability to add restaurants and menu items

- Integrate Google Places / Maps

- Integrate Web-scraping to gather menu information