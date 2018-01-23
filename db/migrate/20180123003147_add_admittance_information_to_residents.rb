class AddAdmittanceInformationToResidents < ActiveRecord::Migration[5.0]
  def change
    add_column :residents, :admittance_information, :jsonb, default: {}, null: false
  
  end
end
