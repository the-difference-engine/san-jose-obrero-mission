require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #create" do
    it "returns success flash message and redirects to residents view" do
      create(:user)
      create(:admin_user)
      params = {
        email: 'admin@email.com',
        password: 'admin'
      }
      get :create, { params: params }
      # this test will not work - the action does not return
      # a success. if you look at the controller the actions
      # calls to be redirected
      #expect(response).to have_http_status(:success)
      expect(flash[:success]).to eq('Successfully logged in!')
      #This is cool... but..
      #expect(response).should redirect_to('/residents')
      # but this might be a little better
      expect(response).should redirect_to(residents_path)
    end
  end

  describe "GET #destroy" do
    #same with this test, the action calls for a redirect
    it "returns flash success, sets session to nil and redirct to login view" do
      get :destroy
      expect(flash[:success]).to eq('Successfully logged out!')
      expect(response).should redirect_to(login_path)
      expect(session[:user_id].nil?).to be(true)
    end
  end

end
