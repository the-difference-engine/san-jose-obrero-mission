require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "GET 'index' " do
    it "returns a successful 200 response" do
      get :index, format: :json
      expect(response).to have_http_status(200)
    end

    it "to return 3 users" do
      User.create(email: "test1@email1.com", role: "admin", password: "password")
      User.create(email: "test1@email2.com", role: "security", password: "password")
      User.create(email: "test1@email3.com", role: "case_manager", password: "password")
      get :index, format: :json
      json = JSON.parse(response.body)
      expect(json.size).to eq(3)
      expect(json)
    end
  end
end
