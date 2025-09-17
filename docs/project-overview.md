# Documentação do Microserviço de Clientes

## Visão Geral do Projeto

Este é um microserviço desenvolvido com o framework NestJS para gerenciar dados de clientes. O projeto segue uma arquitetura moderna e bem estruturada para APIs RESTful.

### Principais características:

1. **Gerenciamento de Clientes**: O sistema permite criar e consultar informações de clientes.

2. **Validação de CPF**: Inclui um utilitário específico para validar CPFs brasileiros, garantindo que apenas CPFs válidos sejam aceitos.

3. **Integração com MongoDB**: Utiliza o Mongoose (um ODM - Object Document Mapper) para interagir com um banco de dados MongoDB.

4. **Arquitetura MVC**: Segue o padrão Model-View-Controller, com clara separação de responsabilidades:
   - **Model**: Definição da estrutura de dados do cliente com schema do Mongoose
   - **Controller**: Gerencia as rotas e requisições HTTP
   - **Service**: Contém a lógica de negócios

5. **API RESTful**: Expõe endpoints para:
   - Criar um novo cliente (`POST /customer`)
   - Consultar um cliente por CPF (`GET /customer/:cpf`)
   - Deletar um cliente por CPF (`DELETE /customer/:cpf`)

6. **Validação de Dados**: Utiliza decoradores para validar os dados de entrada, garantindo que informações obrigatórias sejam fornecidas.

## Tecnologias utilizadas:

- **NestJS**: Framework Node.js para construir aplicações server-side eficientes e escaláveis
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **MongoDB/Mongoose**: Para persistência de dados
- **Jest**: Para testes unitários e de integração

## Estrutura de dados:

Um cliente (`Customer`) possui os seguintes atributos:
- CPF (único)
- Nome
- Email
- Estado
- Cidade
- Telefone (único)

## Regras de negócio:

1. Não é possível cadastrar dois clientes com o mesmo CPF
2. O CPF deve ser válido (seguindo as regras de validação brasileiras)
3. Consultas são realizadas por CPF
4. Caso um cliente não seja encontrado, retorna-se um erro 404 (Not Found)

## Configuração do Ambiente

Este projeto está configurado para executar no Node.js v12.22.10. Para garantir a consistência entre ambientes de desenvolvimento, foram adicionados os seguintes arquivos:

- `.nvmrc`: Especifica a versão do Node.js para uso com o NVM (Node Version Manager)
- `.npmrc`: Configura o comportamento do NPM para este projeto

## Estrutura do Projeto

```
src/
├── app.module.ts         # Módulo principal da aplicação
├── customer.module.ts    # Módulo específico para funcionalidades de cliente
├── main.ts               # Ponto de entrada da aplicação
├── controller/           
│   └── customer.controller.ts  # Controlador para rotas de cliente
├── dto/
│   └── create.customer.dto.ts  # Objeto de transferência de dados para criação
├── repository/
│   └── customer.model.ts       # Modelo e schema para o MongoDB
├── service/
│   └── customer.service.ts     # Serviço com lógica de negócios
└── utils/
    └── cpf-validator.ts        # Utilitário para validação de CPF
```

## Requisitos para execução

1. Node.js v12.22.10
2. NPM v6.14.16
3. MongoDB (local ou remoto)

## Notas de Implementação

Este microserviço pode ser facilmente integrado a uma arquitetura maior, comunicando-se com outros serviços por meio de REST, mensageria ou outros protocolos. A validação de CPF assegura que apenas dados válidos sejam persistidos no banco.

## Possíveis Melhorias Futuras

1. Implementar endpoints para atualização de clientes (Update)
2. Adicionar autenticação e autorização
3. Implementar logs e monitoramento
4. Expandir os testes para maior cobertura
5. Adicionar documentação da API com Swagger
6. Implementar cache para consultas frequentes
