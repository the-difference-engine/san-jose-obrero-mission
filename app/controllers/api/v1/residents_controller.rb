module Api
  module V1
    class ResidentsController < Api::V1::BaseController

      # GET /v1/users
      def index
        residents = Resident.order("length_of_homelessness DESC")


        # TODO this has to be fixed I am not accessing the ser.
        render json: { residents: residents, table_headers: table_headers }
      end

      def create
       
        resident = Resident.new(resident_params)
        
        if resident.save!
          render json: resident
        end
      end

      def show
        resident = Resident.find(params[:id])
        render json: resident
      end

      def update
        @resident.update(resident_params)
        render json: @resident
      end

      def destroy
        @resident.destroy
        head :no_content
      end

      private

      def resident_params
        params.require(:resident).permit(
          :first_name,
          :last_name,
          :documented,
          :gender,
          :ethnicity,
          :bed_id,
          :resident_race,
          :cause_of_homelessness,
          :length_of_homelessness,
          :prior_living_situation,
          :number_of_shelters,
          :chronically_homeless,
          :image,
          :date_of_birth,
          admittance_information: [
            :admitted_date,
            :released_date,
            :tenure,
            :hmis_number,
            :hmis_entry_date
          ],
          general: [
            :cause_of_homeslessness,
            :length_of_homelessness,
            :prior_living_situation,
            :length_of_prior_situation,
            :number_of_shelters,
            :chronically_Homeless,
            :special_Needs_None,
            :special_Needs_Substance_Abuse,
            :special_Needs_alcohol_Abuse,
            :sought_Treatment,
            :mental_Illness,
            :mental_IllnessType,
            :hiv_And_aids,
            :Chronical_health_Problem, 
            :victim_Of_domestic_Violence,
            :pregnant_Parenting_Teen,
            :exOffender_Criminal_record,
            :disabled_Yes,
            :disabled,
            :disability_Documentation,
            :disability_Type,
            :veteran,
            :veteran_Documentation,
            :discharge_Type,
            :speak_english,
            :primary_Language,
            :prescribed_medication,
            :med_Notes,
            :allergies,
            :allergy_Notes

          ],

        identification: [
          :id_Card,
          :driver_License,
          :birth_Certificate,
          :social_Security_number,
          :passport_Number,
          :permanent_Resident_card,
          :information_Type,
          :date_Setup,
          :date_Expiration,
          :days_Left
        ],

      employmenteducation: [
          :full_Time,
          :Company_Name,
          :Address,
          :City,
          :state,
          :Zip,
          :Phone,
          :Supervisor,
          :Start_date,
          :End_date,
          :part_Time,
          :self_Employed,
          :temp,
          :seasonal,
          :high_School,
          :associates_Degree,
          :Marketing,
          :bachelors_Degree,
          :masters_Degree,
          :other
      ],
    
    disciplanary: [
        :pilsen_Wellness,
        :failure_Complete_do_Chore,
        :comment,
        :date_Disciplinary,
        :no_Show_no_Call,
        :no_Show_program_Activities,
        :lack_Hygiene_cleanliness,
        :failure_To_follow_Smoking_policy,
        :confrontational_Behavior,
        :damage_To_sjom_Property,
        :no_Show_for_Case_manager_App,
        :failure_To_meet_Behavioral_expectation,
        :fighting

    ],
    
    
    
    
    requirementlist: [
          :bottom_Bunk_requested,
          :pilsen_Wellness_Req,
          :background_Check,
          :previous_Part,
          :referral,
          :tb_test
    ]


        )

      end

      def table_headers
        ["Full Name", "Gender", "Admitted", "Released", "Tenure", "Status", "Bed Number"]
      end
    end
  end
end
