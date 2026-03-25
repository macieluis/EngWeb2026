#!/bin/bash

mongoimport --host localhost --db autoRepair --collection repairs --type json --file /docker-entrypoint-initdb.d/repairs.json --jsonArray

echo "Imported repairs into autoRepair database."
