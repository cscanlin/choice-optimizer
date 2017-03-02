# Choice Optimizer

This application is designed to make it easy to place people into their top choices,
subject to any specified constraints. Perfect for school admins, summer camps,
and anyone else who had to do the previously difficult task of trying to make sure
everyone gets the best outcome possible in a mathematically optimal way. (That is sure to
disappoint everybody!)

See it live at: https://cscanlin.github.io/choice-optimizer/

## Technology

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and uses [redux](https://github.com/reactjs/redux/) for state management. It also uses [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) for some minor styling and the front-end is deployed with [gh-pages](https://github.com/tschaub/gh-pages).

The backend runs all of the data through [scipy's linprog algorithm](https://docs.scipy.org/doc/scipy/reference/optimize.linprog-simplex.html) but requires some fairly heavy processing/vectorization to meet the required format. The main algorithm is deployed to [Amazon Lambda](https://aws.amazon.com/lambda/) and heavily leverages [this excellent repo](https://github.com/ryansb/sklearn-build-lambda) by @ryansb as well as [Docker](https://www.docker.com/) to compile and process the scipy/numpy dependencies for deployment.

## Installing and Running

#### Installation

    git clone https://github.com/cscanlin/choice-optimizer.git
    cd choice-optimizer
    pip install -r requirements
    npm install

#### Running the Front-End Locally (with no API):

    npm start

#### Running the Server Locally (Requires Python 3):

    npm run build
    python optimizer_server.py

(You don't even technically need the build to run the server as a simple web api)

#### Deploying (Requires Docker):

First you will need a new amazon lambda function, and to paste the url to `OPTIMIZER_ENDPOINT` in: `src/constants/optimizerConstants.js`. (There's actually quite a bit of configuration needed on the AWS side as well, but that's out of scope for this guide. I imagine if anyone want to use this themselves, they will be for the most part running it locally or cannibalizing functionality. If you want to deploy this somewhere yourself, you'll probably know how to figure this out.)

You will also need to change the S3 url in `choice_optimizer_lambda/deploy_lambda.sh` to one of your choosing.

Then, change the homepage url in `package.json` to your new homepage.

Finally, call the following which is the only thing required in subsequent deployments:

    bash full_deploy.sh

This script calls three other scripts which does the following:
  1. builds C dependencies into a zip
  2. adds handler and optimizer script to zip, and uploads to s3
  3. deploys the front end to github pages

You can call any of these scripts independently by using the commands found in the `full_deploy.sh` file.

Questions, Comments or Bugs? Drop me a note on the issue tracker!
