<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# NestJS Starter - Tutorial 🚀

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Logo do Nest" /></a>
</p>

<p align="center">Uma framework Node.js progressiva para construir aplicações server-side eficientes e escaláveis.</p>

## Índice

1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação](#instalação)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Comandos Básicos](#comandos-básicos)
6. [Docker](#docker)
7. [Testes](#testes)
8. [Dicas e Boas Práticas](#dicas-e-boas-práticas)

## Introdução

Este é um projeto inicial utilizando NestJS, uma framework para Node.js que utiliza TypeScript e segue os princípios da programação orientada a objetos, programação funcional e programação reativa.

## Pré-requisitos

- Node.js (versão 20 ou superior)
- NPM ou Yarn
- Docker (opcional, mas recomendado)
- Um editor de código (recomendado: VSCode)

## Instalação

1. Primeiro, clona o repositório:

```bash
git clone [url-do-teu-repositorio]
cd [nome-do-projeto]
```

2. Instala as dependências:

```bash
npm install
```

3. Configura as variáveis de ambiente:

```bash
cp .env.example .env
```

## Estrutura do Projeto

```
src/
├── main.ts              # Ponto de entrada da aplicação
├── app.module.ts        # Módulo principal
├── controllers/         # Controladores da aplicação
├── services/           # Serviços e lógica de negócio
├── entities/           # Entidades da base de dados
└── dto/                # Data Transfer Objects
```

## Comandos Básicos

### Desenvolvimento

```bash
# Iniciar em modo desenvolvimento
npm run start:dev

# Iniciar em modo debug
npm run start:debug

# Iniciar em modo produção
npm run start:prod
```

### Criar .env

```bash
DATABASE_URL="postgresql://nome:assword@localhost:porta/db_nome"
NODE_ENV=production
JWT_SECRET="chave"
JWT_EXPIRES_IN="duração_da_chave"


DEV_POSTGRES_USER=nome
DEV_POSTGRES_PASSWORD=password
DEV_POSTGRES_DB=db_nome

PROD_POSTGRES_USER=pnome
PROD_POSTGRES_PASSWORD=password
PROD_POSTGRES_DB=db_nome
```

### Criar Novos Recursos

```bash
# Criar um novo módulo
nest g module users

# Criar um novo controlador
nest g controller users

# Criar um novo serviço
nest g service users
```

## Docker

### Desenvolvimento

```bash
# Iniciar contentores de desenvolvimento
docker compose -f docker-compose.dev.yml up

# Parar contentores
docker compose -f docker-compose.dev.yml down
```

### Produção

```bash
# Iniciar contentores de produção
docker compose -f docker-compose.prod.yml up

# Parar contentores
docker compose -f docker-compose.prod.yml down
```

## Testes

```bash
# Executar testes unitários
npm run test

# Executar testes end-to-end
npm run test:e2e

# Verificar cobertura de testes
npm run test:cov
```

## Dicas e Boas Práticas

1. **Estrutura de Módulos**

   - Mantém módulos pequenos e focados
   - Utiliza lazy loading quando possível
   - Organiza ficheiros por funcionalidade

2. **Validação**

   - Utiliza DTOs para validação de dados
   - Implementa pipes de validação
   - Utiliza decorators para validação

3. **Base de Dados**

   - Utiliza migrations para controlo de versão da base de dados
   - Implementa repositories para acesso aos dados
   - Utiliza transactions quando necessário

4. **Segurança**
   - Implementa autenticação JWT
   - Utiliza CORS adequadamente
   - Valida todas as entradas do utilizador

### Exemplos de Código

#### Controller Básico

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'List of users';
  }
}
```

#### Service Básico

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return 'Returns all users';
  }
}
```

#### DTO Example

```typescript
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```

## Suporte e Comunidade

- [Documentação Oficial do NestJS](https://docs.nestjs.com)
- [Discord da Comunidade](https://discord.gg/nestjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nestjs)

## Licença

Este projeto está sob a licença [MIT](LICENSE).

---

Para mais informações sobre como utilizar recursos específicos ou implementar funcionalidades adicionais, consulta a [documentação oficial do NestJS](https://docs.nestjs.com).

## Support

## Stay in touch

## License

Nest is [MIT licensed](LICENSE).
