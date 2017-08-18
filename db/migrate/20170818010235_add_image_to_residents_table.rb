class AddImageToResidentsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :image, :string
  end
end
