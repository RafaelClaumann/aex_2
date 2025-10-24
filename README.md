# Projeto Aplicado - AEX 2

### 📋 Pré-requisitos
Antes de executar a aplicação, certifique-se de ter instalado:
- Docker (versão 20.10+)
- Docker Compose (versão 2.0+)
- Java 21
- Maven (versão 3.6+)

### 🚀 Configuração e Execução
#### 1. Build do Projeto

```shell
# Realizar o build e empacotamento da aplicação
mvn clean install
```

####  2. Executar a Aplicação

##### Opção A: Via IDE

Importe o projeto como Maven Project na sua IDE

Execute a classe principal `Application.java`

##### Opção B: Via Terminal

```shell
# Iniciar a aplicação Spring Boot
mvn spring-boot:run
```

#### 3. Infraestrutura com Docker

``` shell
# Navegar para a pasta de infraestrutura
cd infra

# Iniciar os containers em background
docker-compose up -d

# Parar os containers
docker-compose down

# Ver logs dos containers
docker-compose logs c-f
```

####  4. Acesso aos Serviços

- Aplicação: http://localhost:8080
- PgAdmin: http://localhost:9090
- PostgreSQL: localhost:5432

### 🔧 Configuração do PgAdmin

Ao acessar o PgAdmin (http://localhost:9090):
- Email: user@email.com
- Senha: pass

###  📡 Endpoints da API

- Obter cliente
GET http://localhost:8080/v1/client/{id}>

- Criar cliente
POST http://localhost:8080/v1/client

``` json
{
  "nome": "a222aaa22",
  "telefone": "48996559903"
}
```

- Deletar cliente
DELETE http://localhost:8080/v1/client/{id}

- Modificar cliente
PATCH http://localhost:8080/v1/client/{id}

``` json
{
  "nome": "a222aaa22",
  "telefone": "48996559903"
}
```
