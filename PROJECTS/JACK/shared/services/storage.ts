async function saveScore(score: Score) {
  try {
    const id = await this.db.add('scores', score);
    return id;
  } catch (error) {
    console.error('Erreur sauvegarde score:', error);
    // Fallback en mémoire
    this.fallbackScores.push(score);
    // Notification utilisateur
  }
}
6. Stratégie de Retry

Automatique : 3 tentatives avec délai exponentiel pour le Cockpit

Manuel : Bouton "Réessayer" sur les écrans d'erreur

Fallback : Mode hors-ligne (IndexedDB) si API indisponible

7. Notifications Utilisateur