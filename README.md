This application is designed to make it easy to place people into their top choices,
subject to any specified constraints. Perfect for school admins, summer camps,
and anyone else who had to do the previously difficult task of trying to make sure
everyone gets the best outcome possible in a mathematically optimal way. (That is sure to
disappoint everybody!)

See it live at: https://cscanlin.github.io/choice-optimizer/

# Technology

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and uses [redux](https://github.com/reactjs/redux/) for state management. It also uses [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) for some minor styling and the front-end is deployed with [gh-pages](https://github.com/tschaub/gh-pages).

The backend runs all of the data through [scipy's linprog algorithm](https://docs.scipy.org/doc/scipy/reference/optimize.linprog-simplex.html) but requires some fairly heavy processing/vectorization to meet the required format. The main algorithm is deployed to [Amazon Lambda](https://aws.amazon.com/lambda/) and heavily leverages [this excellent repo](https://github.com/ryansb/sklearn-build-lambda) by @ryansb as well as [Docker](https://www.docker.com/) to compile and process the scipy/numpy dependencies for deployment.

# Installing and Running

TODO

Questions, Comments or Bugs? Drop me a note on the issue tracker!
