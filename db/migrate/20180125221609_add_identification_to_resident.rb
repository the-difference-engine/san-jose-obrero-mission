class AddIdentificationToResident < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :identification, :jsonb, default: {}, null: false
  end
end
