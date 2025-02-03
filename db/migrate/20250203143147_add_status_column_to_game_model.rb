class AddStatusColumnToGameModel < ActiveRecord::Migration[8.0]
  def change
    add_column :games, :status, :string
  end
end
