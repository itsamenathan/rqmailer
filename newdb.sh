#!/bin/bash

if [ -z $1 ]; then
  echo "Pass in dbname"
  exit
fi
user='redqueen'
pass='bananahammock'
db=$1


# Create db
curl -X PUT http://$user:$pass@127.0.0.1:5984/$db


# set security
cat << EOF | curl -X PUT http://$user:$pass@127.0.0.1:5984/$db/_security --data-binary @-
{
    "admins": {
        "names": [
        ],
        "roles": [
            "admins"
        ]
    },
    "members": {
        "names": [
        ],
        "roles": [
        ]
    }
}
EOF

cat << EOF | curl -X PUT http://$user:$pass@127.0.0.1:5984/$db/_design/auth --data-binary @-
{
  "validate_doc_update":"function(newDoc, oldDoc, userCtx) {   if (userCtx.roles.indexOf('_admin') !== -1) {     return;   } else {     throw({forbidden: 'This DB is read-only'});   }   } "
}
EOF
