class AddDisciplinaryToResident < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :disciplanary, :jsonb, default: {}, null: false
  end
end
