# NetworkAcademy

Plateforme d'apprentissage réseau 100% statique (HTML/CSS/JS) conçue pour être hébergeable partout.

## ✅ État actuel

### Implémenté en priorité
- Page d'accueil professionnelle (`index.html`)
- Calculateur de sous-réseaux IPv4 (`tools/subnet-calculator.html` + `js/subnet-calculator.js`)
- Design responsive moderne avec thème clair/sombre (`css/style.css` + `js/main.js`)

### Structure déjà prête
- Dossiers `tools/`, `courses/`, `resources/`, `css/`, `js/`, `assets/`
- Pages placeholder créées pour accélérer les prochaines itérations

## Lancer en local

Depuis le dossier `network-academy/` :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Déploiement statique

### Netlify
1. Créer un nouveau site.
2. Importer ce dossier (`network-academy`) ou connecter le repo.
3. Build command: *(laisser vide)*
4. Publish directory: `network-academy`

### Vercel
1. New Project > Import Git Repository.
2. Framework Preset: `Other`.
3. Build command: *(vide)*
4. Output directory: `network-academy`

### GitHub Pages
1. Pousser le repo sur GitHub.
2. Settings > Pages.
3. Source: branche principale, dossier `/network-academy` (ou `/root` si vous déplacez les fichiers).

## Contraintes respectées
- Pas de backend
- Pas de marque IA dans le footer
- Code modifiable facilement
- Compatibilité hébergement statique
