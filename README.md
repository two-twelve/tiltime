# [TilTi.me](https://tilti.me/)

It's a timer app. You can use it for things like:

- Keeping track of your deadlines 📚
- Seeing how long it is until your next birthday 🎂
- Counting down the days until your next holiday 🏖️

All of the little drawing animations were implemented using [Rough Notation](https://roughnotation.com/).



## Development Setup

TilTi.me is a [Vue 3](https://vuejs.org/) + TS project setup using [Vite](https://vitejs.dev/).

```bash
git clone git@github.com:two-twelve/tiltime.git
cd tiltime
npm install
npm run dev
```

[Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) have also been setup on TilTi.me:

```bash
npm run format
npm run lint
```

And tests have been implemented using [Jest](https://jestjs.io/):

```bash
npm run test
```



## Production Deployment

You can build TilTi.me for deployment by doing:

```bash
npm run build
```

You'll find all your static files in `/dist`. You can preview a production deployment by doing:

```bash
npm run preview
```

We deploy tilti.me to [Cloudflare Pages](https://pages.cloudflare.com/) :)
