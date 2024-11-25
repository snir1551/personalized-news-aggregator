# personalized-news-aggregator

This project consists of three microservices: User Service, News Service and Notification Service. Each service is responsible for specific functionality.


![personalized-news-aggregator2 drawio](https://github.com/user-attachments/assets/5836261a-1b6f-463b-887a-dad353c29cab)

![personalized-news-aggregator-news-service drawio (1)](https://github.com/user-attachments/assets/b96cff25-6db4-4345-8430-dc423de4b416)

![personalized-news-aggregator-notification-service drawio](https://github.com/user-attachments/assets/2adb2e9d-2acb-483c-80a9-0e5af2e306ab)



## Table of Contents
- [System Diagram](#system-diagram)
  - [General Structure](#general-structure)
  - [User-Service Structure]()
  - [Notification-Service Structure]()
  - [News-Service Structure]()
- [Technologies Used]()
- [Getting Started]()  
  - [Prerequisites]()  
  - [Installation]()
- [How to Run the Project]()  
- [How to Run the Testing]()

---

# System Diagram
## General Structure
![personalized-news-aggregator drawio (1)](https://github.com/user-attachments/assets/c4f9c13d-3ff2-48f3-86d8-7f9b609b616b)

## Technologies Used

- **Programming Language**: JavaScript (Node.js) 
- **Frameworks/Libraries**: Express.js, axios, bcryptjs, cors, dotenv, mongoose, supertest, vitest, winston, nodemailer, amqplib  
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


