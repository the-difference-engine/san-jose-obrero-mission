FactoryGirl.define do
  factory :resident do
    first_name 'Kyle'
    last_name 'Gundry'
    date Time.zone.parse('1969-03-01 21:00')
  end

  factory :resident_2, class: Resident do
    first_name 'Rob'
    last_name 'Rinkle'
  end
end
