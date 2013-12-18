class Json::PuzzlesController < ApplicationController

	def getboard
		puzzle = Puzzle.find(params[:id])
		puzzle.setup_board
		board = puzzle.puzzle_array

		render json: [board]
	end

end