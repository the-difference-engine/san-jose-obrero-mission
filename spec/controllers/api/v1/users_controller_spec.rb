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
      expect(json.size).to eq(5)
      expect(json[0]["email"]).to eq('admin@email.com')
      expect(json[1]["role"]).to eq("case_manager")
      expect(json[0]["role"]).to eq("admin")
    end
  end
end
