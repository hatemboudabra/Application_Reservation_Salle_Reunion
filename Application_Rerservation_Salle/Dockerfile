# Utilisation de l'image Node.js version 10 (avec Alpine Linux)
FROM node:10-alpine

# Création du répertoire pour l'application et attribution des permissions à l'utilisateur 'node'
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Définition du répertoire de travail pour l'application
WORKDIR /home/node/app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Changement de l'utilisateur à 'node' pour l'installation des dépendances
USER node

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers de l'application
COPY --chown=node:node . .

# Exposition du port 8080 (ou du port que votre application utilise)
EXPOSE 8080

# Commande par défaut pour démarrer l'application
CMD [ "node", "app.js" ]

