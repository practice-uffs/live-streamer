<p align="center">
    <img width="800" src=".github/logo.png" title="Logo do projeto"><br />
    <img src="https://img.shields.io/maintenance/yes/2021?style=for-the-badge" title="Status do projeto">
    <img src="https://img.shields.io/github/workflow/status/practice-uffs/live-streamer/ci.uffs.cc?label=Build&logo=github&logoColor=white&style=for-the-badge" title="Status do build">
</p>

# Live-streamer

O live-streamer é o cliente de um sistema que manipula uma sessão de video conferência, fazendo sua gravação e envio para plataformas de streaming. Todo o processo pode ser controlado remotamente por um operador através da utilização do [live-web](https://github.com/practice-uffs/live-web).

> **IMPORTANTE:** esse projeto é parta da infra-estrutura de um sistema maior. Para conhecer sobre o projeto, visite [dev.practice.uffs.cc](https://dev.practice.uffs.cc)

## ✨ Features

Aqui você pode colocar uma screenshot do produto resultante desse projeto. Descreva também suas features usando uma lista:

* Fácil integração;
* Poucas dependências;
* Utiliza um template lindo para organizar o `README`;
* Possui ótima documentação e testes.

## 🚀 Começando

### 1. Dependências

Para executar o projeto, você precisa ter o seguinte instalado:

- [Git](https://git-scm.com);
- [NodeJS](https://nodejs.org/en/);
- [NPM](https://www.npmjs.com/package/npm);

### 2. Configuração

Feito a instalação das dependências, é necessário obter uma cópia do projeto. A forma recomendada é clonar o repositório para a sua máquina.

Para isso, rode:

```
git clone --recurse-submodules https://github.com/practice-uffs/live-streamer && cd live-streamer
```

Instale também as dependências do NodeJS executando:

```
npm install
```

Crie o arquivo `config.json` a partir do arquivo `config.json.example` para personalizar o sistema para suas necessidades:

```
cp config.json.example config.json
```

### 3. Utilizacão

Depois de seguir todos os passos de instalação, rode o aplicativo como:

```
npm start
```

#### 3.1 Conexão com OBS Studio

Para testar a conexão com o OBS, você precisa instalar o plugin [obs-websocket](https://github.com/Palakis/obs-websocket/releases/tag/4.9.1) para ativar conexão via websocket pelo seu OBS Studio.

Assim que baixar e instalar o plugin, abra o `OBS` e na aba de `tools` selecione `WebSockets Server Settings`, ative o server, selecione uma porta e crie uma senha de autenticação.




## 🤝 Contribua

Sua ajuda é muito bem-vinda, independente da forma! Confira o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para conhecer todas as formas de contribuir com o projeto. Por exemplo, [sugerir uma nova funcionalidade](https://github.com/practice-uffs/live-streamer/issues/new?assignees=&labels=&template=feature_request.md&title=), [reportar um problema/bug](https://github.com/practice-uffs/live-streamer/issues/new?assignees=&labels=bug&template=bug_report.md&title=), [enviar um pull request](https://github.com/ccuffs/hacktoberfest/blob/master/docs/tutorial-pull-request.md), ou simplemente utilizar o projeto e comentar sua experiência.

Veja o arquivo [ROADMAP.md](ROADMAP.md) para ter uma ideia de como o projeto deve evoluir.

## 🎫 Licença

Esse projeto é licenciado nos termos da licença open-source [MIT](https://choosealicense.com/licenses/mit) e está disponível de graça.

## 🧬 Changelog

Veja todas as alterações desse projeto no arquivo [CHANGELOG.md](CHANGELOG.md).

## 🧪 Links úteis

Abaixo está uma lista de links interessantes e projetos similares:

* [Universidade Federal da Fronteira Sul](https://www.uffs.edu.br)
* [Programa Practice](https://practice.uffs.cc)
* [OBS](https://obsproject.com)
* [Streamlabs OBS](https://streamlabs.com)
