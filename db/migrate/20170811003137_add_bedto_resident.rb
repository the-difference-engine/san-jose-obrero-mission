class AddBedtoResident < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :bed_id, :integer
  end
end
