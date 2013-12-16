Picross::Application.routes.draw do
	resources :puzzles

	root 'puzzles#index'
end
