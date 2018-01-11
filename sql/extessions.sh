#!/usr/bin/env bash
sudo apt install postgis postgresql-9.6-postgis-scripts
sudo su postgres
psql petman -c "CREATE EXTENSION postgis";
