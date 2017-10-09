class Api::V1::BedSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :top_or_bottom,
             :occupied
end