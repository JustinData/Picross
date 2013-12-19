class Puzzle < ActiveRecord::Base
	has_many :cells
	attr_reader :puzzle_array, :filled_cells, :counts, :max_cell_count_x, :max_cell_count_y, :cell_size, :board_width, :cell_width, :border, :row_counts_width, :column_counts_height, :row_counts_height, :row_count_max, :column_count_max


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

	# Need a method to count blocks of filled cells for each row in a 2DArray
	def check_counts(puzzle_array)
		row_counts = []
		row_length = self.y_size

		puzzle_array.each do |a|
			row_array = []
			count = 0
			checked = 0
			
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
		@counts << row_counts
	end

	def set_cell_size

		if self.x_size >= self.y_size
			cell_count = self.x_size
		else
			cell_count = self.y_size
		end

		case cell_count
		when 5
			@cell_size = 60
		when 10
			@cell_size = 50
		when 15
			@cell_size = 40
		when 20
			@cell_size = 30
		when 25
			@cell_size = 20
		end

		@cell_width = @cell_size - (@border * 2)
	end

	def get_max_cell_count_x
		@row_count_max = 0
		@counts[0].each do |a|
			if a.length > @row_count_max
				@row_count_max = a.length
			end
		end
		@max_cell_count_x = @row_count_max + self.x_size

		@column_count_max = 0
		@counts[1].each do |a|
			if a.length > @column_count_max
				@column_count_max = a.length
			end
		end
		@max_cell_count_y = @column_count_max + self.y_size
	end

	def set_board_size
		@board_width = @max_cell_count_x * @cell_size
		@board_height = @max_cell_count_y * @cell_size
		@row_counts_width = @row_count_max * @cell_size
		@row_counts_height = self.y_size * @cell_size
		@column_counts_height = @column_count_max * @cell_size
	end

	def set_sizes
		@border = 1
		set_cell_size
		get_max_cell_count_x
		set_board_size
	end

	# Gets the counts for row and columns
	def get_counts
		@counts = []
		check_counts(@puzzle_array)
		new_array = @puzzle_array.transpose
		check_counts(new_array)
	end

	# Called by the controller to prepare the game board for play
	# Method call order is important
	def setup_board
		get_cells
		ready_array
		populate_array
		get_counts
		set_sizes	
	end
end

# p.filled_cells.each do |c|
# 	puts("x: " + c[:x].to_s + "y: " + c[:y].to_s)
# end
