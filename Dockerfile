FROM gradle:7.4.2-jdk11-alpine

COPY ./ /home/bas
WORKDIR /home/bas

RUN gradle clean build

EXPOSE 8080/tcp

ENTRYPOINT gradle bootRun -x compileJava -x processResources -x classes
