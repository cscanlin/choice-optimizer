THIS_DIR=`dirname $0`

# build C dependencies into zip
docker run -v $THIS_DIR/choice_optimizer_lambda:/outputs -it amazonlinux:2016.09 bash /outputs/build_lambda_deps.sh

# add handler and script to zip, and upload to s3
bash $THIS_DIR/choice_optimizer_lambda/deploy_lambda.sh

# deploy the front end to github pages
npm run deploy
