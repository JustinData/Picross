Picross::Application.routes.draw do
	resources :puzzles

	root 'puzzles#index'

	resource :rules, :only => [:show]

	namespace :json, constraints: { format: 'json' }  do

		resources :puzzles do
			member do 
				get :getboard
			end

			member do
				get :getfilled
			end
		end
	end
end
