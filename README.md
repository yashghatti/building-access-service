
# building-access-service

API service to toggle ewelink door switch over LAN
***

## Run/Debug

> npm start

## Build

	docker build -t building-access-service --no-cache .
	docker rm $(docker ps -aqf "name=building-access-service") -f
	docker run -p 2222:8080 --name building-access-service --restart=always --detach building-access-service

## Usage

To lock building entrance

    <URL>/toggle-entry-switch?state=off

To unlock building entrance

    <URL>/toggle-entry-switch?state=on