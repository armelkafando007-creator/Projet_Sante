from django.urls import path
from . import views

urlpatterns = [
    path('', views.accueil, name='accueil'),
    path('actualites/', views.afficher_page, {'template': 'actualites'}, name='actualites'),
    path('aide/', views.afficher_page, {'template': 'aide'}, name='aide'),
    path('a-propos/', views.afficher_page, {'template': 'a_propos'}, name='a_propos'),
    path('connexion/', views.afficher_page, {'template': 'connexion'}, name='connexion'),
    path('contact/', views.afficher_page, {'template': 'contact'}, name='contact'),
    path('demandes-actives/', views.afficher_page, {'template': 'demandes_actives'}, name='demandes_actives'),
    path('gestion-demandes/', views.afficher_page, {'template': 'gestion_demandes'}, name='gestion_demandes'),
    path('historique-dons/', views.afficher_page, {'template': 'historique_dons'}, name='historique_dons'),
    path('inscription-donneur/', views.afficher_page, {'template': 'inscription_donneur'}, name='inscription_donneur'),
    path('inscription-etablissement/', views.afficher_page, {'template': 'inscription_etablissement'}, name='inscription_etablissement'),
    path('mes-demandes/', views.afficher_page, {'template': 'mes_demandes'}, name='mes_demandes'),
    path('mon-profil/', views.afficher_page, {'template': 'mon_profil'}, name='mon_profil'),
    path('publier-actualite/', views.afficher_page, {'template': 'publier_actualite'}, name='publier_actualite'),
    path('publier-campagne/', views.afficher_page, {'template': 'publier_campagne'}, name='publier_campagne'),
    path('publier-demande/', views.afficher_page, {'template': 'publier_demande'}, name='publier_demande'),
    path('statistiques/', views.afficher_page, {'template': 'statistiques'}, name='statistiques'),
    path('tableau-de-bord-admin/', views.afficher_page, {'template': 'tableau_de_bord_admin'}, name='tableau_de_bord_admin'),
    path('tableau-de-bord-donneur/', views.afficher_page, {'template': 'tableau_de_bord_donneur'}, name='tableau_de_bord_donneur'),
    path('tableau-de-bord-etablissement/', views.afficher_page, {'template': 'tableau_de_bord_etablissement'}, name='tableau_de_bord_etablissement'),
    path('validation-etablissements/', views.afficher_page, {'template': 'validation_etablissements'}, name='validation_etablissements'),
]