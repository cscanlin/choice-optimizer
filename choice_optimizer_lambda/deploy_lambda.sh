THIS_DIR=`dirname $0`

deploy () {
    cp $THIS_DIR/choice_optimizer_deps.zip $THIS_DIR/choice_optimizer_latest.zip
    zip $THIS_DIR/choice_optimizer_latest.zip $THIS_DIR/handlers.py $THIS_DIR/choice_optimizer.py
    echo "zipped!"
    aws s3 cp $THIS_DIR/choice_optimizer_latest.zip s3://cscanlin-choice-optimizer/
    echo "uploaded!"
    aws lambda update-function-code \
      --function-name choice-optimizer \
      --s3-bucket cscanlin-choice-optimizer \
      --s3-key choice_optimizer_latest.zip
    echo "finished!"
}

deploy
