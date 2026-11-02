
const CLE_SESSION = 'sangsante_session';
const ESPACES = {
     donneur: 'tableau_de_bord_donneur.html',
     etablissement: 'tableau_de_bord_etablissement.html'
};
function lireSession() {
     try {
          return JSON.parse(localStorage.getItem(CLE_SESSION));
     } catch (erreur) {
          return null;
     }
}
function enregistrerSession(role, email) {
     try {
          localStorage.setItem(CLE_SESSION, JSON.stringify({ role: role, email: email }));
     } catch (erreur) {
          /* stockage indisponible (navigation privée...) : on continue sans */
     }
}
function terminerSession() {
     try {
          localStorage.removeItem(CLE_SESSION);
     } catch (erreur) {
          /* rien à faire */
     }
}
/* Protection des pages privées (simulation) */
let pageActuelle = location.pathname.split('/').pop();
if (pageActuelle === '') {
     pageActuelle = 'index.html';
}
if (!pageActuelle.endsWith('.html')) {
     pageActuelle = pageActuelle + '.html';
}
const PAGES_PRIVEES = {
     'tableau_de_bord_donneur.html': 'donneur',
     'mon_profil.html': 'donneur',
     'historique_dons.html': 'donneur',
     'tableau_de_bord_etablissement.html': 'etablissement',
     'publier_demande.html': 'etablissement',
     'mes_demandes.html': 'etablissement',
     'publier_campagne.html': 'etablissement'
};
const sessionActive = lireSession();
const roleRequis = PAGES_PRIVEES[pageActuelle];
if (roleRequis && (sessionActive === null || sessionActive.role !== roleRequis)) {
     location.replace('connexion.html');
}
/* Menu */
const bouton = document.getElementById('bouton_menu');
const menu = document.getElementById('menu_principal');
/* Connecté : « Connexion » devient « Mon espace », et un lien « Déconnexion » apparaît */
const dernierLien = menu.querySelector('a:last-child');
if (sessionActive !== null && ESPACES[sessionActive.role]) {
     dernierLien.textContent = 'Mon espace';
     dernierLien.setAttribute('href', ESPACES[sessionActive.role]);
     const lienDeconnexion = document.createElement('a');
     lienDeconnexion.textContent = 'Déconnexion';
     lienDeconnexion.setAttribute('href', 'index.html');
     lienDeconnexion.addEventListener('click', terminerSession);
     menu.insertBefore(lienDeconnexion, dernierLien);
}
/* Met en évidence le lien de la page actuelle */
menu.querySelectorAll('a').forEach(function (lien) {
     if (lien.getAttribute('href') === pageActuelle) {
          lien.setAttribute('aria-current', 'page');
     }
});
function changerEtatMenu(ouvrir) {
     menu.classList.toggle('ouvert', ouvrir);
     bouton.setAttribute('aria-expanded', ouvrir);
     bouton.setAttribute('aria-label', ouvrir ? 'Fermer le menu' : 'Ouvrir le menu');
     bouton.textContent = ouvrir ? '✕' : '☰';
}
bouton.addEventListener('click', function () {
     changerEtatMenu(!menu.classList.contains('ouvert'));
});
/* La touche Échap ferme le menu */
document.addEventListener('keydown', function (evenement) {
     if (evenement.key === 'Escape' && menu.classList.contains('ouvert')) {
          changerEtatMenu(false);
          bouton.focus();
     }
});
/* Un clic en dehors du menu le ferme */
document.addEventListener('click', function (evenement) {
     if (menu.classList.contains('ouvert') && !menu.contains(evenement.target) && !bouton.contains(evenement.target)) {
          changerEtatMenu(false);
     }
});
/* Outils partagés : messages d'erreur des formulaires */
function effacerErreur(element) {
     element.classList.remove('champ_invalide');
     const suivant = element.nextElementSibling;
     if (suivant && suivant.classList.contains('erreur')) {
          suivant.remove();
     }
}
function afficherErreur(element, message) {
     effacerErreur(element);
     element.classList.add('champ_invalide');
     const paragraphe = document.createElement('p');
     paragraphe.className = 'erreur';
     paragraphe.textContent = message;
     element.insertAdjacentElement('afterend', paragraphe);
}
