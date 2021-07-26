### Backend Test
[![Build Status](https://travis-ci.com/jpellissari/jazz-irrigation-robot.svg?branch=main)](https://travis-ci.com/jpellissari/jazz-irrigation-robot)
[![Coverage Status](https://coveralls.io/repos/github/jpellissari/jazz-irrigation-robot/badge.svg?branch=master)](https://coveralls.io/github/jpellissari/jazz-irrigation-robot?branch=master)

# Setup
## Rodando localmente via nodeJS
  1. Abrir a pasta raiz do projeto via console
  2. `yarn` ou `npm install` para instalar as dependencias
  3. `yarn start` ou `npm run start` para subir o servidor iniciar a aplicação console

# Comandos
  Ao rodar o programa o menu é exibido:
  ```
  Hortaliças e Hortaliças: resolução de caminho para robo irrigador

  uso:
    <comando>

    os comandos aceitos são:

    criar-horta: usado para criar uma nova horta
    criar-robo:  usado para criar e configurar um robo
    resolver:    usado para resolver o problema da irrigação
    ajuda:       usado para exibir estas intruções

  comando:
```
A partir deste ponto o programa está aguardando um comando para continuar.
## Descrição dos comandos
- criar-horta: Cria a hora informando seu tamanho e quais os canteiros deverão ser irrigados;
- criar-robo: Cria o robo informando qual a posição inicial e para onde o robo está apontando 
- resolver: Resolve o problema de irrigação retornando qual foi o caminho utilizado pelo robo e qual a direção que ele está apontando ao final da execução.
- ajuda: exibe o menu com instruções do programa

## Padrões de parâmetros
### Tamanho
O tamanho deve ser informado da seguinte maneira:
(largura, altura)
Por exemplo, para criar uma horta de tamanho 4x4, deverá ser informado o valor '(4,4)' quando solicitado.

### Coordenada
As coordenadas devem seguir o padrão (x, y).
Então caso queira informar a posição inicial do robo como sendo 0,0; o valor '(0,0)' deverá ser informado quando solicitado.

### Direção 
A direção do robo possui 4 valores possíveis (N, S, L, O). Para informar que o robo está apontando para norte, por exemplo, o valor 'N' deverá ser informado quando solicitado.

## Criação da Horta
Para criar a horta é necessário informar alguns parâmetros:
1. Tamanho da horta
2. Quais canteiros serão irrigados

O tamanho da horta deverá seguir o padrão de tamanho informado a seguir, já os valores de canteiros a serem irrigados deverão ser digitados um por vez seguindo o padrão de coordenada! Ao finalizar de digitar os canteiros a serem irrigados é só pressionar enter que a horta será cadastrada e o programa continuará a execução.

## Criação do Robo
Para criar o robo mais dois parâmetros são necessários:
1. Posição inicial do robo
2. Direção que está apontado

Quando solicitado deverá ser digitado a posição inicial seguindo o padrão de coordenada e a direção seguindo o padrão de direção.

## Resolução do Problema
Após cadastrar uma horta e um robo, o programa estará apto a resolver o problema. Para isso basta digitar o comando 'resolver' que a saída será apresentada com os movimentos utilizados e a direção final do robo.

## Fluxo para resolução do problema
1. Criar uma horta
2. Criar um robo
3. Resolver o problema

# Requisitos
Alguns requisitos que utilizei para auxiliar no desenvolvimento podem ser encontrados aqui:
1. [Horta](./requirements/garden.md)
2. [Canteiro da Horta](./requirements/patch.md)
3. [Robo](./requirements/robot.md)

# Testes
Tentei cobrir o máximo de código que eu pude, um coverage report pode ser gerado utilizando `yarn test:complete`. Concentrei em testes unitários utilizando TDD em alguns momentos de lógica um pouco mais pesada, como para resolver o caminho de irrigação

# Arquitetura escolhida
Bom, eu decidi partir para um arquitura em camadas com um domínio bem definido. A melhor forma mais confortável para utilizar essa aplicação me pareceu ser o console. Criei na camada main adaptadores de rota para o console, bem como o ponto de partida da aplicação

### core
Alguns arquivos centrais para o sistema. Aqui concentrei a classe Either que é como trato os erros em toda a aplicação.

### domain
Concentração das regras do domínio. Dividido em módulos para melhor entendimento. Um trabalho futuro seria criar abstrações de entidades e objetos de valor para deixar o código ainda mais claro.

### use-cases
Concentra os casos de uso da aplicação para conseguir manipular os objetos de domínio. Composto primordialmente por alguns arquivos:
- UseCase propriamente dito
- Testes unitários do use-case
- Controlador do UseCase
- Index file: factory para a criação do controlador

Eu decidi deixar os controllers junto com os use-cases mais por simplificação da estrutura mesmo.

### presentation
Responsável por alguns protocolos para utilizar o console.

### repositories
Implementei repositórios para a horta e o robo, criei implementações em memória para salvar a horta e o robo. Criei singletons para conseguir acessar somente um repositório pela aplicação.

### main
Aqui é onde a "mágica" acontece, camada que acopla o sistema interno ao console para receber os comandos.
