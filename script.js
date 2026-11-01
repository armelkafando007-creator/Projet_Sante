/* Menu déroulant du téléphone */
const bouton = document.getElementById('bouton_menu');
const menu = document.getElementById('menu_principal');
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