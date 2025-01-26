class RenamePasswordDigestToEncryptedPassword < ActiveRecord::Migration[8.0]
  def change
    if column_exists?(:users, :password_digest)
      remove_column :users, :password_digest
    end
  end
end
