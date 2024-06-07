# postgreql

## Docker

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres
```

The above command will create a postgres container with the following details:
- `--name` : name of the container
- `-e POSTGRES_PASSWORD=postgres` : password for the postgres user
- `-e POSTGRES_USER=postgres` : username for the postgres user
- `-e POSTGRES_DB=postgres` : database name
- `-p 5432:5432` : port mapping
- `-d postgres` : image name

## connection string
```
host: localhost
port: 5432
database: postgres     // created using POSTGRES_DB env variable
user: postgres        // created using POSTGRES_USER env variable
password: postgres
```