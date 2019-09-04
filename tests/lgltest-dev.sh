#!/bin/bash
# do not edit *.sh files! they are automatically tangled out of tests/README.org with C-c C-v t

testdir=testruns/`date +%Y%m%d-%H%M%S`
echo "*** saving to $testdir"
mkdir -p $testdir
cd $testdir
lgl help > help.out 2> help.err
lgl init -t > init--t.out 2> init--t.err

subdir=local/v0.9; mkdir -p $subdir; cd $subdir;
echo "*** testing local/v0.9"
echo LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=local/v1.0; mkdir -p $subdir; cd $subdir;
echo "*** testing local/v1.0"
echo LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=local/v1.1; mkdir -p $subdir; cd $subdir;
echo "*** testing local/v1.1"
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.out 2> bizfile-search-prive.err
echo LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.run
LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
cd ../..

cd ../..
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v0.9/hw3.pdf > reference-20190903/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/local/v0.9/hw3.pdf > $testdir/local/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v1.0/hw3.pdf > reference-20190903/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/local/v1.0/hw3.pdf > $testdir/local/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v1.1/hw3.pdf > reference-20190903/v1.1/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/local/v1.1/hw3.pdf > $testdir/local/v1.1/hw3.pdfsimple

diff -x \*.docx -x \*.pdf -x \*.run -x \*generate\*.out -qru reference-20190903/ $testdir/local/ > $testdir/failures-local.txt
diff -sqru reference-20190903/ $testdir/local/ > $testdir/identicals-local.txt
for binary in reference-20190903/v0.9/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/local/v0.9/$filename) ];
        then :; # no-op
        else echo " !! file sizes differ for local/v0.9/$filename";
             ls -l $binary local/v0.9/$filename | tee failures-local-v0.9-$filename.txt; fi; done
for binary in reference-20190903/v1.0/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/local/v1.0/$filename) ];
        then :; # no-op
        else echo " !! file sizes differ for local/v1.0/$filename";
             ls -l $binary local/v1.0/$filename | tee failures-local-v1.0-$filename.txt; fi; done
for binary in reference-20190903/v1.1/*.{docx,pdf};
  do filename=`basename $binary`;
     if [ $(stat -f "%z" $binary) = $(stat -f "%z" $testdir/local/v1.1/$filename) ];
        then :; # no-op
        else echo " !! file sizes differ for local/v1.1/$filename";
             ls -l $binary local/v1.1/$filename | tee failures-local-v1.1-$filename.txt; fi; done
onoes=""; for f in $testdir/failures-*.txt; do if [ -s $f ]; then onoes="$onoes $f"; fi; done
if [ -n "$onoes" ]; then count=`cat $testdir/failures-*.txt | wc -l`; echo "!!! $count tests failed!"; ls -l $testdir/failures-*.txt; echo ; cat $testdir/failures-*.txt; else echo "*** all tests passed!"; fi
