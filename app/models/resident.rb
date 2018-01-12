# == Schema Information
#
# Table name: residents
#
#  id                     :integer          not null, primary key
#  first_name             :string
#  last_name              :string
#  dateOfBirth            :datetime
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
#
# specialNeedsNone :string
# specialNeedsSubstanceAbuse :string
# specialNeedsAlcoholAbuse :string
# mentalIllness :string
# mentalIllnessType :string
# hivAndaids :string
# victimofDomesticViolence :string
# checkBoxvictimOfviolence :string
# pregnantParentingTeen :string
# exOffenderCriminalRecord :string
# disabled :boolean
# disabilityDocumentation :boolean
# disabilityType :string
# veteran :boolean
# veteranDocumentation :boolean
# dischargeType :string
# idCard :string
# driverLicense :string
# birthCertificate :string
# socialSecuritynumber :string
# passportNumber :string
# permanentResidentcard :string
# informationType :string
# dateSetup :datetime not null
# dateExpiration :datetime not null
# daysLeft :integer
# companyName :string
# address :string
# city :string
# zip :integer
# phone :integer
# supervisor :string
# startDate :datetime not null
# endDate :datetime not null
# marketing :string
#
# pilsenWellness :string
# failureComplete :string
# commentBox :varchar(max)
# dateDisciplinary :datetime
# noShowNoCall :string
# programActivities :string
# lackHygiene :string
# failureTofollowPolicy :string
# confrontationalBehavior :string
# damageTosjom :string
# noShowcaseManager :string
# failureTomeetExpectations :string
# fighting :string
#
# bottomBunk :string
# pilsenWell :string
# backgroundCheck: :string
# previousPart :string
# referral :string
# tbTest :string
#

class Resident < ApplicationRecord
  has_one :bed

  def full_name
    "#{first_name} #{last_name}"
  end 

  def age
    return if date.nil? 
    ((Time.zone.now - date.to_time) / 1.year.seconds).floor
  end
end
