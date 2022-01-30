
&nbsp;&nbsp;
# Bem vindo(a) ao projeto Cookmaster!


Este é um projeto individual, desenvolvido durante o módulo de back-end do curso de desenvolvimento de software na Trybe. Fique a vontade para contribuir e utilizar.

O projeto Cookmaster é uma API que utiliza a arquitetura MSC (com as camadas Models, Service e Controllers), onde é possível fazer o cadastro e login de usuários, onde apenas esses usuários poderão acessar, modificar e deletar as receitas que cadastrou.

Através dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais íntimas 😜). Além disso, a aplicação possui uma `cobertura de testes acima de 90%` do código.

Para realizar qualquer tipo de alteração no banco de dados (como cadastro, edição ou exclusão de receitas) será necessário autenticar-se. Além disso, os usuários podem ser clientes ou administradores. Clientes apenas poderão disparar ações nas receitas que ele mesmo criou. Já um administrador pode disparar qualquer ação em qualquer receita.

A autenticação é realizada via `JWT`.

É possível adicionar uma imagem à uma receita, utilizando o upload de arquivos fornecido pelo `multer`.

⚠️ **Dicas Importantes** ⚠️:

- Como não há front-end neste projeto, as interações devem ser realizadas através do Insomnia, Postman, Thunder Client ou qualquer outro app que realize requisições http.

&nbsp;&nbsp;

## Instruções para visualizar o projeto

#### Através do terminal do seu computador:
1. Clone o repositório
    * `git clone git@github.com:ricardo-sousa-dev/_trybe-project-28-cookmaster`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd _trybe-project-28-cookmaster`

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start`

3. Realize as requisições http no seu app de preferência

&nbsp;
## Detalhes técnicos
### Pricipais recursos

- Geração e validação de token de autenticação;
- Acesso a rotas privadas com autenticação, utilizando Express e JWT;
- CRUD de receitas;
- Upload de arquivos em APIs REST com Multer;
- Salvar arquivos no servidor através de uma API REST;
- Consultar arquivos do servidor através de uma api REST.
- Testes de integração

### Rotas

* Cadastro de usuários: `POST /users`;
* Cadastro de usuários administradores: `POST /users/admin`;
* Login de usuários: `POST /login`;
* Cadastro de receitas: `POST /recipes`;
* Busca todas as receitas: `GET /recipes`;
* Busca uma receita específica pelo id: `GET /recipes/:id`;
* Altera uma receita específica pelo id: `PUT /recipes/:id`;
* Exclui uma receita específica pelo id: `DELETE /recipes/:id`;
* Insere uma imagem em uma receita específica pelo id: `PUT /recipes/:id`;

&nbsp;
&nbsp;

Caso queira conversar a respeito do projeto, me envie um e-mail.  :)


