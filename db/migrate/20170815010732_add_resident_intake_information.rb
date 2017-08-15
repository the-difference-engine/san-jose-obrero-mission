class AddResidentIntakeInformation < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :resident_race, :string
    add_column :residents, :cause_of_homeslessness, :string
    add_column :residents, :length_of_homelessness, :string
    add_column :residents, :prior_living_situation, :string
    add_column :residents, :number_of_shelters, :integer
    add_column :residents, :chronically_homeless, :boolean
  end
end
