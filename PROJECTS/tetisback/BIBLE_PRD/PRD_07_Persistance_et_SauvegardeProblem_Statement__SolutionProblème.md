Solution : Un PersistanceService utilisant localStorage avec validation Zod pour stocker le high score, les paramètres utilisateur (thème, son activé) et éventuellement les statistiques globales. Il expose des méthodes asynchrones (ou synchrones) pour lire/écrire.
User StoriesEn tant que joueur, je veux que mon meilleur score soit sauvegardé automatiquement après chaque partie, afin de pouvoir le battre plus tard.

En tant que joueur, je veux que le thème et l'état du son soient conservés d'une session à l'autre, afin de ne pas avoir à les reconfigurer.

En tant que joueur, je veux pouvoir réinitialiser les paramètres par défaut via un bouton dans les options, afin de repartir de zéro.

En tant que développeur, je veux que les données stockées soient validées pour éviter la corruption.

Implementation Decisions (Deep Modules)Deep Module : PersistanceService – expose :
saveHighScore(score: number), loadHighScore(): number | null

saveSettings(settings: UserSettings), loadSettings(): UserSettings

resetSettings(), resetHighScore()


Schémas Zod :
HighScoreSchema : { score: number, lines: number, level: number, date: string }

UserSettingsSchema : { theme: 'light' | 'dark' | 'diamond', soundEnabled: boolean, zenMode: boolean }


Validation : À la lecture, si les données ne correspondent pas au schéma, elles sont ignorées et les valeurs par défaut sont utilisées.

Utilisation : Le GameProvider charge les paramètres au montage et les sauvegarde à chaque changement. Le high score est sauvegardé lors du Game Over.

Testing DecisionsIntégration : Simuler une partie, sauvegarder le score, recharger le provider et vérifier que le high score est récupéré.

Unitaires : Tester la validation Zod avec des données invalides.

Out of ScopeSauvegarde cloud (pas de backend).

Export/import des données.

Historique des parties.