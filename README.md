This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Administration du site

La home page liste les vidéos hébergées sur **Cloudflare R2** (bucket `assets`, Public Access activé). Les vidéos sont rangées par préfixe :

- `motion/` → section "Motion Design"
- `montage/` → section "Montage Vidéo"
- racine → vidéos non taggées (visibles uniquement dans `/admin/manage`)

Deux pages admin permettent d'uploader et gérer ces vidéos sans rebuild :

- `/admin/upload` — upload direct browser → R2 (signature presigned, contourne la limite Vercel de 4.5 Mo)
- `/admin/manage` — liste toutes les vidéos (y compris celles à classer), permet de changer leur tag ou de les supprimer

### 1. Authentification admin (mot de passe partagé)

`/admin/*` et toutes les routes API d'écriture (`/api/upload/*`, `/api/manage/*`, `/api/revalidate`) sont protégés par **un mot de passe partagé**, vérifié via un cookie de session signé HMAC-SHA256.

Le proxy Next 16 (`src/proxy.ts`) intercepte toutes les requêtes vers ces paths et redirige vers `/admin/login` si le cookie est absent ou invalide. Chaque route API revérifie aussi la session côté serveur (defense in depth).

**Genère le mot de passe et le secret de session :**

```bash
node -e "const c=require('crypto'); console.log('PASSWORD=' + c.randomBytes(16).toString('base64url')); console.log('SECRET=' + c.randomBytes(32).toString('base64url'))"
```

**Partage le mot de passe avec les autres admins** via un gestionnaire de mots de passe (1Password, Bitwarden) — **jamais en clair par message/email**. Le secret de session, lui, ne sort jamais du serveur.

Le cookie de session est valable **30 jours**, `HttpOnly`, `Secure` (en prod), `SameSite=Lax`. Un ratelimite basique (5 tentatives / 5 min / IP) protège la page de login contre le brute-force.

### 2. Variables d'environnement

Copier `.env.example` vers `.env.local` et remplir :

```
R2_ACCOUNT_ID=         # Cloudflare account ID
R2_ACCESS_KEY_ID=      # API Token R2 (Object Read & Write)
R2_SECRET_ACCESS_KEY=  # secret associé
R2_BUCKET_NAME=assets
NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.motus-pocus.com
ADMIN_PASSWORD=        # mot de passe partagé (16+ caractères recommandé)
ADMIN_SESSION_SECRET=  # secret aléatoire 32+ caractères pour signer les cookies
```

Sur Vercel : ajouter ces mêmes variables dans **Project Settings → Environment Variables** (Production + Preview).

`NEXT_PUBLIC_R2_PUBLIC_URL` est la seule variable exposée au client — c'est le domaine public (custom ou `.r2.dev`) du bucket. Tout le reste reste côté serveur.

### 3. Workflow d'upload

1. Aller sur `/admin/upload`
2. Saisir le mot de passe admin sur `/admin/login` (redirection automatique si non connecté)
3. Choisir la catégorie (Motion Design / Montage Vidéo)
4. Glisser ou sélectionner la vidéo (`.webm`, `.mp4` ou `.mov`, max 500 Mo)
5. Cliquer "Uploader" — l'upload se fait directement vers R2 sans transiter par Vercel

La vidéo apparaît sur la home après revalidation (déclenchée automatiquement à la fin de l'upload).

### 4. Workflow de gestion

1. Aller sur `/admin/manage`
2. Voir toutes les vidéos en 3 sections :
   - **À classer** (vidéos sans tag, à la racine du bucket — invisibles sur la home)
   - **Motion Design**
   - **Montage Vidéo**
3. Sur chaque vidéo, choisir une action :
   - "→ Motion Design" / "→ Montage Vidéo" pour changer le tag
   - "Renommer" (édition inline, conserve le timestamp et l'extension)
   - "Supprimer" (avec confirmation)

Les actions sont implémentées comme copy + delete côté R2 (S3 n'a pas de move/rename natif). La home est revalidée automatiquement.

### 5. Rotation du mot de passe

Si le mot de passe fuite ou si un co-admin part :

1. Génère un nouveau `ADMIN_PASSWORD` (et idéalement un nouveau `ADMIN_SESSION_SECRET` pour invalider toutes les sessions actives)
2. Met à jour les env vars dans Vercel
3. Redéploie

Tous les cookies signés avec l'ancien secret deviennent invalides → tous les utilisateurs sont déconnectés.
