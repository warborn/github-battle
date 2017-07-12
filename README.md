Github Battle project from the React Fundamentals course at [reacttraining.com](https://reacttraining.com/)
======

Some of the concepts applied are:
- React Components
- PropTypes
- React Router
- Github API integration
- AJAX calls with [axios](https://github.com/mzabriskie/axios)
- JavaScript Promises
- Webpack configuration
- NPM scripts to deploy to production using firebase
- ES6/7 features like arrow functions, async/await, object destructuring

### You can find the live version [here](https://wb-github-battle.netlify.com/)

You can view the popular repositories from github and filter them by technology like Ruby, CSS, Java, etc.

![Image of the repo list screenshot](https://s20.postimg.org/w69icp2ct/popular-repos.jpg)

### Battle

Enter two valid Github usernames

![Image of the user selection screenshot](https://s20.postimg.org/43lj5kv8t/battle-setup.jpg)

Click the battle button and see who is the winner based on the number of followers and repositories of each user.

![Image of the battle results screenshot](https://s20.postimg.org/tnntc0gml/battle-results.jpg)

### Installation

Install all the dependencies.

```sh
$ cd github-battle
$ npm install
```

Try it on your local environment, execute the following command and wait for webpack to finish and go to http://localhost:8080/
```sh
$ npm run start
```

Build for production with:
```sh
$ npm run build
```

You can deploy it to firebase, first need to login with the firebase CLI and init the project, then just run the deploy command
```sh
$ npm run firebase-init
$ npm run deploy
```