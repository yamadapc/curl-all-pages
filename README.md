curl-all-pages
==============
Wrapper on top of curl to follow Link headers.

## Usage
```
curl-all-pages -H 'Authorization: Basic $AUTHSTUFF' \
               'https://api.bugsnag.com/projects/$BUGSNAG_PID/events?start_date=$START&stop_date=$STOP' > events.jsonl
```

Outputs on `stderr`
```
Request 0 done
Request 1 done
Request 2 done
# ...
```

Outputs on `stdout`
```
[...] # Response 0

[...] # Response 1

[...] # Response 2

# ...
```

## License
MIT
