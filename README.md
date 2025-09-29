# Teste Prático - NestJS + TypeORM + SQLite

## Descrição
Projeto de teste prático utilizando NestJS com TypeORM.  
Persistência de dados feita com SQLite em memória.  
Validação de dados, tratamento de erros e testes unitários incluídos.

---

## Requisitos
- Node.js 18 ou superior
- NPM

---

## Instalação
Clone o repositório e instale as dependências:

```bash
git clone https://github.com/jgouvea7/nestjs-user-api
npm install
```

## Rodar o projeto
Para rodar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```
- O banco é SQLite em memória (`:memory:`), então todas as tabelas são criadas automaticamente a cada inicialização.

## Endpoints da API

| Método | Rota               | Descrição                     | Status HTTP esperado |
|--------|------------------|-------------------------------|-------------------|
| POST   | `/usuarios`       | Criar usuário                 | 201 Created / 400 Bad Request      |
| GET    | `/usuarios`       | Listar todos os usuários      | 200 OK            |
| GET    | `/usuarios/:id`   | Buscar usuário por ID         | 200 OK / 404 Not Found |
| DELETE | `/usuarios`       | Remover todos os usuários     | 200 OK            |


## Testes 
Para rodar os testes unitários:

```bash
npm run test
```

- Testes do service: src/users/services/users.service.spec.ts

- Testes do controller: src/users/controller/users.controller.spec.ts

Todos os testes devem passar.

## Validação de erros e tratamentos

- Email duplicado → retorna 400 Bad Request

- Usuário não encontrado → retorna 404 Not Found

- DTOs validados automaticamente com class-validator e ValidationPipe

