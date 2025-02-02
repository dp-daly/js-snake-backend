class Game < ApplicationRecord
  belongs_to :user
  has_one :score

  enum status: { in_progress: "in_progress", complete: "complete" }

  validates :status, inclusion: { in: status.values }

  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= :in_progress
  end
end
