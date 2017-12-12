# == Schema Information
#
# Table name: residents
#
#  id                     :integer          not null, primary key
#  first_name             :string
#  last_name              :string
#  date                   :datetime
#  hmis_number            :string
#  hmis_entry_date        :datetime
#  documented             :boolean
#  gender                 :string
#  ethnicity              :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  bed_id                 :integer
#  resident_race          :string
#  cause_of_homeslessness :string
#  length_of_homelessness :string
#  prior_living_situation :string
#  number_of_shelters     :integer
#  chronically_homeless   :boolean
#  image                  :string
#

class Resident < ApplicationRecord
  has_one :bed

  def full_name
    "#{first_name} #{last_name}"
  end 

  def age
    Time.zone.now.year - date.year
  end
end
