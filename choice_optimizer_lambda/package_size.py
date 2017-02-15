from zappa import zappa
import os

Z = zappa.Zappa()
file = Z.create_lambda_zip(
    use_precompiled_packages=False,
    exclude_conda_packages=[
        'openssl',
        'pip',
        'python',
        'readline',
        'sqlite',
        'wheel',
        'boto3',
        'botocore',
        'lambda-packages'
    ],
)
file_stats = os.stat(file)
print('The package size is {} Mb'.format(int(file_stats.st_size / 1024.0 / 10.24) / 100.0))
