class SetDefaultStatusForGames < ActiveRecord::Migration[8.0]
  def change
    change_column_default :games, :status, "in_progress"
  end
end
