# Golden Raspberry - NODE API

Esta API fornece informações sobre os filmes indicados e vencedores do Golden Raspberry Awards.

## Tecnologias Utilizadas


<div style="display: flex; align-items: center; margin-bottom: 5px;">
  <img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Node.js" style="margin-right: 10px; width: 35px;" />
  <strong>Node.js</strong>
</div>

<div style="display: flex; align-items: center; margin-bottom: 5px;">
  <img src="https://img.icons8.com/color/48/000000/javascript.png" alt="JavaScript" style="margin-right: 10px; width: 35px;" />
  <strong>JavaScript</strong>
</div>

<div style="display: flex; align-items: center; margin-bottom: 5px;">
  <img src="https://img.icons8.com/color/48/000000/docker.png" alt="Docker" style="margin-right: 10px; width: 35px;" />
  <strong>Docker</strong>
</div>

<div style="display: flex; align-items: center; margin-bottom: 5px;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/SQLite370.svg" alt="SQLite" style="margin-right: 10px; width: 35px;" />
  <strong>SQLite</strong>
</div>

<div style="display: flex; align-items: center; margin-bottom: 5px;">
  <img src="https://vitest.dev/logo.svg" alt="Vitest" style="margin-right: 10px; width: 35px;" />
  <strong>Vitest</strong>
</div>

<!-- <div style="display: flex; align-items: center; margin-bottom: 5px;">
  <img src="https://img.icons8.com/color/48/000000/react-native.png" alt="React" style="margin-right: 10px; width: 35px;" />
  <strong>React</strong>
</div> -->


## Instalação

Use o repositório do github para clonar/baixar/instalar o projeto [Golden Raspberry - Github](https://github.com/jiovanmichel).

```bash
git clone https://github.com/jiovanmichel

ou

Download zip do projeto e descompactar
```

## Iniciar a aplicação

```bash
cd projeto...

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
cd projeto...

docker-compose up -d
```
API disponível em [http://localhost:8000](http://localhost:8000)

#### Executar os testes
```bash
docker-compose -f docker-compose-test.yaml up -d
```

## Rotas da API


1. GET /api/movies

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

2. GET /api/movies/:id

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

3. POST /api/movies

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


4. PUT /api/movies/:id

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

5. PATCH /api/movies/:id

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

6. DELETE /api/movies/:id

    Deleta um filme pelo ID

    __Parâmetros:__

    - id <small>(id do filme)</small>

    __resposta__
    ```bash
    true
    ```

7. GET /api/producers/awards-min-max-interval

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

