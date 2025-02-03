class Game < ApplicationRecord
  belongs_to :user
  has_one :score

  validates_inclusion_of :status, in: [ "in_progress", "complete" ], message: "must be 'in_progress' or 'complete'"
end
