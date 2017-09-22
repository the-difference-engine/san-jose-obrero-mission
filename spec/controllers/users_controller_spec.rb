require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    #NOTE what happens when the role is wrong?
    before { @user = create(:user) }

    context 'When creating a new user' do
      it "expect the user model to increase by one" do
        params = { user: {
            email: 'eamil@email.com',
            role: 'case_manager',
            password: 'password',
            password_confirmation: 'password'
              }
        }
        post :create, params: params 
        expect(response).to redirect_to( '/' )
        expect(User.count).to eq(2)
      end

      it 'expect to have a successful flash message' do
        params = { user: {
            email: 'eamil@email.com',
            role: 'case_manager',
            password: 'password',
            password_confirmation: 'password'
              }
        }
        #params = {
          #email: 'eamil@email.com',
          #role: 'case_manager',
          #password: 'password',
          #password_confirmation: 'password'
        #}
        post :create, params: params 
        expect(flash[:success]).to eq('Successfully created account!')
      end

      xit 'expect to have a warning flash message' do
        params = { user: {
            email: 'eamil@email.com',
            role: 'case_manager',
            password: 'password',
            password_confirmation: 'wrong_password'
              }
        }

        expect(post :create, params: params).should_not be_valid
        #expect(flash[:warning]).to eq('Invalid email or password!')
        #expect(response).to redirect_to( signup_path )
      end
    end
  end
end
