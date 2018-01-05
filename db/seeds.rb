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

beds = %w[
    1N
    2N
    3N
    4N
    5N
    6N
    7N
    8N
    9N
    10N
    11N
    12N
    13N
    14N
    15N
    16N
    17N
    18N
    19N
    20N
    1S
    2S
    3S
    4S
    5S
    6S
    7S
    8S
    9S
    10S
    11S
    12S
    13S
    14S
    15S
    16S
    17S
    18S
    19S
    20S
    105TB 
    105BB 
    107TB 
    107BB 
    201TB 
    201BB 
    202TB 
    202BB 
    203TB 
    203BB 
    204TB 
    204BB 
    209TB 
    209BB 
    210TB 
    210BB 
    211TB 
    211BB 
    221TB 
    221BB 
    311TB 
    311BB
]

beds.each do | bed |
  Bed.create(
    bed_id: bed,
    occupied: false,
    resident_id: nil
  )
end
