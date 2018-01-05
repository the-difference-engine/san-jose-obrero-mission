class Api::V1::BedSerializer < ActiveModel::Serializer
  attributes :bed_id,
             :occupied,
             :testing_this


  def testing_this
    return true
  end
end