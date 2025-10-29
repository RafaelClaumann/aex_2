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
