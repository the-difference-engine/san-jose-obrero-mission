class AddDateOfBirthToResidents < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :date_of_birth, :datetime
  end
end
