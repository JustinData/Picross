class Puzzle < ActiveRecord::Base
	has_many :cells
	attr_reader :puzzle_array, :filled_cells, :counts

	# Get the filled cells for the puzzle
	def get_cells
		@filled_cells = Cell.where(puzzle_id: self.id)
	end

	# Prepares a 2D array of the appropriate size
	# Each value in the array is 0
	def ready_array
		@puzzle_array = []
		xsize = self.x_size 
		ysize = self.y_size
		ysize.times do
			row_array = []
			xsize.times do
				row_array << 0
			end
			@puzzle_array << row_array
		end
		puts @puzzle_array
	end

	# Adjusts the 2D array to contain the filled cells
	# Filled cells have a value of 1
	def populate_array
		@filled_cells.each do |c|
			x = c[:x]
			y = c[:y]
			@puzzle_array[y][x] = 1
		end
	end

	# Need a method to count blocks of filled cells in a row
	def get_counts
		@counts = {}
		row_counts = []
		row_length = self.y_size

		@puzzle_array.each do |a|
			row_array = []
			count = 0
			checked = 0
			binding.pry
			a.each do |v|
				checked += 1
				if v == 1
					count += 1

					if checked == row_length
						row_array << count
						count = 0
					end
				elsif v == 0 && count != 0
					row_array << count
					count = 0
				end
			end
			row_counts << row_array
		end
		@counts[:rows] = row_counts
	end

	# Called by the controller to prepare the game board for play
	def setup_board
		get_cells
		ready_array
		populate_array
		get_counts	
	end
end

# p.filled_cells.each do |c|
# 	puts("x: " + c[:x].to_s + "y: " + c[:y].to_s)
# end
