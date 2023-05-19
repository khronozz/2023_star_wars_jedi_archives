FROM maven:3.9.0-eclipse-temurin-19-focal
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/starwarsarchive-backend-0.0.1-SNAPSHOT.jar"]