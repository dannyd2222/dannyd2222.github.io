# Area admin — guida setup (GitHub Pages + Vercel API)

Il sito resta **statico su GitHub Pages**. Le modifiche al profilo passano da una **API serverless su Vercel** (`services/profile-api`) che committa `src/data.json` via GitHub Contents API. Dopo ogni salvataggio, il workflow **Deploy to GitHub Pages** ricostruisce e pubblica il sito.

---

## Architettura

1. `/login` → redirect a GitHub OAuth (solo utente autorizzato).
2. `/auth/callback` → salva il JWT in `sessionStorage` e apre `/admin`.
3. `/admin` → form MUI; **Salva su GitHub** → `PUT /api/profile`.
4. La API aggiorna `src/data.json` nel repository → push/commit → GitHub Actions → sito live.

---

## 1. GitHub OAuth App

1. Vai su [GitHub → Settings → Developer settings → OAuth Apps → New OAuth App](https://github.com/settings/applications/new).
2. Compila:
   - **Application name**: es. `dannyd2222-profile-admin`
   - **Homepage URL**: `https://dannyd2222.github.io`
   - **Authorization callback URL**: la imposterai dopo il deploy Vercel (passo 3). Formato:
     ```
     https://<TUO-PROGETTO-VERCEL>.vercel.app/api/auth/callback
     ```
3. Crea l’app e annota **Client ID** e genera un **Client secret**.

> L’OAuth usa scope `read:user` solo per verificare la tua identità. Le scritture sul repo usano un **PAT** separato (passo 2).

---

## 2. Fine-grained Personal Access Token (PAT)

1. [GitHub → Settings → Developer settings → Fine-grained tokens → Generate](https://github.com/settings/personal-access-tokens).
2. **Repository access**: solo `dannyd2222/dannyd2222.github.io`.
3. **Permissions → Repository contents**: **Read and write**.
4. Genera e copia il token (non lo rivedrai).

Conservalo come secret Vercel `GITHUB_PAT`.

---

## 3. Deploy della API su Vercel

### Prerequisito: cartella `services/profile-api` su GitHub

Vercel legge il **repository remoto**, non la tua copia locale. Se in “Root Directory” non compare `services/profile-api`, quasi sempre quella cartella **non è ancora su `main`**.

1. In locale, verifica che esista: `ls services/profile-api` (devono esserci `package.json`, `vercel.json`, cartella `api/`).
2. Committa e pusha su GitHub tutto il lavoro admin, incluso almeno:
   - `services/profile-api/` (con `package-lock.json` se presente)
   - `docs/ADMIN_SETUP.md`, pagine `/admin`, `/login`, ecc.
3. Su GitHub apri il repo → tab **Code** → controlla che vedi la cartella **`services`** → **`profile-api`**.

Solo dopo puoi importare o riconfigurare il progetto su Vercel.

### Import su Vercel

1. Crea account su [vercel.com](https://vercel.com) (piano Hobby gratuito).
2. **Add New → Project** → importa il repository `dannyd2222.github.io`.
3. Nella schermata **Configure Project**, cerca **Root Directory**:
   - clicca **Edit** accanto a “./” (root del repo);
   - si apre l’albero delle cartelle **del commit su GitHub**;
   - seleziona **`services`** → **`profile-api`**, oppure digita manualmente: `services/profile-api`;
   - conferma con **Continue**.
4. Resto configurazione:
   - **Framework Preset**: Other (o lascia auto; `vercel.json` imposta `framework: null`).
   - **Build Command**: `npm run typecheck` (già in `vercel.json`).

   **Progetto già creato con root sbagliata:** *Settings* → *General* → **Root Directory** → imposta `services/profile-api` → salva e fai **Redeploy**.

5. **Environment Variables** (Production, e opzionalmente Preview):

   | Nome | Esempio | Note |
   |------|---------|------|
   | `GITHUB_CLIENT_ID` | da OAuth App | |
   | `GITHUB_CLIENT_SECRET` | da OAuth App | |
   | `GITHUB_PAT` | `github_pat_...` | Contents read/write |
   | `GITHUB_REPO` | `dannyd2222/dannyd2222.github.io` | |
   | `GITHUB_ALLOWED_LOGIN` | `dannyd2222` | minuscolo |
   | `JWT_SECRET` | stringa lunga random | es. `openssl rand -hex 32` |
   | `OAUTH_CALLBACK_URL` | `https://xxx.vercel.app/api/auth/callback` | **identica** alla callback OAuth |
   | `ALLOWED_ORIGINS` | `https://dannyd2222.github.io,http://localhost:3000` | origini del sito statico |
   | `DATA_JSON_PATH` | `src/data.json` | default, opzionale |

6. Deploy. Annota l’URL **Production** da *Settings → Domains* (es. `https://dannyd2222-profile-api.vercel.app`).
   Non usare un URL di un singolo deploy tipo `…-xxxx-username.vercel.app`: è una preview e spesso è protetta da SSO Vercel.

7. **Deployment Protection** (obbligatorio per OAuth pubblico):
   Vercel → progetto API → **Settings → Deployment Protection**.
   - Disattiva **Vercel Authentication** su **Production** (e su Preview se testi da localhost).
   - Altrimenti `/api/auth/github` reindirizza a `vercel.com/sso-api` invece che a GitHub, e dopo il login vedi 404 o una pagina di accesso Vercel.

8. Torna all’**OAuth App** su GitHub e imposta **Authorization callback URL** =
   `https://<url-produzione-vercel>/api/auth/callback`.

9. Aggiorna su Vercel `OAUTH_CALLBACK_URL` con lo stesso valore se non l’avevi già messo, poi **Redeploy**.

### Verifica rapida API

- Apri nel browser (sostituisci l’URL):
  ```
  https://<url-vercel>/api/auth/github?returnUrl=http://localhost:3000/auth/callback
  ```
  Dovresti essere reindirizzato a GitHub.

---

## 4. Collegare il sito statico all’API

L’URL Vercel va nel build del sito Next (variabile **pubblica**):

### GitHub Actions (produzione)

1. Repo → **Settings → Secrets and variables → Actions → Variables**.
2. Aggiungi **Repository variable**:
   - Nome: `PROFILE_API_URL`
   - Valore: `https://<url-vercel>` (**solo origine**, senza `/api` e senza slash finale)

   | Corretto | Sbagliato (causa 404) |
   |----------|------------------------|
   | `https://nome.vercel.app` | `https://nome.vercel.app/api/auth/callback` |

Il workflow `deploy-pages.yml` passa `NEXT_PUBLIC_PROFILE_API_URL` a `npm run build`.

### Sviluppo locale

Nella root del progetto:

```bash
cp .env.local.example .env.local
```

Modifica `.env.local`:

```
NEXT_PUBLIC_PROFILE_API_URL=https://<url-vercel>
```

`NEXT_PUBLIC_PROFILE_API_URL` / `PROFILE_API_URL` è l’**origine** dell’API. È diversa da `OAUTH_CALLBACK_URL` (che invece è `https://<url-vercel>/api/auth/callback` e va solo su Vercel + GitHub OAuth App).

Poi:

```bash
npm run dev
```

Aggiungi `http://localhost:3000` in `ALLOWED_ORIGINS` su Vercel se non c’è già.

---

## 5. Utilizzo

1. Vai su `https://dannyd2222.github.io/login` (o `/login` in locale).
2. **Accedi con GitHub** con l’account indicato in `GITHUB_ALLOWED_LOGIN`.
3. Modifica **Competenze**, **Esperienze**, **Istruzione** in `/admin`.
4. **Salva su GitHub** → commit su `src/data.json` → Actions deploy → sito aggiornato in pochi minuti.

La sessione è un JWT in `sessionStorage` (si chiude con la scheda del browser). **Esci** rimuove il token.

---

## 6. Sicurezza

- Non committare PAT, client secret o `JWT_SECRET`.
- Solo l’utente `GITHUB_ALLOWED_LOGIN` può ottenere un token dopo OAuth.
- Le route `GET/PUT /api/profile` richiedono `Authorization: Bearer <JWT>`.
- Il PAT resta solo su Vercel.

---

## 7. Troubleshooting

| Problema | Cosa controllare |
|----------|------------------|
| Login da `/login` finisce su 404 Vercel | `NEXT_PUBLIC_PROFILE_API_URL` / `PROFILE_API_URL` deve essere **solo** `https://….vercel.app`. Se include `/api/auth/callback` il login apre `…/api/auth/callback/api/auth/github` (404). Riavvia `npm run dev` dopo aver corretto `.env.local`. |
| Login finisce su SSO Vercel o 404 dopo GitHub | URL preview (`…-hash-user.vercel.app`) o **Deployment Protection** attiva. Usa il dominio Production e disattiva Vercel Authentication. |
| OAuth redirect_uri mismatch | `OAUTH_CALLBACK_URL` = callback registrata su GitHub OAuth App |
| Account non autorizzato | `GITHUB_ALLOWED_LOGIN` = username GitHub corretto |
| 401 su salvataggio | Sessione scaduta (12h) → login di nuovo |
| 403/404 su Contents API | PAT con Contents **Read and write** sul repo giusto |
| CORS | Origine del sito in `ALLOWED_ORIGINS` |
| Sito non aggiornato dopo save | Tab **Actions**: workflow Deploy completato; cache browser |
| Vercel: *No Output Directory named "public"* | Il progetto API include `services/profile-api/public/` e in `vercel.json` è `outputDirectory: "public"`. In **Settings → General** imposta **Output Directory** = `public` (o lascia che legga da `vercel.json`). |
| Vercel: errore dopo `tsc --noEmit` | Apri il deploy → scorri **sotto** il typecheck. Se c’è `esbuild` / `allowScripts`, serve `services/profile-api/.npmrc` su `main`. |
| Deploy “Ready” ma 404 su `/api/...` | Root Directory deve essere `services/profile-api`, non la root del repo |

---

## 8. Costi

- **GitHub Pages + Actions** (repo pubblico): gratuito per questo uso.
- **Vercel Hobby**: function invocations entro free tier per un admin personale.

---

## File rilevanti nel repo

| Percorso | Ruolo |
|----------|--------|
| `services/profile-api/` | API Vercel (OAuth + profile) |
| `src/pages/login.tsx` | Ingresso OAuth |
| `src/pages/auth/callback.tsx` | Ricezione token |
| `src/pages/admin/index.tsx` | Editor |
| `src/data.json` | Source of truth committata dalla API |
