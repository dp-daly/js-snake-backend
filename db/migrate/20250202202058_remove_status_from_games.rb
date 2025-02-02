class RemoveStatusFromGames < ActiveRecord::Migration[8.0]
  def change
    remove_column :games, :status, :string
  end
end
