
const filtreGroupe = document.getElementById('filtre_groupe');
const filtreUrgence = document.getElementById('filtre_urgence');
const lignes = document.querySelectorAll('#demandes_actives tbody tr');
const messageVide = document.getElementById('message_vide');
function appliquerFiltres() {
     const groupeChoisi = filtreGroupe.value;
     const urgenceChoisie = filtreUrgence.value;
     let nombreVisibles = 0;
     lignes.forEach(function (ligne) {
          const groupeDeLaLigne = ligne.cells[0].textContent.trim();
          const urgenceDeLaLigne = ligne.cells[3].textContent.trim();
          const groupeOk = (groupeChoisi === 'tous') || (groupeDeLaLigne === groupeChoisi);
          const urgenceOk = (urgenceChoisie === 'tous') || (urgenceDeLaLigne === urgenceChoisie);
          const afficher = groupeOk && urgenceOk;
          ligne.hidden = !afficher;
          if (afficher) {
               nombreVisibles = nombreVisibles + 1;
          }
     });
     messageVide.hidden = (nombreVisibles > 0);
}
filtreGroupe.addEventListener('change', appliquerFiltres);
filtreUrgence.addEventListener('change', appliquerFiltres);