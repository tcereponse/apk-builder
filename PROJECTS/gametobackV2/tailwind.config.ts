centralisé avec les couleurs, les polices et les plugins personnalisés, afin de maintenir facilement le thème.

Implementation DecisionsConfiguration Tailwind : Extension des couleurs avec slate et zinc (déjà présentes), ajout de variables CSS pour les surfaces glass (ex: --glass-bg: rgba(255,255,255,0.05)).

Plugins personnalisés : Créer un plugin Tailwind pour la classe glass appliquant backdrop-filter: blur(12px), background: rgba(255,255,255,0.05), border: 1px solid rgba(255,255,255,0.1), etc.

Composants partagés : Dans src/shared/components/ui/ : Button, Input, Card, Badge, Skeleton, Modal, Toast. Chaque composant utilise clsx et tailwind-merge pour la composition de classes.

Thème : Utiliser un Context ThemeContext pour basculer entre sombre et clair (par défaut sombre). Mais en phase 1, on ne gère que le sombre pour simplifier.

Typographie : Utiliser la police system (par défaut) ou importer Inter via Google Fonts (@import dans index.css).

Icons : Lucide React, avec un wrapper Icon pour homogénéiser la taille et la couleur.


Testing DecisionsTester les composants UI de manière visuelle (snapshots ?) mais surtout fonctionnelle : vérifier que les classes appliquées changent en fonction des props (variant, size, etc.).

Tester l'accessibilité avec jest-axe (optionnel).

Ne pas tester les détails du glassmorphism (purement CSS).

Out of ScopeMode clair complet.

Personnalisation avancée des couleurs par l'utilisateur.

Police personnalisée autre que Inter.