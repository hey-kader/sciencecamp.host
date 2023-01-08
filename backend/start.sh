#!/bin/bash
#
# start script

serve -s build &> /dev/null &
open http://172.20.10.7:3000/login
