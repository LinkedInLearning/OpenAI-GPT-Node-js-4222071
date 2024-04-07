
# Dalle-E : image generation

## 🛠️ Prérequis & Installation

### Node.js
- [Node 19+](https://nodejs.org/en/download)

`node -v`

### Bibliothèques:
- **openai**: Librairie OpenAI qui offre des interfaces pour accéder aux API et modèles de langage
- **nodemon** (optional): utilitaire qui détecte les changements dans les fichiers de développement js pour redémarrer le serveur automatiquement .
- **dotenv**: charge les variables d'environnement à partir d'un fichier .env dans process.env.
- **readline-sync**: bibliothèque Node.js, qui permet de lire l'entrée de l'utilisateur depuis la ligne de commande de manière synchrone


## Installation:
`npm install`

## Démarrer le projet:
`npm start`


## Tester les points de terminaison:

### créer une image
```
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR API KEY" \
  -d '{"input": "swimmingpool"}' \
  http://127.0.0.1:4000/create
```


### afficher les images
```
curl -X GET \
  -H "Accept: application/json" \
  -H "Authorization: YOUR API KEY" \
   http://127.0.0.1:4000/read
```
