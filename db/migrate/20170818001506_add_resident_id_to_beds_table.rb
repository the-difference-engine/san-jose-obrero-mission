class AddResidentIdToBedsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :beds, :resident_id, :integer
  end
end
