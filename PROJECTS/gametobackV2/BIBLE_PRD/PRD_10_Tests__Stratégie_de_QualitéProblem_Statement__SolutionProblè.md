Solution : Mettre en place une suite de tests d'intégration avec Vitest et React Testing Library, ciblant les interactions utilisateur et les flux fonctionnels. Ajouter des tests de bout en bout (optionnels) avec Cypress ou Playwright pour les parcours critiques.
User StoriesEn tant que développeur, je veux exécuter les tests en local avant chaque commit, afin de détecter les régressions.

En tant que développeur, je veux que les tests soient rapides (< 1 min), afin de ne pas ralentir le développement.

En tant que développeur, je veux que les tests soient lisibles et orientés comportement, afin de comprendre facilement ce qui est testé.

En tant que chef de projet, je veux un rapport de couverture pour identifier les zones non testées, afin de prioriser les efforts.

Implementation DecisionsFramework : Vitest (intégré à Vite) pour la rapidité.

Bibliothèques : @testing-library/react, @testing-library/user-event, @testing-library/jest-dom.

Setup :