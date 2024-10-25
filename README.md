### Run with Docker

- Run the command:

```shell
docker compose build
docker compose up -d
# -d - to run in the background
# --build - to rebuild containers
```

Data connect to db in .env file

### Example .env file

```shell
PORT=3001

POSTGRES_DB=dvdrental
# POSTGRES_HOST=localhost # local
POSTGRES_HOST=main-DB # docker
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_SYNCHRONIZE=false

REDIS_HOST=redis-cache # docker
# REDIS_HOST=localhost
REDIS_PORT=6379

```

Also you can rename file " env-example " in main project folder 

For testing query:

http://localhost:3000/film/:title
