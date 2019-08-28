#!/bin/bash
testdir=testruns/`date +%Y%m%d-%H%M%S`
mkdir -p $testdir
cd $testdir
export LGL_URI=http://localhost/api/corpsec/v1.1

lgl init -t > init--t.out 2> init--t.err

lgl help > help.out 2> help.err

lgl proforma schemalist > proforma-schemalist.out 2> proforma-schemalist.err

lgl proforma schemalist hw3 > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err

lgl proforma schemalist hw3 example > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err

lgl proforma schema hw3 > proforma-schema-hw3.out 2> proforma-schema-hw3.err

lgl bizfile search prive > bizfile-search-prive.out 2> bizfile-search-prive.err

lgl bizfile uen 111111111M > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
