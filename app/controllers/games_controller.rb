class GamesController < ApplicationController

	def index
		@puzzles = Puzzle.all
	end

end