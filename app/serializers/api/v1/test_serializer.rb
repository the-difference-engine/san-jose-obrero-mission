class Api::V1::TestSerializer < ActiveModel::Serializer
  attributes :table_headers,
             :all_residents

  def table_headers
    [
      'one',
      'two',
      'three'
    ]
  end
  
  def all_residents
    object
  end

end
