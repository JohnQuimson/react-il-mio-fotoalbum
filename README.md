<h1 align="center">
  
  react-il-mio-fotoalbum
  
</h1>

<!-- <h4 align="center">summary <a href="http://electron.atom.io" target="_blank">"link"</a>.</h4> -->

<!-- <p align="center">
  <a href="https://badge.fury.io/js/electron-markdownify">
    <img src="https://badge.fury.io/js/electron-markdownify.svg"
         alt="Gitter">
  </a>
  <a href="https://gitter.im/amitmerchant1990/electron-markdownify"><img src="https://badges.gitter.im/amitmerchant1990/electron-markdownify.svg"></a>
  <a href="https://saythanks.io/to/bullredeyes@gmail.com">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
  <a href="https://www.paypal.me/AmitMerchant">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p> -->

<p align="center">
  <a href="#description">Description</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#used-technologies">Used technologies</a> 
</p>

<!-- ![Blog Image](src/assets/blog.png) -->

## Description

ci hanno commissionato un lavoro : un fotografo vuole mostrare agli utenti le foto più belle che ha scattato e ci chiede di realizzare una webapp che permetta questo.

Ha bisogno di un’area di amministrazione per gestire le foto, quindi

- vedere tutte quelle inserite (filtrabili)
- vedere i dettagli di una singola foto
- aggiungerne di nuove (con validazione)
- modificarle (con validazione)
- cancellarle

Ovviamente queste operazioni può svolgerle solo lui, quindi l’accesso alle pagine deve essere protetto da autenticazione.

- Una foto contiene almeno le seguenti informazioni :
- Una foto può essere collegata a più categorie, e una categoria può essere collegata a più foto.
- Prevedere quindi anche una semplice pagina di lista, creazione e cancellazione categorie.
- Deve essere presente anche una homepage pubblica, nella quale le foto (visibili) sono mostrate agli utenti.
- Devono essere filtrabili per titolo.
- Prevedere sempre nell’homepage pubblica un semplice form di contatto avente i campi email e messaggio.
- Il click sul tasto invia farà partire una richiesta a una nuova api che salverà sul database il messaggio inviato.
- L’applicazione va realizzata sfruttando React per la parte frontend e Express + Api per la parte backend.

### BONUS

La webapp originariamente progettata per un fotografo che vuole mostrare le sue foto, è stata evoluta in una piattaforma multiutente che consente a diversi utenti, come altri fotografi, di utilizzarla per condividere le loro foto. Per fare queste operazioni gli utenti avranno il ruolo di amministratori, ma soltanto delle loro foto, non di quelle degli altri. E’ importante quindi poter gestire un livello di protezione adeguato.
È stata inoltre introdotta la figura del superadmin, che ha il potere di nascondere qualsiasi foto presente nella piattaforma per aumentare la sicurezza e la moderazione delle foto. Il superadmin quindi potrà agire sulla visibilità pubblica delle foto e nasconderle a tutti gli utenti.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
 git clone ('link of the repository')

# Go into the repository
 cd ('file name') or cd .

# Install dependencies
 npm install

# Run the app
 npm run dev
```

## Used technologies

This software uses the following technologies:

- [Node.js](https://)
- [Express](https://)

> GitHub [@JohnQuimson](https://github.com/JohnQuimson) &nbsp;&middot;&nbsp;
> Twitter [@John Henric Quimson](https://www.linkedin.com/in/john-henric-quimson-973827280/)
