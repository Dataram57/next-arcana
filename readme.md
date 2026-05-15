# 🔮 Next Arcana

Describe your situation using tarot cards and predict your future with the support of **AI**.

An app built with **Angular**, **TypeScript**, and **Vercel Serverless Functions**.

## Deployed Demos

- App: [https://next-arcana.vercel.app/](https://next-arcana.vercel.app/)
- API Server: [https://next-arcana.vercel.app/api](https://next-arcana.vercel.app/api)
- Redis Server: [upstash](https://upstash.com/)

## Requirements

- npm
    - Angular CLI: `npm install -g @angular/cli`
- Redis Server
- AI API keys/access:
    - [Google AI Studio](https://aistudio.google.com/)

## AI APIs

API keys are provided through environment variables *(configured in the `/.env` file for local development)*.

- Google AI Studio — `GOOGLE_AI_STUDIO_API_KEY`

There is also a `/.env.base` file containing all supported environment variables.

## Running the Project

### Redis Instance

`/flake.nix` already provides a specific Redis Server version. You can run it with:

```sh
redis-server
```

Alternatively, you can use your own Redis instance.

### Environment Variables

Configure environment variables in `/.env` using `/.env.base` as a template.

Required configuration:

- **Redis Server** connection details
- **AI API** keys/access

### API

```sh
# Initialization
cd api
npm install
cd ..

# Start Vercel Serverless API locally
npx vercel dev --listen 3000
```

### Main App

```sh
# Initialization
npm install

# Start Angular frontend
npm run start
```

# TODO

Main goals:

- Improve GUI and UX ideas.
- Implement support for more AI models.
- Add a preview for the reflection board where all cards are "+1".

