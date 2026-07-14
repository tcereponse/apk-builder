x

export function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-8">Politique de confidentialité</h1>
      
      <div className="prose dark:prose-invert prose-slate max-w-none">
        <h2>1. Collecte des données</h2>
        <p>
          Nous collectons les données que vous nous fournissez volontairement lors de votre inscription
          à notre newsletter ou lors de votre contact avec nous. Ces données incluent :
        </p>
        <ul>
          <li>Adresse email</li>
          <li>Nom d'utilisateur (si vous en fournissez un)</li>
          <li>Préférences de communication</li>
        </ul>
        
        <h2>2. Utilisation des données</h2>
        <p>
          Les données collectées sont utilisées pour vous envoyer des communications
          concernant les actualités de GAMER, les événements à venir, et les contenus
          exclusifs. Elles ne sont jamais vendues ou partagées avec des tiers.
        </p>
        
        <h2>3. Cookies</h2>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience sur notre Site.
          Les cookies sont de petits fichiers texte stockés sur votre appareil.
          Vous pouvez les désactiver à tout moment dans les paramètres de votre navigateur.
        </p>
        
        <h2>4. Durée de conservation</h2>
        <p>
          Vos données sont conservées aussi longtemps que vous êtes abonné à notre newsletter.
          Vous pouvez vous désabonner à tout moment via le lien présent dans chaque email
          ou en nous contactant directement.
        </p>
        
        <h2>5. Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul>
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité des données</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à privacy@gamer.example.com.
        </p>
        
        <h2>6. Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
          pour protéger vos données contre tout accès non autorisé ou toute perte.
        </p>
      </div>
    </div>
  )
}