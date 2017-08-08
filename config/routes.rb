Rails.application.routes.draw do

  devise_for :residential_aids, path: 'residential_aids'
  devise_for :securities, path: 'securities'
  devise_for :case_managers, path: 'case_managers'
  get "/" => "application#index"

end
