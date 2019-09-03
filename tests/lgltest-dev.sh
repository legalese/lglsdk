#!/bin/bash
# do not edit *.sh files! they are automatically tangled out of tests/README.org with C-c C-v t

testdir=testruns/`date +%Y%m%d-%H%M%S`
echo "*** saving to $testdir"
mkdir -p $testdir
cd $testdir
export LGL_URI
function test_services { (
  mkdir $subdir; cd $subdir
  echo well, here we are working against $LGL_URI
  lgl $1 help > help.out 2> help.err
  lgl $1 init -t > init--t.out 2> init--t.err
  lgl $1 proforma schemalist > proforma-schemalist.out 2> proforma-schemalist.err
  lgl $1 proforma schemalist hw3 > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
  lgl $1 proforma schemalist hw3 example > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
  lgl $1 proforma schema hw3 > proforma-schema-hw3.out 2> proforma-schema-hw3.err
  lgl $1 bizfile search prive > bizfile-search-prive.out 2> bizfile-search-prive.err
  lgl $1 bizfile uen 111111111M > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
  
) }
# we test the development endpoints, across multiple versions
subdir=local-v0.9 LGL_URI=http://localhost/api/v0.9 test_services --version=v0.9
subdir=local-v1.0 LGL_URI=http://localhost/api/v1.0 test_services --version=v0.9
subdir=local-v1.1 LGL_URI=http://localhost/api/v1.1 test_services
