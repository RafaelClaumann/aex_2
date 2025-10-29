FROM amazoncorretto:21-alpine3.22-jdk

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]
