#!/bin/bash

# TO RUN:
# docker run -v $(pwd):/outputs -it amazonlinux:2016.09 bash /outputs/build_lambda_deps.sh

set -ex

yum update -y
yum install -y \
    atlas-devel \
    atlas-sse3-devel \
    blas-devel \
    gcc \
    gcc-c++ \
    lapack-devel \
    python27-devel \
    python27-virtualenv \
    findutils \
    zip

do_pip () {
    pip install --upgrade pip wheel
    pip install --use-wheel --no-binary numpy numpy
    pip install --use-wheel --no-binary scipy scipy
}

strip_virtualenv () {
    echo "venv original size $(du -sh $VIRTUAL_ENV | cut -f1)"
    find $VIRTUAL_ENV/lib64/python2.7/site-packages/ -name "*.so" | xargs strip
    echo "venv stripped size $(du -sh $VIRTUAL_ENV | cut -f1)"

    pushd $VIRTUAL_ENV/lib64/python2.7/site-packages/ && zip -r -9 -q /outputs/choice_optimizer_deps.zip * ; popd
    echo "site-packages compressed size $(du -sh /outputs/choice_optimizer_deps.zip | cut -f1)"

    pushd $VIRTUAL_ENV && zip -r -q /outputs/full-venv.zip * ; popd
    echo "venv compressed size $(du -sh /outputs/full-venv.zip | cut -f1)"
}

shared_libs () {
    libdir="$VIRTUAL_ENV/lib64/python2.7/site-packages/lib/"
    mkdir -p $VIRTUAL_ENV/lib64/python2.7/site-packages/lib || true
    cp /usr/lib64/atlas/* $libdir
    cp /usr/lib64/libquadmath.so.0 $libdir
    cp /usr/lib64/libgfortran.so.3 $libdir
}

main () {
    /usr/bin/virtualenv \
        --python /usr/bin/python /choice_optimizer_build \
        --always-copy \
        --no-site-packages
    source /choice_optimizer_build/bin/activate

    do_pip

    shared_libs

    strip_virtualenv

}
main
