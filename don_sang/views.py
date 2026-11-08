from django.shortcuts import render

# Create your views here.

def accueil(request):
    return render(request, 'mon_app_sante/index.html') 
    # Note : Django va chercher automatiquement dans le dossier templates/don_sang/index.html


def afficher_page(request, template):
    return render(request, f'mon_app_sante/{template}.html')