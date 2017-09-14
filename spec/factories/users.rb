FactoryGirl.define do
  factory :user do
    email "fake@email.com"
    password "password"
    password_confirmation "password"
    role "admin"
  end
end
