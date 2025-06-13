class Task < ApplicationRecord
  has_many :time_entries, dependent: :destroy

  def running_time_entry
    time_entries.find_by(end_time: nil)
  end
end
