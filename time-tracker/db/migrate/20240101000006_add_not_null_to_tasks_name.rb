class AddNotNullToTasksName < ActiveRecord::Migration[7.1]
  def up
    # Ensure all existing tasks have a name before adding NOT NULL constraint
    Task.where(name: [nil, ""]).update_all(name: "Unnamed Task")
    change_column_null :tasks, :name, false
  end

  def down
    change_column_null :tasks, :name, true
  end
end
