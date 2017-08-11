Bed.delete_all()

connection = ActiveRecord::Base.connection()
connection.execute('ALTER SEQUENCE beds_id_seq RESTART WITH 1')



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