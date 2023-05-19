# 2023_Star_Wars_Jedi_Archives

Online version of the Star Wars Jedi Archives, based on the [https://swapi.dev](https://swapi.dev/) online resource.

## Getting Started

### Accessing the online version

The online version of the Star Wars Jedi Archives is available at [https://starwarsarchive.khronozz.net/](https://starwarsarchive.khronozz.net/).

### Running the project locally using Docker Compose

The project can be run locally using Docker Compose. To do so, you need to have Docker and Docker Compose installed on your machine.

Docker and Docker Compose can be installed using the following links:
- [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

Once Docker and Docker Compose are installed, you can run the project locally using the following command:
```bash
docker compose up
```
or
```bash
docker-compose up
```

The project will be available at [http://localhost:8081/](http://localhost:8081/).

### Running the project locally using Node.js and Spring

The project can also be run locally using Angular and Java. To do so, you need to have Angular and Java installed on your machine.

Node.js and Java can be installed using the following links:
- [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- [https://www.java.com/en/download/](https://www.java.com/en/download/)

The version of Node.js, Angular and Java used for this project are the following:
- Angular: 15.2.1
- Java: openjdk 17.0.2
- Node.js: v18.14.2

Once Angular and Java are installed, you can run the project locally using the following commands.
First, you need to run the backend:
```bash
cd starwarsarchive-backend
./mvnw spring-boot:run
```
Then, you need to run the frontend:
```bash
cd starwarsarchive-frontend
npm install
ng serve

```