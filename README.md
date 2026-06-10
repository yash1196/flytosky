# Yash Patel Aviation — Website

A modern, dark-themed aviation website built with React + Vite + Tailwind CSS.

---

## Quick Start (Run Locally)

### Step 1 — Install Node.js
Download and install Node.js LTS from: https://nodejs.org
This also installs `npm` automatically.

Verify:
```bash
node -v
npm -v
```

### Step 2 — Open this project folder in your terminal
```bash
cd yash-aviation
```

### Step 3 — Install dependencies
```bash
npm install
```

### Step 4 — Run the local dev server
```bash
npm run dev
```
Open your browser to: http://localhost:5173

---

## Customize Your Content

### Things to update before launching:

1. **Student count & checkride passes** — In `src/components/About.jsx`, find the two cards that say `X` and replace with your real numbers.

2. **Instagram handle** — In `src/components/Footer.jsx`, update `@yashpatelaviation` to your actual Instagram handle.

3. **Formspree (Contact Form)** — See setup below.

4. **Instagram feed** — See setup below.

---

## Set Up the Contact Form (Formspree)

1. Go to https://formspree.io and create a free account
2. Click "New Form" → give it a name (e.g., "Aviation Website Contact")
3. Copy the form endpoint — it looks like: `https://formspree.io/f/xyzabc123`
4. Open `src/components/Contact.jsx`
5. Find this line near the top:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
   ```
6. Replace `YOUR_FORM_ID` with your actual form ID from Formspree
7. Save the file — contact form submissions will now land in your email inbox

**Free tier:** 50 submissions/month. More than enough to start.

---

## Set Up the Instagram Feed (Behold.so)

When your Instagram account is ready:

1. Go to https://behold.so and sign up (free)
2. Connect your Instagram account
3. Create a feed and copy the widget code they give you
4. Open `src/components/Instagram.jsx`
5. Find the placeholder grid (the `Array.from({ length: 8 })` section)
6. Replace it with your Behold embed code:
   ```html
   <behold-widget feed-id="YOUR_FEED_ID"></behold-widget>
   ```
7. Add their script tag inside the same file using a `useEffect`:
   ```jsx
   useEffect(() => {
     const script = document.createElement('script')
     script.src = 'https://w.behold.so/widget.js'
     script.type = 'module'
     document.head.appendChild(script)
   }, [])
   ```

---

## Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub account
Sign up at https://github.com if you don't have one.

### Step 2 — Create a new repository
- Click "New repository"
- Name it: `yash-aviation`
- Keep it Public
- Don't initialize with README

### Step 3 — Connect your local project to GitHub
In your terminal (inside the project folder):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/yash-aviation.git
git push -u origin main
```
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### Step 4 — Update vite.config.js
Make sure `base` in `vite.config.js` matches your repo name:
```js
base: '/yash-aviation/',
```

### Step 5 — Deploy
```bash
npm run deploy
```

Your site will be live at:
`https://YOUR_GITHUB_USERNAME.github.io/yash-aviation/`

### Future updates
After making any changes to your site:
```bash
npm run deploy
```
That's it — the site updates automatically.

---

## Custom Domain (Optional — ~$10/year)

If you want `www.yashpatelaviation.com` instead of a GitHub Pages URL:

1. Buy a domain from Namecheap (https://namecheap.com) — about $10/year for a .com
2. In your GitHub repo → Settings → Pages → Custom domain → enter your domain
3. Follow GitHub's DNS setup guide for Namecheap

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Fonts | Inter + Playfair Display (Google Fonts, free) |
| Contact form | Formspree (free tier) |
| Instagram feed | Behold.so (free tier) |
| Hosting | GitHub Pages (free) |

**Total cost: $0** (unless you add a custom domain, ~$10/year)
