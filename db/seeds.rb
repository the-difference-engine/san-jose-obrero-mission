Bed.delete_all()
Resident.delete_all()

connection = ActiveRecord::Base.connection()
connection.execute('ALTER SEQUENCE beds_id_seq RESTART WITH 1')
connection.execute('ALTER SEQUENCE residents_id_seq RESTART WITH 1')


ethnicities=["hispanic", "non-hispanic", "white", "black or african american", "asian", "american indian"]
50.times do
  Resident.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    date: Faker::Date.between(120.days.ago, Date.today),
    hmis_number: rand(1000000..9999999),
    hmis_entry_date: Faker::Date.between(120.days.ago, Date.today),
    documented: rand(2)==1,
    gender: rand(2) == 1 ? "male" : "female",
    ethnicity: ethnicities[rand(0..ethnicities.length)-1],
    bed_id: rand(10)
    )
end

room_beds = {"North" => 10, "South" => 10, "First Floor Unit #1" => 1, "First Floor Unit #2" => 1, "Second Floor Unit #1" => 1, "Second Floor Unit #2" => 1, "Second Floor Unit #3" => 1, "Second Floor Unit #4" => 1, "Second Floor Unit #5" => 1, "Second Floor Unit #6" => 1, "Second Floor Unit #7" => 1, "Second Floor Unit #8" => 1, "Third Floor Unit #1" => 1}

room_beds.each do |room, beds|
  (1..beds).each do |bed| 
    Bed.create(
      top_or_bottom: "top",
      occupied: true
      )
    Bed.create(
      top_or_bottom: "bottom",
      occupied: false
      )
  end
end