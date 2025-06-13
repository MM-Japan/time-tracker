class AddCommentToTimeEntries < ActiveRecord::Migration[7.1]
  def change
    add_column :time_entries, :comment, :string
  end
end
