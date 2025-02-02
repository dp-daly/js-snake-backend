class AddUserIdToGamesAndGameIdToScores < ActiveRecord::Migration[8.0]
  def change
    add_reference :games, :user, null: true, foreign_key: true
    add_reference :scores, :game, null: true, foreign_key: true
  end
end
