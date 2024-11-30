# personalized-news-aggregator

This project consists of three microservices: User Service, News Service and Notification Service. Each service is responsible for specific functionality.

- User Service: Manages user information and preferences.
- News Service: Fetches and summarizes news articles.
- Notification Service: Sends the summarized news to the user's email or telegram.

## Table of Contents
- [System Diagram]()
  - [General Structure](#general-structure)
  - [User Service Structure](#user-service-structure)
  - [News Service Structure](#news-service-structure)
  - [Notification Service Structure](#notification-service-structure)
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
- [How to Run the Project](#how-to-run-the-project)  
- [How to run automated tests](#how-to-run-automated-tests)

---


## System Diagram

### General Structure
![personalized-news-aggregator-general](https://github.com/user-attachments/assets/2b10c2b4-9678-465f-b158-e642b0da0ec4)
---
### User-Service Structure
![personalized-news-aggregator-user-service](https://github.com/user-attachments/assets/4688aebf-50c1-4f90-b933-9a96ddb4cdff)
---
### Notification-Service Structure
![personalized-news-aggregator-notification-service](https://github.com/user-attachments/assets/629b6103-8ee5-4c8c-b618-84aecdaae86a)
---
### News-Service Structure
![personalized-news-aggregator-news-service](https://github.com/user-attachments/assets/0f929c53-22e6-43a7-8d08-11efb05212a3)
---
## Technologies Used
- **Programming Language**: JavaScript (Node.js) 
- **Frameworks/Libraries**: Express.js, React, axios, bcryptjs, cors, dotenv, mongoose, supertest, vitest, winston, nodemailer, amqplib  
- **Database**: MongoDB
- **Tools**: Docker, Git, Postman, Dapr


---

## Getting Started

### Prerequisites

Before running the project, make sure the following are installed:

- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- [git](https://git-scm.com/downloads)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation

Steps to set up the project locally:

1. Open the folder where you want to download the project.
2. Open CMD with the path to your folder.
3. Clone the repository:
   git clone https://github.com/snir1551/personalized-news-aggregator.git


## How to Run the Project

1. Open your VS Code.
2. In your VS Code open the folder project personalized-news-aggregator.
3. Open your Docker-Desktop.
4. Back to your VS Code and open in your VS Code terminal.
5. Write "cd .\backend\" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/c201e83e-2150-452d-be6e-149ce220e46b)
7. Write "cd .\user-service\" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/3967da93-c2b5-4bac-8994-28be642b745d)
8. Write "npm i" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/5891b3dc-5304-47ec-8a88-e23ac079bdde)
9. Write "cd ../" in your terminal like here:
    !![image](https://github.com/user-attachments/assets/716c18c4-e496-4cce-b8ad-50d394e21631)
10. Write "cd .\notification-service\" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/4c86b12c-213d-4219-b3e0-dcc27b27d051)
11. Write "npm i" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/0a69b0e4-6a48-491f-af98-163ccb607646)
12. Write "cd ../" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/bacfbd22-fe6d-4202-9dba-54d596183f06)
13. Write "cd .\news-service\" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/adc86c19-1cfb-489d-866c-a03d837e0ec3)
14. Write "npm i" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/40c043b3-3880-42e6-a008-72e4f6bd601c)
15. Write "cd ../" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/a6dd8940-7ac6-4ebc-86a6-8aea02e0d5b7)
16. Write "cd ../" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/47be73ba-2dfc-4e75-9842-daca582305ac)
18. Write "docker-compose build" in your terminal like here (Docker Desktop should be open):
    ![image](https://github.com/user-attachments/assets/6cef3756-7a79-4580-a7ba-2999e7529631)
19. Write "docker-compose up" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/56240f24-4744-4e1d-b965-e1a6f7cd4deb)


## How to Run manual Tests

### Open your Postman:

#### Check getAllusers:
   ![image](https://github.com/user-attachments/assets/a26ad19a-7f05-4063-93bd-218d9209f1ee)
   
   We can see that there are no people registered to the website

   ---
#### Check register:
   ![image](https://github.com/user-attachments/assets/0a5d75f2-7f28-4a47-821f-264200f3de7b)
   
   A user has been added

   ---
#### Check getAllusers:
   ![image](https://github.com/user-attachments/assets/48d07be0-8079-49ce-9436-c86833e05472)
   
   We can see that the user has been added

   ---
#### Check fetchNewsController (use user id):
   ![image](https://github.com/user-attachments/assets/1b88054e-bb06-4230-9f04-c33b6f05051d)
   
   We can see that we got the news according to the user's preferences

   ---
#### Check sendNotifications:
   ![image](https://github.com/user-attachments/assets/9a854882-2f69-46e0-bd73-2fef01a86da5)
   
   We can see that the news has been successfully sent to the email and telegram

   ---
#### In the email I got:
   ![image](https://github.com/user-attachments/assets/218e5d78-b155-4f1d-9efe-70c4992e2f61)

   ---
#### Check updatePreferences:
   ![image](https://github.com/user-attachments/assets/3d361f47-0c56-47f1-a678-ad02a6d3a93b)
   
   We can see that the user's preferences have been successfully changed

   ---
#### Check fetchNewsController with new user preferences:
   ![image](https://github.com/user-attachments/assets/57368135-57f6-4e7d-b4a5-669aabc2e20f)

   ---
#### Check sendNotifications: with the updated news from new user preferences:
   ![image](https://github.com/user-attachments/assets/57804637-9c58-4bc0-8549-483d3c9b9bf5)    

   ---
#### In the email I got:
   ![image](https://github.com/user-attachments/assets/984c651a-5382-4a92-bbc0-66421847164e)

   ---
   
## How to run automated tests

1. Write "cd .\backend\" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/c201e83e-2150-452d-be6e-149ce220e46b)
2. Write "cd .\user-service\" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/3967da93-c2b5-4bac-8994-28be642b745d)
3. Write "npm test" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/5b651050-c237-4e7e-a4a9-0d16c2fbbe2a)
4. Write "cd ../" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/716c18c4-e496-4cce-b8ad-50d394e21631)
5. Write "cd .\notification-service\" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/4c86b12c-213d-4219-b3e0-dcc27b27d051)
6. Write "npm test" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/8dfad7db-39bb-4a3f-9505-246e5da121ae)
7. Write "cd ../" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/bacfbd22-fe6d-4202-9dba-54d596183f06)
8. Write "cd .\news-service\" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/adc86c19-1cfb-489d-866c-a03d837e0ec3)
9. Write "npm test" in your terminal like here:
   ![image](https://github.com/user-attachments/assets/fd1c9236-46e4-4a51-867b-cdeb49fe7967)
