#!/bin/bash

cf set-env $APP_NAME REACT_APP_EASEY_CAMPD_UI_API_KEY $CAMPD_API_KEY
cf set-env $APP_NAME REACT_APP_EASEY_CAMPD_UI_CLIENT_ID $CAMPD_CLIENT_ID
cf set-env $APP_NAME REACT_APP_EASEY_CAMPD_UI_CLIENT_SECRET $CAMPD_CLIENT_SECRET
