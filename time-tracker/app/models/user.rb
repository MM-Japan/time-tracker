class User < ApplicationRecord
  has_secure_password
  has_many :tasks, dependent: :destroy
  has_many :time_entries, through: :tasks
  validates :email, presence: true, uniqueness: true
end
