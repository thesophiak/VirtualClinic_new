# Project Title
Personal Health Assistant

## Overview

Get fast and easy health advice without any jargon.

### Problem

Health advice and consultation can be hard to obtain. Many do not have a family doctor, walk-in clinics and EMR have long wait times, and the information available online can be overwhelming to sift through. Your personal health assistant is designed to give you health and wellness advice anywhere and anytime, in easy-to-understand terms. You can ask any question related to your health and wellness and get a fast and actionable reply. No more wait times or confusing jargon.

### User Profile

- Adults and teenagers
- Individuals with questions about their health or wellness
- Individuals who don't want to sift through the internet to find answers to their questions
- Individuals with some to no education or experience with healthcare

### Features

Phase 1 
1- As a user, I want to be able to enter my health or wellness question using language that's natural to me.

2- As a user, I want to get a response to my question that's easy to understand and explains to me what could be causing my problem and what I should do to get better.

3- As a user, I want to know if the advice I'm getting is given by a medical professional

4- As a user, I want to have a list of my previous questions and a way to navigate back to them

5- As a user, I want to be able to delete my question history.


Phase 2
6- As a user, I want an easy way to find a a real/human doctor to speak to

Phase 3
7- As a user, I want to be able to read and learn more about my health or wellness topic

## Implementation

### Tech Stack

- HTML/CSS
- JavaScript
- React
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - express

### APIs

ChatGPT - GET request for health and wellness information

JSON file - POST request to store an array for the search history

Google Maps - GET request to identify nearby clinics based on location

NYT - GET request to find and display articles related to the user's question

### Sitemap

- Home page (shows question and answer, question history, related articles)
- Map page or modal (shows searchable map)

### Mockups

### phase 1 mock-up
phase1.png

### phase 1-4 mock-up
phase1_4.png

### Data

tbd

### Endpoints

ChatGPT GET/answer
- Gets answer to the health question using a prespecified prompt for the potential cause of the problem, how it can be treated, and when is the right time to see a doctor
Response: text, details tbd

ChatGPT GET/questionShort
- Gets a 1-3 word summary of the question. This will be used for the search history
Response: short text, details tbd

JSON file POST/answer
- saves all the details of the details of the question and answer
Parameters:
- id: answer id
- questionFull: original question
- answer: full answer to the question
- questionShort: short summary of question

JSON file GET/questionShort
- populates the question history
Response: id, questionShort

JSON file GET/questionFull
- re-populates the question and answer
Response: id, questionFull, answer

JSON file DELETE
- erases the data in the array

Google Maps GET/search
- shows Google Maps search for the term clinic
Response: map 

NYT GET/articles
- shows up to 6 articles related to the question of teh user.
Response: article id, title, image, url to article


### Auth

n/a

## Roadmap

Phase 1 
- Create client react project and repo
- Create server using express and repo
- Create JSON file with an empty array
- Test ChatGTP API end points and responses
- Create a low-fidelity draft of the home page (incl. question and answer fields, history display, history delete)
- Implement home page functionality for FE, BE, and API
- Test home page with edge cases
- Improve FE design

Phase 2
- Test Google Maps API endpoints and responses
- Create a low-fedility draft of the maps view (ncl. search field and map display)
- Implement the map functionality for FE, BE, and API
- Test with edge cases
- Improve FE design

Phase 3
- Test NYT API endpoints and responses
- Create a low-fedility draft of the article view (ncl. display of 6 articles)
- Implement the map functionality for FE, BE, and API
- Test with edge cases
- Improve FE design


## Nice-to-haves

Phase 2 and Phase 3
