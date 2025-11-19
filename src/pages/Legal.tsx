import React from "react";

const Legal: React.FC = () => (
  <div className="max-w-3xl mt-8 mx-auto p-4 font-sans leading-6 text-orange-800">
    <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>
    <section className="bg-white p-4 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-2">Éditeur du site</h2>
      <p>
        <strong className="font-bold">Nom du site :</strong> To-Doom
      </p>
      <p>
        <strong className="font-bold">Responsable de la publication :</strong>{" "}
        Emmanuelle Eiselé{" "}
      </p>
      <p>
        <strong className="font-bold">Adresse :</strong> 31 boulevard des
        provinces, Sainte-Foy les Lyon
      </p>
      <p>
        <strong className="font-bold">Email :</strong> <a href="mailto:todoom.contact@gmail.com" className="no-underline">todoom.contact@gmail.com</a>
      </p>
    </section>
    <section className="bg-white p-4 rounded-2xl mt-4">
      <h2 className="text-2xl font-semibold mb-2">Hébergement</h2>
      <p>
        <strong className="font-bold">Hébergeur :</strong> Render{" "}
      </p>
      <p>
        <strong className="font-bold">Adresse :</strong> 525 Brannan St., Suite
        300 San Francisco, CA 94107 États-Unis. builtin.com
      </p>
      <p>
        <strong className="font-bold">Téléphone :</strong> +1 415-830-4762
      </p>
    </section>
    <section className="bg-white p-4 rounded-2xl mt-4">
      <h2 className="text-2xl font-semibold mb-2">Propriété intellectuelle</h2>
      <p>
        Le contenu du site (textes, images, logo, etc.) est protégé par le droit
        d’auteur. Toute reproduction ou utilisation sans autorisation est
        interdite.
      </p>
    </section>
    <section className="bg-white p-4 rounded-2xl mt-4">
      <h2 className="text-2xl font-semibold mb-2">Politique de confidentialité</h2>
      <p>
        Les informations personnelles collectées via ce site (formulaire de
        contact, inscription, etc.) sont utilisées uniquement dans le cadre de
        la gestion du service. Elles ne sont jamais transmises à des tiers sans
        consentement.
      </p>
      <p>
        Conformément à la loi Informatique et Libertés et au RGPD, vous disposez
        d’un droit d’accès, de rectification et de suppression de vos données.
        Pour exercer ce droit, contactez-nous à l’adresse indiquée ci-dessus.
      </p>
    </section>
    <section className="bg-white p-4 rounded-2xl mt-4">
      <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
      <p>
        Ce site peut utiliser des cookies pour améliorer l’expérience
        utilisateur. Vous pouvez configurer votre navigateur pour refuser les
        cookies.
      </p>
    </section>
    <section className="bg-orange-200 p-4 rounded-2xl mt-4">
      <h2 className="text-2xl font-semibold mb-2">Contact</h2>
      <p>
        Pour toute question concernant les mentions légales ou la politique de
        confidentialité, veuillez nous contacter à l’adresse indiquée ci-dessus.
      </p>
    </section>
  </div>
);

export default Legal;
