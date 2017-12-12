# == Schema Information
#
# Table name: beds
#
#  id            :integer          not null, primary key
#  room_id       :integer
#  name          :string
#  top_or_bottom :string
#  occupied      :boolean
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resident_id   :integer
#

class Bed < ApplicationRecord
  has_one :resident
end
