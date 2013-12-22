Picross::Application.routes.draw do
	resources :puzzles

	root 'puzzles#index'

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
