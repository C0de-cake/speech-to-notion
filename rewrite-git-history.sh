#!/bin/bash

# Get yesterday's date
yesterday=$(date -d "yesterday" +%Y-%m-%d)

# Set the desired time to 14:00 (2pm)
desired_date="$yesterday 14:00:00"

# Execute git filter-branch to modify the commit dates
git filter-branch --env-filter "
    export GIT_AUTHOR_DATE='$desired_date'
    export GIT_COMMITTER_DATE='$desired_date'
" -- --all
