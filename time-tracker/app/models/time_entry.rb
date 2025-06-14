class TimeEntry < ApplicationRecord
  belongs_to :task
  delegate :user, to: :task

  validates :start_time, presence: true
  validate :end_time_after_start_time

  private

  def end_time_after_start_time
    return if end_time.blank?

    if start_time && end_time <= start_time
      errors.add(:end_time, "must be after start time")
    end
  end

  def duration
    ((end_time || Time.current) - start_time).to_i
  end
end
