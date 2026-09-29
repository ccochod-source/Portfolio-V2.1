import { EditorialFrame, Breadcrumbs } from '@/components/seo/Editorial';
import { pageMetadata, CONTACT } from '@/lib/seo';

export const metadata = pageMetadata('Confidentialité et données personnelles', 'Comprendre les données utilisées lors d’une visite ou d’une prise de contact avec Cochod Elevate, les outils de mesure et les moyens d’exercer vos droits.', '/confidentialite', '/share/accueil');

export default function PrivacyPage() {
  return <EditorialFrame>
    <Breadcrumbs items={[{ name: 'Accueil', path: '/' }, { name: 'Confidentialité', path: '/confidentialite' }]} />
    <h1 className="text-4xl font-semibold tracking-tight">Confidentialité</h1>
    <div className="mt-10 space-y-10 leading-relaxed [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_a]:underline [&_a]:underline-offset-4">
      <section><h2>Qui contacter ?</h2><p>Le responsable des traitements liés à ce site est Clément Cochod EI, Cochod Elevate, 14 Rue Camille Pelletan, 92120 Montrouge. Pour toute question relative à vos données : <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ou <a href={`tel:${CONTACT.phone}`}>07 43 70 05 96</a>.</p></section>
      <section><h2>Lorsque vous me contactez</h2>
        <p>Le site ne propose ni compte utilisateur ni formulaire. Les liens email et téléphone ouvrent votre application habituelle. Si vous prenez contact, les coordonnées et informations que vous transmettez servent à vous répondre et à étudier votre demande.</p>
        <p>Une demande de prestation relève des mesures précontractuelles prises à votre demande ; les autres échanges relèvent de l’intérêt légitime à répondre aux sollicitations. Ne transmettez pas de données sensibles ou de mots de passe dans une première demande.</p>
        <p>La durée de conservation dépend de la suite de l’échange : traitement de la demande, suivi d’une éventuelle relation contractuelle, puis obligations légales de conservation applicables aux documents concernés. Vous pouvez demander la suppression des données qui ne sont plus nécessaires.</p>
        <p>Les échanges sont traités par Clément Cochod et les prestataires nécessaires à leur acheminement, notamment le service de messagerie iCloud pour l’adresse de contact.</p>
      </section>
      <section><h2>Hébergement et mesure du site</h2>
        <p>Le site est hébergé par Vercel. Le traitement technique des requêtes peut inclure l’adresse IP et les informations nécessaires au fonctionnement et à la sécurité du service.</p>
        <p>Vercel Web Analytics mesure la fréquentation des pages. Vercel Speed Insights mesure notamment la vitesse d’affichage, la réactivité et la stabilité visuelle. Ces outils aident à comprendre l’utilisation et à améliorer les performances du site.</p>
        <p>Selon leur documentation, ces outils fournissent des statistiques anonymisées sans cookies d’identification des visiteurs. Ils peuvent traiter l’adresse des pages, la provenance d’une visite, le pays et des informations sur le navigateur et l’appareil. Le site retire les paramètres et fragments des adresses envoyées aux outils de mesure.</p>
        <p>Vercel indique que l’empreinte temporaire utilisée par Web Analytics pour distinguer une session est abandonnée après 24 heures ; cela ne signifie pas que les statistiques agrégées sont supprimées après 24 heures.</p>
        <p>Vercel est une société américaine et décrit ses traitements internationaux dans sa politique de confidentialité. Consultez les informations de <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">Web Analytics</a>, <a href="https://vercel.com/docs/speed-insights/privacy-policy" target="_blank" rel="noreferrer">Speed Insights</a> et la <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">politique de Vercel</a>.</p>
      </section>
      <section><h2>Présentations et liens externes</h2><p>Certaines fiches proposent des documents Google ou des présentations Canva intégrés, ainsi que des liens vers des démonstrations. Le chargement de ces contenus ou l’ouverture de ces liens peut transmettre des informations techniques, dont votre adresse IP, au service concerné. Ses propres règles de confidentialité et de cookies s’appliquent. Aucun traceur publicitaire n’a été ajouté par Cochod Elevate.</p></section>
      <section><h2>Vos droits</h2><p>Selon le traitement concerné, vous pouvez demander l’accès, la rectification, l’effacement ou la limitation du traitement de vos données, vous y opposer ou demander leur portabilité. Adressez votre demande à <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Ces droits peuvent être limités par les obligations légales de conservation. Vous pouvez également adresser une réclamation à la <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">CNIL</a>.</p></section>
    </div>
  </EditorialFrame>;
}
