require 'rails_helper'
include RequestSpecHelper

# TODO these tests will fail ***

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET#index' do
    it 'returns http success' do
      get :index, format: :json
      expect(response).to have_http_status(200)
    end

    it 'expect to return 3 users' do
      create(:user,
             role: 1)
      create(:admin_user)

      get :index, format: :json
      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json.size).to eq(4)
      expect(json[1]["email"]).to eq('test2@email.com')
    end
  end
end
