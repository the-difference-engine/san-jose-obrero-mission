require 'rails_helper'
include RequestSpecHelper

# TODO these tests will fail ***

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET#index' do
    it 'returns http success' do
      get :index, format: :json
      expect(response).to have_http_status(200)
    end

    it 'expect to return 4 users' do
      create(:user)
      create(:admin_user)
      create(:case_manager)
      create(:residential_aide)
      create(:security)

      get :index, format: :json
      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json["users"].size).to eq(5)
      expect(json["users"][0]["email"]).to eq('test1@email.com')
      expect(json["users"][2]["role"]).to eq("case_manager")
      expect(json["users"][1]["role"]).to eq("admin")
    end
  end
end
