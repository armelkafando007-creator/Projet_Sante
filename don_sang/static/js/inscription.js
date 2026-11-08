
const formulaire = document.getElementById('formulaire_inscription');
const champNom = document.getElementById('nom');
const champPrenom = document.getElementById('prenom');
const champGenre = document.getElementById('genre');
const champGroupe = document.getElementById('groupe_sanguin');
const champRegion = document.getElementById('region');
const champVille = document.getElementById('ville');
const champTelephone = document.getElementById('telephone');
const groupeRadios = document.querySelector('fieldset');
const radios = document.querySelectorAll('input[name="deja_donne"]');
const blocDateDon = document.getElementById('bloc_date_don');
const champDate = document.getElementById('derniere_date_don');
/* Date du jour au format AAAA-MM-JJ : on interdit une date dans le futur */
const aujourdhui = new Date().toISOString().slice(0, 10);
champDate.max = aujourdhui;
/* Les outils afficherErreur() et effacerErreur() viennent de script.js (chargé avant ce fichier) */
/* Les vérifications : chacune renvoie true (ok) ou false */
function verifierNomOuPrenom(champ, libelle) {
     const valeur = champ.value.trim();
     const lettresSeulement = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;
     if (valeur === '') {
          afficherErreur(champ, libelle + ' est obligatoire.');
          return false;
     }
     if (!lettresSeulement.test(valeur)) {
          afficherErreur(champ, libelle + ' doit contenir au moins 2 lettres, sans chiffres.');
          return false;
     }
     return true;
}
function verifierChoix(champ, message) {
     if (champ.value === '') {
          afficherErreur(champ, message);
          return false;
     }
     return true;
}
function verifierVille() {
     if (champVille.value.trim().length < 2) {
          afficherErreur(champVille, 'La ville est obligatoire.');
          return false;
     }
     return true;
}
function verifierTelephone() {
     /* On enlève les espaces, points et tirets, puis on teste : 8 chiffres, avec +226 ou 00226 facultatif */
     const numero = champTelephone.value.replace(/[\s.-]/g, '');
     const formatBurkina = /^(\+226|00226)?\d{8}$/;
     if (numero === '') {
          afficherErreur(champTelephone, 'Le numéro de téléphone est obligatoire.');
          return false;
     }
     if (!formatBurkina.test(numero)) {
          afficherErreur(champTelephone, 'Numéro invalide : 8 chiffres attendus (exemple : 70 12 34 56).');
          return false;
     }
     return true;
}
function verifierDejaDonne() {
     const choix = document.querySelector('input[name="deja_donne"]:checked');
     if (choix === null) {
          afficherErreur(groupeRadios, 'Indiquez si vous avez déjà donné du sang.');
          return false;
     }
     return true;
}
function verifierDateDernierDon() {
     const choix = document.querySelector('input[name="deja_donne"]:checked');
     /* Premier don : pas de date à vérifier */
     if (choix === null || choix.value === 'non') {
          return true;
     }
     if (champDate.value === '') {
          afficherErreur(champDate, 'Indiquez la date de votre dernier don.');
          return false;
     }
     if (champDate.value > aujourdhui) {
          afficherErreur(champDate, 'La date ne peut pas être dans le futur.');
          return false;
     }
     return true;
}
/* Premier don : on cache la date du dernier don */
radios.forEach(function (radio) {
     radio.addEventListener('change', function () {
          const premierDon = (radio.value === 'non');
          blocDateDon.hidden = premierDon;
          if (premierDon) {
               champDate.value = '';
               effacerErreur(champDate);
          }
     });
});
/* Dès que le visiteur corrige un champ, son erreur disparaît */
formulaire.addEventListener('input', function (evenement) {
     const element = evenement.target.closest('fieldset') || evenement.target;
     effacerErreur(element);
});
/* À l'envoi du formulaire */
formulaire.addEventListener('submit', function (evenement) {
     evenement.preventDefault();
     const champsEnErreur = [];
     if (!verifierNomOuPrenom(champNom, 'Le nom')) { champsEnErreur.push(champNom); }
     if (!verifierNomOuPrenom(champPrenom, 'Le prénom')) { champsEnErreur.push(champPrenom); }
     if (!verifierChoix(champGenre, 'Choisissez votre genre.')) { champsEnErreur.push(champGenre); }
     if (!verifierChoix(champGroupe, 'Choisissez votre groupe sanguin.')) { champsEnErreur.push(champGroupe); }
     if (!verifierChoix(champRegion, 'Choisissez votre région.')) { champsEnErreur.push(champRegion); }
     if (!verifierVille()) { champsEnErreur.push(champVille); }
     if (!verifierTelephone()) { champsEnErreur.push(champTelephone); }
     if (!verifierDejaDonne()) { champsEnErreur.push(radios[0]); }
     if (!verifierDateDernierDon()) { champsEnErreur.push(champDate); }
     if (champsEnErreur.length > 0) {
          champsEnErreur[0].focus();
          return;
     }
     afficherSucces();
});
/* Message de réussite (simulation, sans serveur pour l'instant) */
function afficherSucces() {
     const ancien = document.querySelector('.message_succes');
     if (ancien) {
          ancien.remove();
     }
     const message = document.createElement('p');
     message.className = 'message_succes';
     message.setAttribute('role', 'status');
     /* textContent (et non innerHTML) : le texte saisi ne peut jamais être interprété comme du code */
     message.textContent = 'Merci ' + champPrenom.value.trim() + ' ! Votre inscription est enregistrée (simulation : le vrai enregistrement viendra avec Django).';
     formulaire.insertAdjacentElement('beforebegin', message);
     message.scrollIntoView({ behavior: 'smooth', block: 'center' });
     formulaire.reset();
     blocDateDon.hidden = false;
}