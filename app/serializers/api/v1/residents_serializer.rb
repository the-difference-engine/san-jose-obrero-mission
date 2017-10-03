 class Api::V1::UserSerializer < ActiveModel::Serializer
    attributes :first_name,
               :last_name,
               :date,
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
               :image_id
                          






   