class CreateTimeEntries < ActiveRecord::Migration[7.1]
  def change
    create_table :time_entries do |t|
      t.references :task, null: false, foreign_key: true
      t.datetime :start_time, null: false
      t.datetime :end_time

      t.timestamps
    end
  end
end
