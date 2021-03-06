class Json::PuzzlesController < ApplicationController

	def getboard
		puzzle = Puzzle.find(params[:id])
		puzzle.setup_board
		board = puzzle.puzzle_array

		render json: [board]
	end

	def getfilled
		puzzle = Puzzle.find(params[:id])
		puzzle.setup_board
		filled = puzzle.filled_cells.length

		render json: [filled]
	end
end