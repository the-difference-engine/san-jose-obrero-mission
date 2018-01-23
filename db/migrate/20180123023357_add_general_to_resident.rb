class AddGeneralToResident < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :general, :jsonb, default: {}, null: false
  end
end
