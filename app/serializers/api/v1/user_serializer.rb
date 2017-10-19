class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :role,
             :password_digest
end