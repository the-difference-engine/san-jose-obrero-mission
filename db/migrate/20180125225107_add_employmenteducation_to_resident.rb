class AddEmploymenteducationToResident < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :employmenteducation, :jsonb, default: {}, null: false
  end
end
