Bed.delete_all()
Resident.delete_all()
User.delete_all()

connection = ActiveRecord::Base.connection()
connection.execute('ALTER SEQUENCE beds_id_seq RESTART WITH 1')
connection.execute('ALTER SEQUENCE residents_id_seq RESTART WITH 1')
connection.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1')

User.create([
    {email: 'a@mail.com', password: 'password' , role: 0},
    {email: 'cm@mail.com', password: 'password' , role: 1},
    {email: 'ra@mail.com', password: 'password' , role: 2},
    {email: 's@mail.com', password: 'password' , role: 3}
  ])

ethnicities=["hispanic", "non-hispanic", "white", "black or african american", "asian", "american indian"]
25.times do
  Resident.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    date: Faker::Date.between(120.days.ago, Date.today),
    hmis_number: rand(1000000..9999999),
    hmis_entry_date: Faker::Date.between(120.days.ago, Date.today),
    documented: rand(2)==1,
    gender: rand(2) == 1 ? "male" : "female",
    ethnicity: ethnicities[rand(0..ethnicities.length)-1],
    bed_id: rand(10000),
    resident_race: Faker::ChuckNorris.fact,
    cause_of_homeslessness: Faker::ChuckNorris.fact,
    length_of_homelessness: rand(100),
    prior_living_situation: Faker::ChuckNorris.fact,
    number_of_shelters: rand(100),
    chronically_homeless: rand(2) == 1 ? 'Active' : 'Not Active',
    image: Faker::Avatar.image
    )
end

room_beds = {"North" => 10, "South" => 10, "First Floor Unit #1" => 1, "First Floor Unit #2" => 1, "Second Floor Unit #1" => 1, "Second Floor Unit #2" => 1, "Second Floor Unit #3" => 1, "Second Floor Unit #4" => 1, "Second Floor Unit #5" => 1, "Second Floor Unit #6" => 1, "Second Floor Unit #7" => 1, "Second Floor Unit #8" => 1, "Third Floor Unit #1" => 1}

room_beds.each do |room, beds|
  (1..beds).each do |bed| 
    Bed.create(
      top_or_bottom: "top",
      occupied: true,
      name: Faker::ChuckNorris.fact
      )
    Bed.create(
      top_or_bottom: "bottom",
      occupied: false,
      name: Faker::ChuckNorris.fact
      )
  end
end
