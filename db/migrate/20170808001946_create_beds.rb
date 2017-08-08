class CreateBeds < ActiveRecord::Migration[5.0]
  def change
    create_table :beds do |t|
      t.integer :room_id
      t.string :name
      t.string :top_or_bottom
      t.boolean :occupied

      t.timestamps
    end
  end
end
