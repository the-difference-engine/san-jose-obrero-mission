class CreateResidents < ActiveRecord::Migration[5.0]
  def change
    create_table :residents do |t|
      t.string :first_name
      t.string :last_name
      t.datetime :date
      t.string :hmis_number
      t.datetime :hmis_entry_date
      t.boolean :documented
      t.string :gender
      t.string :ethnicity

      t.timestamps
    end
  end
end
