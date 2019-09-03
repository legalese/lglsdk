#!/bin/bash
# do not edit *.sh files! they are automatically tangled out of tests/README.org with C-c C-v t

testdir=testruns/`date +%Y%m%d-%H%M%S`
echo "*** saving to $testdir"
mkdir -p $testdir
cd $testdir
lgl help > help.out 2> help.err
lgl init -t > init--t.out 2> init--t.err

subdir=v2/v0.9; mkdir -p $subdir; cd $subdir;
echo "*** testing v2/v0.9"
echo LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=v2/v1.0; mkdir -p $subdir; cd $subdir;
echo "*** testing v2/v1.0"
echo LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=v2/v1.1; mkdir -p $subdir; cd $subdir;
echo "*** testing v2/v1.1"
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.out 2> bizfile-search-prive.err
echo LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.run
LGL_URI=https://legalese.com/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
cd ../..
subdir=1a/v0.9; mkdir -p $subdir; cd $subdir;
echo "*** testing 1a/v0.9"
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=1a/v1.0; mkdir -p $subdir; cd $subdir;
echo "*** testing 1a/v1.0"
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=1a/v1.1; mkdir -p $subdir; cd $subdir;
echo "*** testing 1a/v1.1"
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.out 2> bizfile-search-prive.err
echo LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.run
LGL_URI=https://ap-southeast-1a-api.legalese.com/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
cd ../..
subdir=1b/v0.9; mkdir -p $subdir; cd $subdir;
echo "*** testing 1b/v0.9"
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=1b/v1.0; mkdir -p $subdir; cd $subdir;
echo "*** testing 1b/v1.0"
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=1b/v1.1; mkdir -p $subdir; cd $subdir;
echo "*** testing 1b/v1.1"
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.out 2> bizfile-search-prive.err
echo LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.run
LGL_URI=https://ap-southeast-1b-api.legalese.com/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
cd ../..
subdir=api/v0.9; mkdir -p $subdir; cd $subdir;
echo "*** testing api/v0.9"
echo LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://api.legalese.com/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=api/v1.0; mkdir -p $subdir; cd $subdir;
echo "*** testing api/v1.0"
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=api/v1.1; mkdir -p $subdir; cd $subdir;
echo "*** testing api/v1.1"
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.out 2> bizfile-search-prive.err
echo LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.run
LGL_URI=https://api.legalese.com/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
cd ../..

cd ../..
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v0.9/hw3.pdf > reference-20190903/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/v2/v0.9/hw3.pdf > $testdir/v2/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/1a/v0.9/hw3.pdf > $testdir/1a/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/1b/v0.9/hw3.pdf > $testdir/1b/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/api/v0.9/hw3.pdf > $testdir/api/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v1.0/hw3.pdf > reference-20190903/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/v2/v1.0/hw3.pdf > $testdir/v2/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/1a/v1.0/hw3.pdf > $testdir/1a/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/1b/v1.0/hw3.pdf > $testdir/1b/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/api/v1.0/hw3.pdf > $testdir/api/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v1.1/hw3.pdf > reference-20190903/v1.1/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/v2/v1.1/hw3.pdf > $testdir/v2/v1.1/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/1a/v1.1/hw3.pdf > $testdir/1a/v1.1/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/1b/v1.1/hw3.pdf > $testdir/1b/v1.1/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/api/v1.1/hw3.pdf > $testdir/api/v1.1/hw3.pdfsimple

diff -x \*.docx -x \*.pdf -x \*generate\*.out -qru reference-20190903/ $testdir/v2/ | egrep -v "(docx|pdf|generate-.*\.out) differ" > $testdir/failures-v2.txt
diff -sqru reference-20190903/ $testdir/v2/ > $testdir/identicals-v2.txt
for binary in reference-20190903/v0.9/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/v2/v0.9/$filename) ];
        then :;
        else echo " !! file sizes differ for v2/v0.9/$filename";
             ls -l $binary v2/v0.9/$filename | tee failures-v2-v0.9-$filename.txt; fi; done
for binary in reference-20190903/v1.0/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/v2/v1.0/$filename) ];
        then :;
        else echo " !! file sizes differ for v2/v1.0/$filename";
             ls -l $binary v2/v1.0/$filename | tee failures-v2-v1.0-$filename.txt; fi; done
for binary in reference-20190903/v1.1/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/v2/v1.1/$filename) ];
        then :;
        else echo " !! file sizes differ for v2/v1.1/$filename";
             ls -l $binary v2/v1.1/$filename | tee failures-v2-v1.1-$filename.txt; fi; done
diff -x \*.docx -x \*.pdf -x \*generate\*.out -qru reference-20190903/ $testdir/1a/ | egrep -v "(docx|pdf|generate-.*\.out) differ" > $testdir/failures-1a.txt
diff -sqru reference-20190903/ $testdir/1a/ > $testdir/identicals-1a.txt
for binary in reference-20190903/v0.9/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/1a/v0.9/$filename) ];
        then :;
        else echo " !! file sizes differ for 1a/v0.9/$filename";
             ls -l $binary 1a/v0.9/$filename | tee failures-1a-v0.9-$filename.txt; fi; done
for binary in reference-20190903/v1.0/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/1a/v1.0/$filename) ];
        then :;
        else echo " !! file sizes differ for 1a/v1.0/$filename";
             ls -l $binary 1a/v1.0/$filename | tee failures-1a-v1.0-$filename.txt; fi; done
for binary in reference-20190903/v1.1/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/1a/v1.1/$filename) ];
        then :;
        else echo " !! file sizes differ for 1a/v1.1/$filename";
             ls -l $binary 1a/v1.1/$filename | tee failures-1a-v1.1-$filename.txt; fi; done
diff -x \*.docx -x \*.pdf -x \*generate\*.out -qru reference-20190903/ $testdir/1b/ | egrep -v "(docx|pdf|generate-.*\.out) differ" > $testdir/failures-1b.txt
diff -sqru reference-20190903/ $testdir/1b/ > $testdir/identicals-1b.txt
for binary in reference-20190903/v0.9/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/1b/v0.9/$filename) ];
        then :;
        else echo " !! file sizes differ for 1b/v0.9/$filename";
             ls -l $binary 1b/v0.9/$filename | tee failures-1b-v0.9-$filename.txt; fi; done
for binary in reference-20190903/v1.0/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/1b/v1.0/$filename) ];
        then :;
        else echo " !! file sizes differ for 1b/v1.0/$filename";
             ls -l $binary 1b/v1.0/$filename | tee failures-1b-v1.0-$filename.txt; fi; done
for binary in reference-20190903/v1.1/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/1b/v1.1/$filename) ];
        then :;
        else echo " !! file sizes differ for 1b/v1.1/$filename";
             ls -l $binary 1b/v1.1/$filename | tee failures-1b-v1.1-$filename.txt; fi; done
diff -x \*.docx -x \*.pdf -x \*generate\*.out -qru reference-20190903/ $testdir/api/ | egrep -v "(docx|pdf|generate-.*\.out) differ" > $testdir/failures-api.txt
diff -sqru reference-20190903/ $testdir/api/ > $testdir/identicals-api.txt
for binary in reference-20190903/v0.9/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/api/v0.9/$filename) ];
        then :;
        else echo " !! file sizes differ for api/v0.9/$filename";
             ls -l $binary api/v0.9/$filename | tee failures-api-v0.9-$filename.txt; fi; done
for binary in reference-20190903/v1.0/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/api/v1.0/$filename) ];
        then :;
        else echo " !! file sizes differ for api/v1.0/$filename";
             ls -l $binary api/v1.0/$filename | tee failures-api-v1.0-$filename.txt; fi; done
for binary in reference-20190903/v1.1/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/api/v1.1/$filename) ];
        then :;
        else echo " !! file sizes differ for api/v1.1/$filename";
             ls -l $binary api/v1.1/$filename | tee failures-api-v1.1-$filename.txt; fi; done
onoes=""; for f in $testdir/failures-*.txt; do if [ -s $f ]; then onoes="$onoes $f"; fi; done
if [ -n "$onoes" ]; then echo "!!! tests failed! $onoes"; ls -l $testdir/failures-*.txt; echo ; cat $testdir/failures-*.txt; else echo "*** all tests passed!"; fi
