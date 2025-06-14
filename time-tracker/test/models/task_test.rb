require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  setup do
    @user = User.create!(email: 'user@example.com', password: 'password')
  end

  test 'name must be present' do
    task = @user.tasks.build(name: nil)
    assert_not task.valid?
    assert_includes task.errors[:name], "can't be blank"
  end
end
