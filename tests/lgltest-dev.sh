#!/bin/bash
# do not edit *.sh files! they are automatically tangled out of tests/README.org with C-c C-v t

testdir=testruns/`date +%Y%m%d-%H%M%S`
echo "*** saving to $testdir"
mkdir -p $testdir
cd $testdir
# we test the development endpoints, across multiple versions
subdir=local-v0.9; mkdir -p $subdir; cd $subdir;
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ..
subdir=local-v1.0; mkdir -p $subdir; cd $subdir;
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ..
subdir=local-v1.1; mkdir -p $subdir; cd $subdir;
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.out 2> bizfile-search-prive.err
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
cd ..
