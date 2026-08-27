 <img alt="" style="width: 62px; height: 62px;" src="public/assets/images/logo.svg" />

## 📚 JSONLibrary

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

Projeto idealizado primeiramente para aprendizado em controle de dados, criptografia de dados de cliente, autenticação, codigo limpo, organização e frontend.

O sistema tem como objetivo armazenar dados via URL de lista do tipo JSON. O projeto definitivamente é muito expecifico, porém muitas comunidades na internet usa essa forma de "armazenagem" por ser simples, prática e eficiente. Pra pessoas que salva videos, jogos, images ou qualquer outro com conteúdos de interesse pode lista-los e criar uma biblioteca com base nas proprias informações que quiserem. Essa é uma proposta que tive e achei muito interessante, mas sinto que ainda não alcancei o ponto ideal.

_feito por Ominixjs_

## 📖 Modo de uso:

Para esta começando busque uma plataforma que ajude você a criar links de listas do tipo JSON, como o github gist, assim você consegue gerar links válidos pelo sistema. Tendo isso em mãos, agora é usar um modelo para o tipo da biblioteca e definir os dados usando uma AI de forma prática ou manual.

Para não haver problemas, saiba como estruturar seu JSON. O modelo vai possuir as principais propriedades a seguir. Apartir dessas informações vai ser contruido a primeira base de visualição.

```Javascript
{
    "name": "",
    "description": "",
    "library": [...]
}
```

Agora vou listar modelos válidos pelo sistema. Preste atenção em cada propriedade, vai ser útil para visualição após adicionar ao sistema. Para facilitar, informe o modelo e defina os valores para AI, mas ai fica ao seu critério.

📕 **livros**

```Javascript
{
  "title": "",
  "description": "",
  "releaseDate": "",
  "author": "",
  "tags": [],
  "externalUrl": "",
  "store": "",
  "language": ""
}
```

🎥 **Videos**

```Javascript
{
  "title": "",
  "description": "",
  "releaseDate": "",
  "duration": "",
  "tags": [],
  "externalUrl": "",
  "platform": "",
  "language": "",
  "author": "",
  "thumbnail": ""
}
```

🎥 **Imagens**

```Javascript
{
  "title": "",
  "description": "",
  "releaseDate": "",
  "tags": [],
  "platform": "",
  "externalUrl": ""
}
```

🎮 **Games**

```Javascript
{
  "title": "",
  "description": "",
  "releaseDate": "",
  "genres": [],
  "tags": [],
  "features": [],
  "externalUrl": "",
  "store": "",
  "platforms": [],
  "developer": "",
  "publisher": "",
  "languages": [],
  "coverUrl": "",
  "size": "",
  "requirements": {
    "minimum": {
      "os": "",
      "processor": "",
      "memory": "",
      "graphics": "",
      "storage": "",
      "directX": ""
    },
    "recommended": {
      "os": "",
      "processor": "",
      "memory": "",
      "graphics": "",
      "storage": "",
      "directX": ""
    }
  }
}
```

🔰 **Outros**

```Javascript
{
  "title": "",
  "description": "",
  "releaseDate": "",
  "tags": [],
  "platform": "",
  "externalUrl": "",
}
```

Com base nesses modelos o sistema vai reproduzir os valores de cada propriedade sem nenhum problema. Caso haja, falta de valor ou imcopatibilidade do modelo, pode haver dificuldades ao adicionar na seção de visualização.

Evite adicionar dados sensiveis e pessoais, o sistema não foi projetado para isso.

🧩 Estrutura final:

```Javascript
{
  "name": "",
  "description": "",
  "library": [
    {
      "title": "",
      "description": "",
      "releaseDate": "",
      "tags": [],
      "platform": "",
      "externalUrl": "",
    },
    ...
  ]
}

```

Mais atualizações em breve...

## ⚙ Contribuir:

Caso tenha interesse, pode esta clonando o repositório:

```Javascript
https://github.com/ominixjs/JSONLibrary.git
```
