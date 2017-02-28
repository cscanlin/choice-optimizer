deploy () {
    cp choice_optimizer_deps.zip choice_optimizer_latest.zip
    zip choice_optimizer_latest.zip handlers.py choice_optimizer.py
    aws s3 cp choice_optimizer_latest.zip s3://cscanlin-choice-optimizer/
    aws lambda update-function-code \
      --function-name choice-optimizer \
      --s3-bucket cscanlin-choice-optimizer \
      --s3-key choice_optimizer_latest.zip
}

deploy
