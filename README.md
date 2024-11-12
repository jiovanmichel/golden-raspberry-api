# Golden Raspberry - NODE API

Esta API fornece informações sobre os filmes indicados e vencedores do Golden Raspberry Awards.

## Tecnologias utilizadas

<table>
  <tr>
    <td style="text-align: center; vertical-align: middle;">
      <img src="https://img.icons8.com/color/35/000000/nodejs.png" alt="Node.js" style="width: 35px;" />
    </td>
    <td style="vertical-align: middle;">Node.js</td>
  </tr>
  <tr>
    <td style="text-align: center; vertical-align: middle;">
      <img src="https://img.icons8.com/color/35/000000/javascript.png" alt="JavaScript" style="width: 35px;" />
    </td>
    <td style="vertical-align: middle;">JavaScript</td>
  </tr>
  <tr>
    <td style="text-align: center; vertical-align: middle;">
      <img src="https://img.icons8.com/color/35/000000/docker.png" alt="Docker" style="width: 35px;" />
    </td>
    <td style="vertical-align: middle;">Docker</td>
  </tr>
  <tr>
    <td style="text-align: center; vertical-align: middle;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/SQLite370.svg" alt="SQLite" style="width: 35px;" />
    </td>
    <td style="vertical-align: middle;">SQLite</td>
  </tr>
  <tr>
    <td style="text-align: center; vertical-align: middle;">
      <img src="https://vitest.dev/logo.svg" alt="Vitest" style="width: 35px;" />
    </td>
    <td style="vertical-align: middle; font-weight;">Vitest</td>
  </tr>
</table>

## Dependências

Nodejs na versão 22.11.0

ou

Docker e Docker Compose

## Instalação

Use o repositório do github para clonar/baixar/instalar o projeto [Golden Raspberry - Github](https://github.com/jiovanmichel/golden-raspberry-api).

```bash
git clone https://github.com/jiovanmichel/golden-raspberry-api

ou

Download zip do projeto e descompactar
```

## Iniciar a aplicação

```bash
cd golden-raspberry-api/app

npm install pm2 -g

npm install

npm run start
```
API disponível em [http://localhost:8000](http://localhost:8000)

#### Executar os testes
```bash
npm run test
```

## Iniciar a aplicação usando docker

```bash
cd golden-raspberry-api

docker-compose up -d
```
API disponível em [http://localhost:8000](http://localhost:8000)

#### Executar os testes
```bash
docker-compose -f docker-compose-test.yaml up -d
```

## Rotas da API


1. GET http://localhost:8000/api/movies

    Lista todos os filmes

     __resposta__
    ```bash
    [
        {
            "id": 1,
            "title": "Movie Title",
            "producers": "Producers Name",
            "studios": "Studios Name",
            "year": 2021,
            "winner": "1"
        },
    ]
    ```

2. GET http://localhost:8000/api/movies/1

    Obtém informações de um filme específico pelo seu ID.

    __Parâmetros:__

    - id <small>(id do filme)</small>

    __resposta__
    ```bash
    {
        "id": 1,
        "title": "Movie Title",
        "producers": "Producers Name",
        "studios": "Studios Name",
        "year": 2021,
        "winner": "1"
    },
    ```

3. POST http://localhost:8000/api/movies

    Cria um novo filme

    __body da requisição__
    ```bash
    {
        "title": "Movie Title",
        "producers": "Producers Name",
        "studios": "Studios Name",
        "year": 2021,
        "winner": "1"
    },
    ```

    __resposta__
    ```bash
    {
        "id": 2,
        "title": "Movie Title",
        "producers": "Producers Name",
        "studios": "Studios Name",
        "year": 2021,
        "winner": "1"
    },


4. PUT http://localhost:8000/api/movies/1

    Atualiza completamente as informações de um filme

    __Parâmetros:__

    - id <small>(id do filme)</small>

    __body da requisição__
    ```bash
    {
        "title": "Updated Movie Title",
        "producers": "Updated Producers Name",
        "studios": "Updated Studios Name",
        "year": 2021,
        "winner": "1"
    },
    ```

    __resposta__
    ```bash
    {
        "id": 1,
        "title": "Updated Movie Title",
        "producers": "Updated Producers Name",
        "studios": "Updated Studios Name",
        "year": 2021,
        "winner": "1"
    },

5. PATCH http://localhost:8000/api/movies/1

    Atualiza parcialmente as informações de um filme

    __Parâmetros:__

    - id <small>(id do filme)</small>

    __body da requisição__
    ```bash
    {
        "title": "Updated Movie Title"
    },
    ```

    __resposta__
    ```bash
    {
        "id": 1,
        "title": "Updated Movie Title",
        "producers": "Producers Name",
        "studios": "Studios Name",
        "year": 2021,
        "winner": "1"
    },
    ```

6. DELETE http://localhost:8000/api/movies/1

    Deleta um filme pelo ID

    __Parâmetros:__

    - id <small>(id do filme)</small>

    __resposta__
    ```bash
    true
    ```

7. GET http://localhost:8000/api/producers/awards-min-max-interval

    Lista os produtores com menor __(min)__ e maior __(max)__ intervalo entre dois prêmios

    __resposta__
    ```bash
    {
        "min": [
            {
                "producer": "Producer 1",
                "interval": 1,
                "previousWin": 2008,
                "followingWin": 2009
            },
            {
                "producer": "Producer 2",
                "interval": 1,
                "previousWin": 2018,
                "followingWin": 2019
            }
        ],
        "max": [
            {
                "producer": "Producer 1",
                "interval": 99,
                "previousWin": 1900,
                "followingWin": 1999
            },
            {
                "producer": "Producer 2",
                "interval": 99,
                "previousWin": 2000,
                "followingWin": 2099
            }
        ]
    }
    ```

    <small>Se dois produtores possuírem o mesmo intervalo seja min ou max ambos serão adicionados na lista.</small>


## Futuras Implementações

Para melhorias futuras do projeto, podem ser implementados e configuradas as seguintes opções:

### 1. Integração com Sequelize
- O **Sequelize** pode ser integrado ao projeto para facilitar a manipulação de banco de dados SQL de forma mais eficiente e flexível, utilizando um ORM robusto e poderoso.

### 2. Interface de Usuário (UI) com Vitest
- A **interface gráfica do Vitest** pode configurada e habilitada, permitindo a visualização em tempo real dos testes em execução, facilitando o acompanhamento do status e dos resultados dos testes durante o desenvolvimento.

### 3. Cobertura de Testes e Integração com SonarQube
- Será adicionada a configuração de **cobertura de testes**, proporcionando uma visão clara de quais partes do código estão sendo testadas e ajudando a garantir que a base de código esteja bem testada.
- Integração com **SonarQube** para monitorar a qualidade do código, identificando possíveis **bugs**, **codesmells**, e **erros**, promovendo um ambiente de desenvolvimento mais saudável e sustentável.

### 4. Criação de Novas Rotas
- **Rotas para Consultar Studios e Producers**: Novas rotas devem adicionadas para permitir a consulta de dados sobre *studios* e *producers*.
- **Autenticação e Permissão de Rotas**: Implementação de uma camada de **autenticação** para controlar o acesso às rotas, com sistemas de **permissão** para garantir a segurança e a integridade do sistema.

Essas melhorias irão contribuir para a expansão e a robustez do projeto, além de proporcionar uma experiência mais rica e segura para os usuários.

