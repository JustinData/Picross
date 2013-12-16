class PuzzlesController < ApplicationController

	def index
		@puzzles = Puzzle.all
	end

	def show
		@puzzle = Puzzle.find(params[:id])
		@puzzle.setup_board
	end

end