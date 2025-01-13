class Score < ApplicationRecord
  belongs_to :user

  validates :value, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
