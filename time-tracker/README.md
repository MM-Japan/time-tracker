# Time Tracker

This Rails application is a minimal Toggl clone for tracking how long you spend on different tasks.

## Getting started

1. Ensure Ruby 3.1.2 is available and run `bundle install`.
2. Execute `bin/rails db:migrate` to set up the database.
3. Start the server with `bin/rails server` and open `http://localhost:3000`.

Sign up with your email and password. After logging in you'll land on the tasks page which includes a timer card. Select a task and click **Start** to begin tracking time. Click **Stop** to save the entry. The running timer also appears in a sticky header with start/stop buttons. Review past entries on the Work Hours page.

