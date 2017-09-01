class User < ApplicationRecord
  has_secure_password
  enum role: [:admin, :case_manager, :residential_aide, :security]
end
