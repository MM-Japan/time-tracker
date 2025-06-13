class User < ApplicationRecord
  has_secure_password
  has_many :tasks, dependent: :destroy
  has_many :time_entries, through: :tasks
  validates :email, presence: true, uniqueness: true


  def running_time_entry
    time_entries.find_by(end_time: nil)
  end

end
