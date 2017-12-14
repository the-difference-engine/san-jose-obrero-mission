class ChangeLengthOfHomelessnessTypeInResidents < ActiveRecord::Migration[5.0]
  def change
    change_column :residents, :length_of_homelessness, 'integer USING CAST(length_of_homelessness AS integer)'
  end
end

