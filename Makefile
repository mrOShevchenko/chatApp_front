## up: starts all containers in the background without forcing build
up:
	@echo "Starting docker images..."
	docker-compose -f ./docker-compose.yml up -d
	@echo "Docker images started!"

## down: stop docker compose
down:
	@echo "Stopping docker images..."
	docker-compose -f ./docker-compose.yml down
	@echo "Docker stopped!"

## rebuild: rebuilding all containers without cache
rebuild:
	@echo "Rebuilding docker images..."
	docker-compose -f ./docker-compose.yml down
	docker-compose -f ./docker-compose.yml build --no-cache
	docker-compose -f ./docker-compose.yml up -d
	@echo "Docker images rebuilt!"

## help: displays help
help: Makefile
	@echo " Choose a command:"
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'