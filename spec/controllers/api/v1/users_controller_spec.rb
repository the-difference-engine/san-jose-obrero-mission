require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET#index' do
    it 'returns http success' do
      get :index, format: :json
      expect(response).to have_http_status(200)
    end

    it 'expect to return 3 users' do
      #TODO do not do this - use factory girl
      User.create!(email: 'test1@email.com', role: 'admin', password: 'password')
      User.create!(email: 'test2@email.com', role: 'security', password: 'password')
      User.create!(email: 'test3@email.com', role: 'case_manager', password: 'password')

      get :index, format: :json
      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json.size).to eq(3)
      expect(json[1]["email"]).to eq('test2@email.com')
    end
  end
end
