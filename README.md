# personalized-news-aggregator

This project consists of three microservices: User Service, News Service and Notification Service. Each service is responsible for specific functionality.


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
- [How to Run the Testing](#how-to-run-the-testing)

---

## System Diagram

### General Structure
![personalized-news-aggregator-general](https://github.com/user-attachments/assets/ce970a11-c079-4f64-b308-e61231ca8121)
---
### User Service Structure
![personalized-news-aggregator-user-service](https://github.com/user-attachments/assets/0293f94a-aee5-4bc8-976a-90fd8d4420b6)
---
### News Service Structure
![personalized-news-aggregator-news-service](https://github.com/user-attachments/assets/1523fe39-3ced-4577-a528-d25ddbc624c6)


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
5. Write "cd .\user-service\" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/967b28cc-543f-4c4b-9a09-f0a56d04fcfb)
6. Write "npm i" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/9da5c21e-370f-4171-b96d-79ad6454ffa7)
7. Write "cd ../" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/3117b50f-70ab-42e4-bcd3-b7811ca96bac)
8. Write "cd .\notification-service\" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/7b9a5ed4-5606-4704-a4b6-7bde110385e8)
9. Write "npm i" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/67341e45-9f51-4444-8313-11d5651be3b7)
10. Write "cd ../" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/67b41628-820a-4caa-8435-f35f3fca121d)
11. Write "cd .\news-service\" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/7cde8917-70d6-4104-8520-a92ca79b654b)
12. Write "npm i" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/be973066-be20-40f2-8dd5-64ec1642b03f)
13. Write "cd ../" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/2c9620d2-05ad-438c-bb97-0333e023a470)
14. Write "docker-compose build" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/e703da75-aeea-42bf-be0b-b5b465b9c595)
15. Write "docker-compose up" in your terminal like here:
    ![image](https://github.com/user-attachments/assets/af87e23e-d3a6-4a9c-b15a-f219b923ff55)


## How to run tests on the project


