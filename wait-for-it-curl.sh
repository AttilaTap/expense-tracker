#!/bin/bash

host="$1"
port="$2"
shift 2
cmd="$@"

echo "Waiting for $host:$port to be available..."

while ! curl -s "http://${host}:${port}" >/dev/null; do
  sleep 2
done

echo "$host:$port is available. Starting the app..."
exec $cmd
