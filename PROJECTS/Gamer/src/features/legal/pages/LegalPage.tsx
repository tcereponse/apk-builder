x

export function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-8">Mentions légales</h1>
      
      <div className="prose dark:prose-invert prose-slate max-w-none">
        <h2>1. Éditeur du site</h2>
        <p>
          Le site GAMER (ci-après "le Site") est édité par la société GAMER SAS,
          au capital de 50 000 €, immatriculée au RCS de Paris sous le numéro 123 456 789,
          dont le siège social est situé au 12 Rue du Gaming, 75001 Paris.
        </p>
        <p>
          Directeur de la publication : Jean Dupont<br />
          Contact : contact@gamer.example.com
        </p>
        
        <h2>2. Hébergeur</h2>
        <p>
          Le Site est hébergé par Vercel Inc.<br />
          340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
          https://vercel.com
        </p>
        
        <h2>3. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus du Site (textes, images, vidéos, logos, etc.)
          est la propriété exclusive de GAMER SAS. Toute reproduction, distribution
          ou utilisation sans autorisation préalable est strictement interdite.
        </p>
        
        <h2>4. Données personnelles</h2>
        <p>
          Les données personnelles collectées sur le Site sont traitées conformément
          à notre Politique de confidentialité. Vous disposez d'un droit d'accès,
          de rectification et de suppression de vos données en nous contactant à
          privacy@gamer.example.com.
        </p>
        
        <h2>5. Cookies</h2>
        <p>
          Le Site utilise des cookies pour améliorer votre expérience de navigation.
          Vous pouvez configurer vos préférences à tout moment via les paramètres de votre navigateur.
        </p>
        
        <h2>6. Responsabilité</h2>
        <p>
          GAMER SAS s'efforce de fournir des informations exactes et à jour.
          Toutefois, elle ne peut garantir l'exactitude, la complétude ou l'actualité
          des informations diffusées sur le Site.
        </p>
      </div>
    </div>
  )
}