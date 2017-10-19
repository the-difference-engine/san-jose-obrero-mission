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

  factory :case_manager, class: User do
    email 'cm@email.com'
    password 'password'
    role 1
  end

  factory :residential_aide, class: User do
    email 'ra@email.com'
    password 'password'
    role 2
  end

  factory :security, class: User do
    email 's@email.com'
    password 'password'
    role 3
  end

  # TODO keep going for the rest
end
