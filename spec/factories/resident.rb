FactoryGirl.define do
  factory :resident do
    first_name 'Kyle'
    last_name 'Gundry'
  end
  factory :resident_2, class: Resident do
    first_name 'Rob'
    last_name 'Rinkle'
  end
end