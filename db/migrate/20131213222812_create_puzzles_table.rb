class CreatePuzzlesTable < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
    	t.string :name, null: false, unique: true
    	t.integer :x_size, null: false
    	t.integer :y_size, null: false
    end

    create_table :cells do |t|
    	t.integer :x, null: false
    	t.integer :y, null: false
    	t.integer :puzzle_id
    	t.foreign_key :puzzles
    end
  end
end
