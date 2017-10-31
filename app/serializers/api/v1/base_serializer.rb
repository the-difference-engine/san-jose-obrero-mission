module Api
  module V1
    class BaseController < ApplicationController
      def testing_tables
        [
          'one',
          'two',
          'three'
        ]
      end
    end
  end
end
