class Puzzle < ActiveRecord::Base
	has_many :cells
	attr_reader :puzzle_array, :filled_cells

	def get_cells
		@filled_cells = Cell.where(puzzle_id: self.id)
	end

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

	def populate_array
		@filled_cells.each do |c|
			x = c[:x]
			y = c[:y]
			@puzzle_array[y][x] = 1
		end
	end

	def put_it
		puts @puzzle_array[0]
		puts @puzzle_array[1]
		puts @puzzle_array[2]
		puts @puzzle_array[3]
		puts @puzzle_array[4]
	end

	def setup_board
		get_cells
		ready_array
		populate_array	
	end
end

# p.filled_cells.each do |c|
# 	puts("x: " + c[:x].to_s + "y: " + c[:y].to_s)
# end
