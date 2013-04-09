#!/bin/bash

TOP=./top.html.template
BOTTOM=./bottom.html.template
#DIR = `pwd`

rm -ir "build"
#mkdir "build"
for file in `find . -name "*.html"`
do
	mkdir -p `dirname "./build/"$file`
	cat $TOP $file $BOTTOM > "./build/"$file
done