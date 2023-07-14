# Dindin

## Sumário 

- [Sumário](#sumario)
- [Sobre o projeto](#sobre-o-projeto)
- [Stacks](#stacks)

## Sobre o projeto

O presente projeto possui como objetivo possibilitar ao usuário listar as suas transações financeiras, de entrada e saída de valores. 

Ao executar o projeto, a página inicial é a de Sign-In, que possibilita a realização de login do usuário, onde ao submeter os dados do formulário, será feito um POST na API, que retornará um token para validação, que será armazenado no LocalStorage. Com o token, o usuário é redirecionado para a página Main da aplicação.

Caso o usuário não possua cadastro, ele poderá se cadastrar na rota de Sign-Up, onde ao inserir Nome, e-mail, senha e confirmação de senha, estando as senhas iguais, ele é feito um POST na API, o usuário é cadastrado e redirecionado para a rota Sign-In.

Na rota Main, o usuário poderá realizar o cadastro de transações de entrada ou saída de valores, e em sequência é exibida em formato de lista. A transação poderá ser editada e excluída, através de botões na linha da tabela.

A aplicação possui um resumo das transações, onde consta os valores totais de entrada, os valores totais de saída, e o saldo restante.

Também é permitido ao usuário realizar a atualização dos seus dados.

O layout da aplicação foi feito seguindo o Style Guide e protótipos das telas, apresentadas no Figma, com tamanho fixo de 1440px x 1024px.

## Stacks

* React
* CSS
* Axios
* React-Router-Dom
