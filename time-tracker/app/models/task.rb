class Task < ApplicationRecord
  belongs_to :user
  has_many :time_entries, dependent: :destroy

  validates :name, presence: true

  def running_time_entry
    time_entries.find_by(end_time: nil)
  end
end
