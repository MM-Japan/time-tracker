# time-tracker

This project implements a simple Toggl-like time tracker built with Ruby on Rails.

## Setup

1. Install Ruby 3.1.2 and run `bundle install` inside the `time-tracker` directory.
2. Initialize the database with `bin/rails db:migrate`.
3. Create your first user with `bin/rails console`:
   `User.create(email: "user@example.com", password: "secret")`
4. Start the application with `bin/rails server` and visit `http://localhost:3000`.

Log in with the created user, then use the calendar to track and comment on your hours.
