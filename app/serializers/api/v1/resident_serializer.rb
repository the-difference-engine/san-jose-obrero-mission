 class Api::V1::ResidentSerializer < ActiveModel::Serializer
    attributes :full_name,
               :first_name,
               :last_name,
               :date_of_birth,
               :age,
               :hmis_number,
               :hmis_entry_date,
               :documented,
               :gender,
               :ethnicity,
               :bed_id,
               :resident_race,
               :cause_of_homeslessness,
               :length_of_homelessness,
               :prior_living_situation,
               :number_of_shelters,
               :chronically_homeless,
               :image,
               :admittance_information

    

 end
                          






   
