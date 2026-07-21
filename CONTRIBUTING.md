# Contribuer à DevPortfolio

Merci de votre intérêt pour contribuer ! Ce guide vous aidera à démarrer.

## 🚀 Démarrage

```bash
# Clone le repo
git clone <repo-url>
cd devportfolio

# Installe les dépendances
npm install

# Lance le serveur de dev
npm run dev

# Vérifie que tout marche
npm run verify
```

## 📋 Prérequis

- Node.js 20+
- npm 10+

## 🔄 Workflow de contribution

1. **Fork** le projet
2. Crée une **branche** : `git checkout -b feature/ma-feature`
3. **Code** en suivant les conventions
4. **Teste** : `npm run verify` doit passer
5. **Commit** avec conventional commits
6. **Push** et crée une **Pull Request**

## 📝 Conventional Commits

Nous utilisons les [conventional commits](https://www.conventionalcommits.org/) :

```
feat: ajoute une nouvelle feature
fix: corrige un bug
docs: documentation
style: formatage (pas de changement de code)
refactor: refactoring
test: ajout de tests
chore: tâches de maintenance
```

Exemple : `feat: ajoute le filtrage des tâches par catégorie`

## 🎨 Style de code

- **TypeScript strict** (pas de `any`)
- **ESLint** + **Prettier** (config fournie)
- Composants fonctionnels avec hooks
- Props typées avec interfaces
- Nomage : PascalCase pour composants, camelCase pour fonctions

## 🧪 Tests

- Couverture minimum : 80%
- Tests unitaires : Vitest + React Testing Library
- Nom des fichiers : `*.test.tsx`

```bash
npm test           # Mode watch
npm run test:coverage  # Coverage
```

## 🏗️ Architecture

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour les décisions techniques.

- **Feature-based** : chaque feature dans `src/features/{feature}/`
- **Design system** : composants partagés dans `src/shared/ui/`
- **Couche données** : repository pattern + TanStack Query

## 🐛 Signaler un bug

Ouvrez une [issue](../../issues) avec :
- Description du bug
- Étapes pour reproduire
- Comportement attendu vs actuel
- Screenshots si applicable

## 💡 Proposer une feature

Ouvrez une issue avec le label `enhancement` et décrivez :
- Le problème que ça résout
- La solution proposée
- Les alternatives envisagées

## 📜 Code de conduite

Soyez respectueux et bienveillant. Voir [Code of Conduct](./CODE_OF_CONDUCT.md).

---

Généré par **React Forge** — Gold Grade Industrial
