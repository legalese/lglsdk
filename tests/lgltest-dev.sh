#!/bin/bash
# do not edit *.sh files! they are automatically tangled out of tests/README.org with C-c C-v t

testdir=testruns/`date +%Y%m%d-%H%M%S`
echo "*** saving to $testdir"
mkdir -p $testdir
cd $testdir
################################################## extended endpoint testing, top
if [ "" = "$1" ]; then
  echo "*** no live lglconfig.json specified on command line; will skip extended proforma tests";
else
  echo " ** will perform extended proforma tests later"
fi

# back to basics
lgl help > help.out 2> help.err
lgl init -t > init--t.out 2> init--t.err

subdir=local/v0.9; mkdir -p $subdir; cd $subdir;
echo "*** testing local/v0.9"
export LGL_URI=http://localhost/api/corpsec/v0.9
echo   LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo   LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo   LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo   LGL_URI=http://localhost/api/corpsec/v0.9 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=local/v1.0; mkdir -p $subdir; cd $subdir;
echo "*** testing local/v1.0"
export LGL_URI=http://localhost/api/corpsec/v1.0
echo   LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist  > proforma-schemalist.run
lgl --version=0.9 proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo   LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.run
lgl --version=0.9 proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
lgl --version=0.9 proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo   LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.run
lgl --version=0.9 proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
lgl --version=0.9 proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
lgl --version=0.9 proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo   LGL_URI=http://localhost/api/corpsec/v1.0 lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
lgl --version=0.9 proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
cd ../..
subdir=local/v1.1; mkdir -p $subdir; cd $subdir;
echo "*** testing local/v1.1"
export LGL_URI=http://localhost/api/corpsec/v1.1
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist  > proforma-schemalist.run
lgl  proforma schemalist  > proforma-schemalist.out 2> proforma-schemalist.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist hw3  > proforma-schemalist-hw3.run
lgl  proforma schemalist hw3  > proforma-schemalist-hw3.out 2> proforma-schemalist-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.run
lgl  proforma schemalist hw3 example  > proforma-schemalist-hw3-example.out 2> proforma-schemalist-hw3-example.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma schema hw3  > proforma-schema-hw3.run
lgl  proforma schema hw3  > proforma-schema-hw3.out 2> proforma-schema-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.run
lgl  proforma generate hw3 < proforma-schemalist-hw3-example.out > proforma-generate-hw3.out 2> proforma-generate-hw3.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.run
lgl  proforma generate hw3 hw3.pdf < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.pdf.out 2> proforma-generate-hw3-hw3.pdf.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.run
lgl  proforma generate hw3 hw3.docx < proforma-schemalist-hw3-example.out > proforma-generate-hw3-hw3.docx.out 2> proforma-generate-hw3-hw3.docx.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile search prive  > bizfile-search-prive.run
lgl  bizfile search prive  > bizfile-search-prive.out 2> bizfile-search-prive.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.run
lgl  bizfile uen 111111111M  > bizfile-uen-111111111M.out 2> bizfile-uen-111111111M.err
echo   LGL_URI=http://localhost/api/corpsec/v1.1 lgl  bizfile uen 201527692R  > bizfile-uen-201527692R.run
lgl  bizfile uen 201527692R  > bizfile-uen-201527692R.out 2> bizfile-uen-201527692R.err
cd ../..

################################################## extended endpoint testing, main
if [ "" = "$1" ]; then
  echo "*** skipping extended proforma tests";
else
  echo " ** performing extended proforma tests; first, displacing $1 into lglconfig.json"
  mkdir -p extended
  cp ../../$1 extended/lglconfig.json
  cd extended

  lgl proforma schemalist > proforma-schemalist.out
  echo "*** extended proforma tests: will try to generate PDFs for " `json -ak < proforma-schemalist.out | wc -l` templates

  for templateKey in $(json -ak < proforma-schemalist.out); do
    echo " ** $templateKey"
    lgl proforma schemalist $templateKey > schemalist-$templateKey.out
    lgl proforma schemalist $templateKey example > schemalist-$templateKey-example.out
    lgl proforma validate $templateKey < schemalist-$templateKey-example.out > validate-$templateKey.out 2> validate-$templateKey.err
    lgl proforma generate $templateKey generate-$templateKey.pdf < schemalist-$templateKey-example.out > generate-$templateKey.out 2> generate-$templateKey.err

    if egrep -q 'validate.*true' < validate-$templateKey.out; then
      : # echo "  + validated $templateKey"
    else
      echo " !! validate failed for $templateKey"
      (echo ""; echo "validate failed for $templateKey using example input") > ../failures-extended-validate-$templateKey.txt
      cat validate-$templateKey.* >> ../failures-extended-validate-$templateKey.txt
      ( echo "to reproduce:"; echo "  cd" `pwd`; echo "  lgl proforma validate $templateKey < schemalist-$templateKey-example.out" ) >> ../failures-extended-validate-$templateKey.txt
    fi

    if [ ! -s generate-$templateKey.pdf -o $(stat -f "%z" generate-$templateKey.pdf) = 6 ]; then
      echo "outcome unsatisfactory: lgl proforma generate $templateKey generate-$templateKey.pdf < schemalist-$templateKey-example.out" > ../failures-extended-generate-$templateKey.txt
    fi;

    # any deviation from the given template should fail validation.
    if [ "`json directors < schemalist-$templateKey-example.out 2>/dev/null`" -a \
         "`json 'directors[0].first_name' < schemalist-$templateKey-example.out`" = "William" ]; then
     # echo "  - testing deviation from example given"
      json -e 'this.directors[0].first_name = "Bill"' < schemalist-$templateKey-example.out > schemalist-$templateKey-variation.json
      lgl proforma validate $templateKey < schemalist-$templateKey-variation.json > validate-$templateKey-variation.out 2> validate-$templateKey-variation.err
      if grep -q 'need to match the example exactly' validate-$templateKey-variation.out; then
       : #  echo '  + expected variation validation failure, and got it; considering this a success!'
      else
         echo ' !! expected variation validation failure, but did not get expected error message.'
         (echo ' !! expected variation validation failure, but did not get expected error message.'; \
          cat validate-$templateKey-variation.*) > ../failures-extended-variation-validate-$templateKey.txt
      fi
    else
      echo "  - no deviation available -- we usually just look for a director named William we can rename to Bill"
    fi

  done;

  cd ..
fi
cd ../..
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v0.9/hw3.pdf > reference-20190903/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/local/v0.9/hw3.pdf > $testdir/local/v0.9/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v1.0/hw3.pdf > reference-20190903/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/local/v1.0/hw3.pdf > $testdir/local/v1.0/hw3.pdfsimple
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < reference-20190903/v1.1/hw3.pdf > reference-20190903/v1.1/hw3.pdfsimple
perl -ni -le 'print unless /datePulled/' reference-20190903/v1.1/bizfile*.out
egrep -a -v "^/CreationDate|^/ID \[|^<.*> \]|^/DocChecksum" < $testdir/local/v1.1/hw3.pdf > $testdir/local/v1.1/hw3.pdfsimple
perl -ni -le 'print unless /datePulled/' $testdir/local/v1.1/bizfile*.out

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
