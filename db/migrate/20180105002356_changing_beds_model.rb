class ChangingBedsModel < ActiveRecord::Migration[5.0]
  def change
    remove_column :beds, :name, :string
    remove_column :beds, :top_or_bottom, :string
    rename_column :beds, :room_id, :bed_id
    change_column :beds, :bed_id, :string
  end
end
