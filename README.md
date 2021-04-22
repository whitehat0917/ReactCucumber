# Marcel react app for web
## Prerequirements

`nodejs`, `yarn`, nvm are required to run this project.

Note: `nodejs` should have one of the following versions: `^6.14.0 || ^8.10.0 || >=9.10.0`
to select nodejs run `nvm use`

## Installation
From inside the root folder, execute the following:
```
nvm use
yarn install
```
It will install all needed dependencies.

## Run dev server
From inside the root folder, execute the following:
```
yarn start
```
That will communicate with staging server
It will run dev server by default on `0.0.0.0:3000`. You can change host and port using `HOST` and `PORT` env vars respectively.

## Build
In order to build the project execute the following from inside the root folder:
```
yarn build
```
It will build, minify and optimize code, and output it into the `dist` folder.

## FAQ

#### Q: Do we have any CI?
A: Yes.
We use circleci. The config is here - `.circleci/config.yml`
Once a user pushes to `master` branch. We automatically build to staging. We then upload the files to aws S3 and tell CloudFront (Our CDN) to invalidate the cache.
Same for `production` branch.

#### Q: How do I test?
Make sure you have all the packages by running `npm install`
make sure you have firefox and geckodriver installed and set in PATH

Locally:
1.Run the app
`npm run start`
2.Run the tests
`npm run test:local`

Globally:
It takes around 2 minutes per each browser to run (We have a total of 1000 minutes a month)
`npm run test:auto`

#### Q: Do we have a storybook?
A: Yes.
run it by
`yarn storybook`
