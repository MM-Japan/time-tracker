require "test_helper"

class TimeEntriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(email: "user@example.com", password: "password")
    @task = @user.tasks.create!(name: "Task")
    @time_entry = @task.time_entries.create!(start_time: Time.current)
    post session_path, params: { email: @user.email, password: "password" }
  end

  test "update without time_entry param does not crash" do
    patch task_time_entry_path(@task, @time_entry)
    assert_response :redirect
    @time_entry.reload
    assert_not_nil @time_entry.end_time
    assert_nil @time_entry.comment
  end

  test "update with empty time_entry param does not crash" do
    patch task_time_entry_path(@task, @time_entry), params: { time_entry: {} }
    assert_response :redirect
    @time_entry.reload
    assert_not_nil @time_entry.end_time
    assert_nil @time_entry.comment
  end
end
