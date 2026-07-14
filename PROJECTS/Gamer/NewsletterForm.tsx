x - ligne 31-38
try {
  NewsletterSubscriptionSchema.parse(data)
  await newsletterService.subscribe(data)
  // ...
} catch (error) {
  setStatus('error')
  if (error instanceof z.ZodError) {
    setErrorMessage(error.errors[0]?.message || 'Données invalides')
  } else if (error instanceof Error) {
    setErrorMessage(error.message)
  } else {
    setErrorMessage('Une erreur est survenue. Veuillez réessayer.')
  }
}

Fichiers publics nécessaires :