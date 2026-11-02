
const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function brancherFormulaire(formulaire, role) {
     const champEmail = formulaire.querySelector('input[type="email"]');
     const champMotDePasse = formulaire.querySelector('input[type="password"]');
     /* Dès que le visiteur corrige un champ, son erreur disparaît */

     formulaire.addEventListener('input', function (evenement) {
          effacerErreur(evenement.target);
     });
     formulaire.addEventListener('submit', function (evenement) {
          evenement.preventDefault();
          const champsEnErreur = [];
          if (!formatEmail.test(champEmail.value.trim())) {
               afficherErreur(champEmail, 'Entrez une adresse e-mail valide (exemple : nom@domaine.bf).');
               champsEnErreur.push(champEmail);
          }
          /* À la connexion, on ne révèle pas les règles du mot de passe : on vérifie seulement qu'il est rempli */

          if (champMotDePasse.value === '') {
               afficherErreur(champMotDePasse, 'Entrez votre mot de passe.');
               champsEnErreur.push(champMotDePasse);
          }
          if (champsEnErreur.length > 0) {
               champsEnErreur[0].focus();
               return;
          }
          /* Simulation : on retient seulement le rôle et l'e-mail, jamais le mot de passe */
          
          enregistrerSession(role, champEmail.value.trim());
          location.href = ESPACES[role];
     });
}
brancherFormulaire(document.getElementById('formulaire_connexion_donneur'), 'donneur');
brancherFormulaire(document.getElementById('formulaire_connexion_etablissement'), 'etablissement');