# 🔮 Next Arcana

Describe your situation with tarot cards and predict your future with a support of **AI**.

App made in **Angular** with **Typescript** and **Vercel Serverless API**.

## Deployed demos

- App: [next-arcana.vercel.app](https://next-arcana.vercel.app/)
- API server: [next-arcana.vercel.app/api](https://next-arcana.vercel.app/api)
- Database: NeonDB database

## Requirements

- ts
- npm
- Access to AI

### AI APIs

API keys are provided as secret environment variables *(set in `/.env` file for local running)*. 

- [Google AI Studio](https://aistudio.google.com/) - `GOOGLE_AI_STUDIO_API_KEY`

There is also a `/.env.base` file that contains a list of all API keys that can be set.

## Running

### Terminal 1 - API:
```sh
# Initialization
cd api
npm install
cd ..

# Please also configure environment variables in `/.env`

# Vercel Serverless API
npx vercel dev --listen 3000
```

### Terminal 2 - App:
```sh
# Initialization
npm install

# Angular Front-end
npm run start
```