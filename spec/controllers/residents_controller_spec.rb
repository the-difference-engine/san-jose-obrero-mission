require 'rails_helper'

RSpec.describe Api::V1::ResidentsController, type: :controller do
  describe "#create" do
    xit "returns success status of 200" do
    end
    it "expects new resident to be created" do
      create(:resident)
      params = {
        resident: {
          first_name: "Kyle",
          last_name: "test",
          date: "2017-12-30 0:00",
          hmis_number: "12341234",
          hmis_entry_date: "2017-12-30 0:00",
          documented: true,
          gender: "male",
          ethnicity: "hispanic",
          bed_id: "1",
          resident_race: "hispanic",
          cause_of_homeslessness: "divorce",
          length_of_homelessness: "1 year",
          prior_living_situation: "with ex wife",
          number_of_shelters: 1,
          chronically_homeless: false,
          image: "image"
        }
      }
      post :create, { params: params }
      resident = Resident.first
      expect(resident.first_name).to eq("Kyle")
      expect(Resident.all.length).to eq(2)
    end

    xit "expects success flash message in response" do
    end
    xit "expects a non successfull flash message response" do

    end

  end
end
