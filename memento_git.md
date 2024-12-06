# **Mémento Git - Nuit de l'Info**

## **Cloner le dépôt**

1. **Cloner le dépôt principal** :

```bash
git clone git@github.com:LoloWork/Youcean.git
```

2. **Ouvrir le projet dans VS Code** :

```bash
code ./Youcean
```

---

## **Règles essentielles**

1. **Ne codez jamais directement sur la branche `main`**.
2. **Travaillez uniquement sur votre propre branche**.
3. Respectez le **naming pattern** pour vos branches :
   - Branche principale de travail : `develop-<votre_prenom>`
   - Branche spécifique à une fonctionnalité : `develop-<votre_prenom>-<nom_feature>`

---

## **Création d'une branche**

Pour aller sur votre branche principale :

```bash
git checkout develop-<votre_prenom>
```

Pour créer une branche dédiée à une fonctionnalité :

```bash
git checkout -b develop-<votre_prenom>-<nom_feature>
```

---

## **Workflow de contribution**

### 1. **Ajouter vos modifications**

```bash
git add .
```

### 2. **Créer un commit**

```bash
git commit -m "<message_commit>"
```

### 3. **Pousser vos modifications sur le dépôt distant**

```bash
git push origin <nom_branche>
```

### 4. **Mettre à jour votre branche parente (si nécessaire)**

Si vous avez crée une branche spécifique à une fonctionnalité, assurez vous que votre branche est à jour avec `develop-<votre_prenom>-<nom_feature>` :

```bash
git merge develop-<votre_prenom>
```

### 5. **Toujours mettre à jour vos branches parentes**

```bash
git checkout main
git fetch origin
git pull origin main
git checkout develop
git fetch origin
git pull origin develop
git checkout develop-<votre_prenom>
git merge origin/main
```

- Mettez à jour votre branche principale avec la branche parente :

```bash
git merge develop-<votre_prenom>
```

### 5. **Créer une Pull Request**

- On ne fais pas de Pull Request directement sur la branche `main`.
- La PR doit être faites après avoir récupéré les dernières modifications de la branche `main` et fixer les conflits.

- Une fois vos modifications terminées, créez une Pull Request de votre branche `develop-<votre_prenom>` vers `develop`.

---

## **Commandes utiles**

### **Branches**

- **Créer une branche** :

```bash
git branch <nom_branche>
```
  
- **Changer de branche** :
  ```bash
  git checkout <nom_branche>
  ```
- **Supprimer une branche locale** :
  ```bash
  git branch -d <nom_branche>
  ```
- **Supprimer une branche distante** :
  ```bash
  git push origin --delete <nom_branche>
  ```

### **Commits**
- **Créer un commit** :
  ```bash
  git commit -m "<message_commit>"
  ```
- **Supprimer le dernier commit** (local uniquement) :
  ```bash
  git reset --hard HEAD~1
  ```

### **Push**
- **Pousser vos modifications** :
  ```bash
  git push origin <nom_branche>
  ```

### **Pull**
- **Récupérer les dernières modifications** :
  ```bash
  git pull origin <nom_branche>
  ```

### **Fetch**
- **Récupérer les informations des branches distantes** :
  ```bash
  git fetch origin
  ```

### **Merge**
- **Fusionner une branche locale dans la branche active** :
  ```bash
  git merge <nom_branche>
  ```
- **Fusionner une branche distante** :
  ```bash
  git merge origin/<nom_branche>
  ```

---

## **Bonnes pratiques**

1. Faites des **commits fréquents et descriptifs**.
2. **Pull régulièrement** pour rester à jour avec les modifications des autres.
3. Avant de pousser, assurez-vous que votre code fonctionne (testez !).
4. **Communiquez avec votre équipe** si vous rencontrez des conflits de merge.

---
