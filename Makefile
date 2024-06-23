
.PHONY: up down pull shell

pull:
	docker compose pull

logs:
	docker compose logs -f app

down:
	docker compose down --rmi local --remove-orphans --volumes

up: down pull
	docker compose up -d && make logs

shell:
	docker compose exec app sh
