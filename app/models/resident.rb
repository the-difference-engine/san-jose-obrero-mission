class Resident < ApplicationRecord
  has_one :bed

  def full_name
    "#{first_name} #{last_name}"
  end 

end
