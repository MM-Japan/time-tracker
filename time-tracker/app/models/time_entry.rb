class TimeEntry < ApplicationRecord
  belongs_to :task
  delegate :user, to: :task

  def duration
    ((end_time || Time.current) - start_time).to_i
  end
end
