class CreatePuzzlesTable < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
    	t.string :name
    	t.integer :x_size
    	t.integer :y_size

    	
    end
  end
end
