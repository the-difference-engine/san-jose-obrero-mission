require 'rails_helper'
include RequestSpecHelper



RSpec.describe Api::V1::ResidentsController, type: :controller do
  describe "GET #index" do
    it "returns http success" do
      get :index, format: :json
      expect(response).to have_http_status(200)
    end
    it "expect to return 2 residents" do
      create(:resident)
      create(:resident_2)
      get :index, format: :json
      data = JSON.parse(response.body)
      expect(data).not_to be_empty
      expect(data["residents"].size).to eq(2)
    end
  end

end