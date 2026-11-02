const emplacementEmail = document.getElementById('email_connecte');
const session = lireSession();
if (session !== null){
    emplacementEmail.textContent = session.email;
}