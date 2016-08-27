# Go Electron

Este é um projeto básico de como usar o Electron para gerar uma aplicação desktop e iniciar um programa em Go como backend ao mesmo tempo. 

Cada arquivo .SH gera uma versão do executável do projeto Go e os arquivos de distribuição do projeto desktop com Electron.

Você não precisa estar no ambiente Windows para gerar as versões para ele, tanto o Go como o Electron permitem cross-compiling (se estiver no OSX, precisará do Wine: https://wiki.winehq.org/MacOSX). 

Copie os arquivos .SH e mude o pacote do projeto Go que deseja gerar o binário. Você precisará adaptar a URL e o título da aplicação de acordo com o seu projeto.

Apesar de também poder gerar para Linux (32/64) eu não criei os scripts por não precisar e não ter como testar, sinta-se a vontade para colaborar.

# Instalação

*Electron*

```
npm install electron -g  
npm install electron-packager -g
npm install
```  

*Seu projeto Go*

```
go get [seu-projeto]
```

*Executar sem fazer pack*

```
npm start
```

# Licença

MIT