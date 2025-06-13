# time-tracker

This project implements a simple Toggl-like time tracker built with Ruby on Rails.

## Setup

1. Install Ruby 3.1.2 and run `bundle install` inside the `time-tracker` directory.
2. Initialize the database with `bin/rails db:migrate`.
3. Start the application with `bin/rails server` and visit `http://localhost:3000`.

4. Sign up with your email and password. After logging in you'll see the tasks page with a timer card for starting and stopping work. A sticky header shows the running timer and includes start/stop icons. Past entries are visible on the calendar page.


## Codex merge script

Run `./codex-merge.sh <codex-branch-name>` to automatically fetch and merge a branch from GitHub. If conflicts occur, the script resolves them in favor of the Codex branch and commits the result.
