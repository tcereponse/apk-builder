Solution : Un ThemeManager qui gère trois thèmes prédéfinis : light, dark, diamond. Il applique les classes CSS Tailwind dynamiques (via data-theme ou classes conditionnelles) et persiste le choix dans localStorage. Le thème est exposé via le contexte pour que les composants puissent s'y adapter.
User StoriesEn tant que joueur, je veux choisir un thème parmi trois (clair, sombre, diamond) via un sélecteur dans l'interface, afin d'adapter l'ambiance visuelle.

En tant que joueur, je veux que le thème choisi soit immédiatement appliqué sans rechargement, afin de voir l'effet en temps réel.

En tant que joueur, je veux que le thème soit mémorisé entre les sessions, afin de ne pas le reselectionner à chaque visite.

En tant que joueur, je veux que les couleurs des pièces restent lisibles quel que soit le thème, pour éviter toute confusion.

Implementation Decisions (Deep Modules)Deep Module : ThemeManager – expose :
setTheme(theme: Theme), getTheme(): Theme

subscribe(callback)


Implémentation : Utilisation d'un attribut data-theme sur l'élément <html> ou <body>. Les classes Tailwind sont définies avec des sélecteurs basés sur cet attribut (ex: [data-theme="dark"] .bg-primary). On peut aussi utiliser des variables CSS pour une flexibilité maximale.

Composant sélecteur : Un ThemeSelector affichant les trois options avec des aperçus de couleurs.

Intégration : Le ThemeManager est instancié dans le App et son état est partagé via un contexte dédié (ThemeContext) ou via le GameProvider (extension de l'état global).

Testing DecisionsIntégration : Tester que le changement de thème applique les bonnes classes CSS (via getComputedStyle ou vérification de l'attribut data-theme).

Comportement : Tester la persistance du thème (rechargement de la page).

Out of ScopeCréation de thèmes personnalisés par l'utilisateur.

Import de fichiers CSS externes.