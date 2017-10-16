FactoryGirl.define do
  factory :user do
    email 'test1@email.com'
    password 'password'
  end

  factory :admin_user, class: User do
    email 'admin@email.com'
    password 'admin'
    role 0
  end

  # TODO keep going for the rest
end
