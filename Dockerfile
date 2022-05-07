FROM gradle:7.4.2-jdk11-alpine

COPY ./ /home/bas
WORKDIR /home/bas

RUN gradle clean build

EXPOSE 8080/tcp

ENTRYPOINT /opt/java/openjdk/bin/java -jar "./build/libs/building-access-service-0.0.1-SNAPSHOT.jar"
