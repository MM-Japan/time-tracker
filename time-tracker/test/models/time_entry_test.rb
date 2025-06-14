require 'test_helper'

class TimeEntryTest < ActiveSupport::TestCase
  setup do
    @user = User.create!(email: 'user@example.com', password: 'password')
    @task = @user.tasks.create!(name: 'Task')
  end

  test 'start_time must be present' do
    entry = @task.time_entries.build(start_time: nil)
    assert_not entry.valid?
    assert_includes entry.errors[:start_time], "can't be blank"
  end

  test 'end_time must be after start_time' do
    entry = @task.time_entries.build(start_time: Time.current, end_time: 1.hour.ago)
    assert_not entry.valid?
    assert_includes entry.errors[:end_time], 'must be after start time'
  end

  test 'valid when end_time is after start_time' do
    entry = @task.time_entries.build(start_time: Time.current, end_time: 1.hour.from_now)
    assert entry.valid?
  end

  test 'requires task association' do
    entry = TimeEntry.new(start_time: Time.current)
    assert_not entry.valid?
    assert_includes entry.errors[:task], 'must exist'
  end
end
