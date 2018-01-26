class AddRequirementlistToResident < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :requirementlist, :jsonb, default: {}, null: false
  end
end
