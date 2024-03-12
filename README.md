# Accès Libre - Une Application Vue.js pour les Établissements PMR

## Présentation

Bienvenue sur Accès Libre, une application Vue.js qui tire parti de l'API Accès Libre fournie par [api.gouv.fr](https://api.gouv.fr/les-api/api-acces-libre). L'objectif principal de cette application est de faciliter l'accès aux informations sur les établissements recevant du public (ERP) adaptés aux personnes à mobilité réduite (PMR).

## Fonctionnalités Principales

### Carte Interactive

Découvrez une carte interactive mettant en évidence les emplacements des établissements PMR dans différentes communes. La carte est alimentée par des données en temps réel provenant de l'API Accès Libre, permettant aux utilisateurs de visualiser facilement la répartition des établissements accessibles.

### Recherche Avancée

Utilisez la fonction de recherche pour trouver des établissements PMR dans une commune spécifique. Saisissez le nom de la commune, appuyez sur le bouton de recherche, et Accès Libre affichera une liste détaillée des établissements accessibles dans la zone sélectionnée.

### Détail
- [x] Recherche par commune
- [x] Affichage sur la carte de la commune recherché
- [x] Affichage de la position (si autorisé)
- [x] Affichage des établissements
- [] Marqueurs personnalisés

## Comment Utiliser Accès Libre

1. **Recherche par Commune**
    - Entrez le nom de la commune dans la barre de recherche.
    - Cliquez sur le bouton de recherche pour afficher les établissements PMR dans cette commune.

2. **Exploration de la Carte**
    - Explorez la carte interactive pour visualiser la localisation géographique des établissements PMR.
    - Cliquez sur les marqueurs pour obtenir des informations détaillées sur chaque établissement.

3. **Détails des Établissements**
    - Consultez les détails des établissements, y compris leur nom, adresse, et site web le cas échéant.
    - Identifiez les établissements adaptés à vos besoins spécifiques.

## Ressources

### API - Accès Libre :
- [x] [Documentation](https://api.gouv.fr/documentation/api-acces-libre),
- [x] [API](https://acceslibre.beta.gouv.fr/api/)

### API Découpage Administratif - (API Geo)
[Documentation](https://api.gouv.fr/documentation/api-geo)
[Lien](https://api.gouv.fr/les-api/api-geo)
[Découpage Administratif](https://geo.api.gouv.fr/decoupage-administratif)

### Leaflet
[Documentation](https://leafletjs.com/)

### Ressources
[Tuto Leaflet](https://medium.com/@smhabibjr/implement-an-interactive-map-in-the-vue-js-8a865010fb41)

## Possibilités Futures

Accès Libre est une application en constante évolution. Voici quelques fonctionnalités envisagées pour les versions futures :

- **Filtres de Recherche Avancés :** Permettre aux utilisateurs de filtrer les résultats en fonction de critères spécifiques tels que le type d'établissement, les équipements disponibles, etc.
- **Mode Navigation :** Intégrer une fonction de navigation pour guider les utilisateurs vers l'établissement de leur choix.
- **Favoris et Avis :** Ajouter la possibilité pour les utilisateurs de sauvegarder leurs établissements préférés et de laisser des avis.

Accès Libre s'efforce de rendre l'information sur les établissements PMR aussi accessible que possible, contribuant ainsi à une société plus inclusive.

## Fix

Pour pouvoir utiliser NuxtImage, utiliser la commande ci-dessous pour l'installation.
```bash
yarn add @nuxt/image --ignore-engines
```