# Projeto Aplicado - AEX 2

### Pré-requisitos
- Docker
- Docker Compose
- Java 21
- Maven 


### Passo-a-passo
1. Realizar o build do projeto `mvn clean install`
2. Iniciar a aplicação na sua IDE ou via comando `mvn spring-boot:run`
3. Iniciar os containers na pasta `infra` com o comando `docker-compose up -d`. 
4. Acessar `http://localhost:9090` para visualizar o banco de dados no `pgadmin`. 
5. Acessar os endpoints do projeto 

- Obter cliente: GET http://localhost:8080/v1/client/{id}
- Deletar cliente: DELETE http://localhost:8080/v1/client/{id}
- Criar cliente: POST http://localhost:8080/v1/client
``` json
{
  "nome": "a222aaa22",
  "telefone": "48996559903"
}
```

- Modificar cliente: PATCH http://localhost:8080/v1/client/{id}
``` json
{
  "nome": "a222aaa22",
  "telefone": "48996559903"
}
```

Documentações
- Springdoc (springdoc-openapi-starter-webmvc-ui) ([link](https://springdoc.org/#Introduction))
- Annotations swagger ([link](https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---Annotations#quick-annotation-overview))



# Rodando Container

### Executando container com H2 DB

Neste cenário não é preciso iniciar um banco de dados externo e nem fornecer variáveis de ambiente.

Aqui o banco de dados h2 é iniciado em memória no start do container.

O H2 tem um console em http://localhost:8080/h2-console

```shell
docker run --rm --publish 8080:8080 rafaelclaumann/aex-jar:latest
```

### Executando container com Postgres

Neste cenário é preciso iniciar o banco de dados PostgreSQL externamente.

É preciso existir um banco chamado `aex` no PostgreSQL.

Também é necessário fornecer variáveis de ambiente.


```shell
docker run --rm \
    --env SPRING_PROFILES_ACTIVE="postgres" \
    --env DATABASE_ADDRESS="your_database_address" \
    --publish 8080:8080 \
    rafaelclaumann/aex-jar:latest
```

Se desejar conectar este container ao banco de dados criado em `infra/compose.yaml` será necessário iniciar o container na rede `aex`.

O valor de `DATABASE_ADDRESS` é obtido em `services.postgres` do `compose.yaml`.  

```shell
docker run --rm \
    --env SPRING_PROFILES_ACTIVE="postgres" \
    --env DATABASE_ADDRESS="postgres" \
    --publish 8080:8080 \
    --network infra_aex \
    rafaelclaumann/aex-jar:latest
```

Essas são as configurações e variáveis de ambiente do profile `postgres`.
``` properties
spring.datasource.url=jdbc:postgresql://${DATABASE_ADDRESS:localhost}:5432/${DATABASE_NAME:aex}
spring.datasource.username=${DATABASE_USER:postgres}
spring.datasource.password=${DATABASE_PASSWORD:pass}
spring.datasource.driverClassName=org.postgresql.Driver
```
