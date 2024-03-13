# Projeto final do módulo POO - Simulação de Banco de Dados

A idéia do projeto é simples: vocês devem criar um banco de dados ao qual vamos armazenar
informações de pessoas;

Para a execução desta tarefa, vocês precisam ter 3 classes: BancoDeDados, Pessoa e um
Menu;

## Como rodar o projeto
1. Instalar dependências
```
npm install
```
2. Rodar o projeto
```
npm start
```

## Equipe:

✅ Grupo 2 -

Ana Westhpal: [@anawesthpal](https://github.com/anawesthpal)

João Saraiva: [@jsaraivasapori](https://github.com/jsaraivasapori)

Fillipe Miranda: [@famgz](https://github.com/famgz)


**SIMULAÇÃO DE BANCO DE DADOS**

A idéia do projeto é simples: vocês devem criar um banco de dados ao qual vamos armazenar informações de pessoas;

Para a execução desta tarefa, vocês precisam ter 3 classes: BancoDeDados, Pessoa e um Menu;

A classe BancoDeDados deverá ter o atributo listaDePessoas e, neste atributo vocês precisam adicionar todos os dados que vão receber da aplicação;

Obrigatoriamente, vocês precisam ter os métodos de adicionar, listar, buscarPeloNome, atualizar e deletar uma pessoa;

O método adicionar, só deverá realizar a sua tarefa de adição, caso não exista uma pessoa com o mesmo nome já gravada no banco. Caso tenha, deverá dar um feedback para o usuário, informando o erro que não foi possível adicionar uma pessoa. Caso tenha tido sucesso na adição, deverá informar que foi adicionado com sucesso;

O método de listar deverá fazer a listagem de todos os dados que já existem gravados na listaDePessoas;

O método buscarPeloNome, vocês de fato vão fazer a busca da pessoa pelo nome. Caso ela exista, retorna esse objeto. Caso não exista, informa ao usuário que não existe uma pessoa com esse nome no banco de dados;

O método de atualização, deverá buscar a pessoa que vocês desejam atualizar (verificando se existe de fato ou não). Caso exista, deverá atualizar a mesma no banco de dados. Caso contrário, deverá informar um erro de que não foi localizada tal pessoa;

O método de deletar deverá, primeiramente, verificar se existe essa pessoa no banco e, caso não exista, deverá informar ao usuário. Do contrário, deverá realizar a deleção da mesma e dar o feedback ao usuário;

A classe Pessoa deverá ter apenas os atributos de nome, idade e email. Em seu construtor, vocês precisam validar se os dados recebidos são condizentes com o que se espera (ex.: no atributo nome, eu não posso de forma alguma receber um numérico). Todos os atributos da pessoa vão ser privados. Logo, vocês vão criar getters e setters para cada um deles;

Por fim, teremos a classe Menu, onde vocês vão criar um menu simples e, cada funcionalidade do menu, será o que o banco de dados de vocês consegue fazer: Uma funcionalidade de listar todas as pessoas, uma funcionalidade de adicionar uma pessoa, uma de atualizar, uma de buscar pelo nome e uma de deletar uma pessoa do banco;

