🔎 **Smart, Extensible Build Framework**

## Project setup / initialization

This project setup was created by executing folling steps

- install nx globally `npm i nx`
- install dependencies `npm install` or `npm i`

## How to run tests

- npm run full-test

## Run both frontend and backend

- npm run both

## Limitations

- The backend currently stores both values as string, as such it will not work after the maximum string length limit (although you will hit the javascript memory heap problem first)

- There is a possibility of mismatched types between the frontend and backend, due to the lack of TRPC

- The newest value of pi is always recalculated from the start (a better implementation of BBP should only compute the nth digit)

## Future work

- To add isLoading and isError handler on react-query, probably with a UI framework that handles it well with Skeletons.

- To add test for those as well

- To add tests for the hooks (current hooks are just API calls so maybe not)

- Backend only has unit tests for high value functions, should probably wrap in a e2e test as well to ensure the entire behaviour is also consistent

- To add tests into husky pre-commit hook, to prevent bad commits from getting all the way to github (github also doesn't run the test on CI, but that's a seperate issue)
