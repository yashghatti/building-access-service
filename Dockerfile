FROM gradle:7.4.2-jdk11-alpine

COPY ./ /home/bas
WORKDIR /home/bas

RUN gradle clean build
RUN APP_VERSION=$(gradle properties -q | grep "version:" | awk '{print $2}')

EXPOSE 8080/tcp

ENTRYPOINT gradle bootRun -x compileJava -x processResources -x classes
