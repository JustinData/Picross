# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Cell.destroy_all
Puzzle.destroy_all

Puzzle.create(name: 'House', x_size: 5, y_size: 5)
Puzzle.create(name: 'Superman', x_size: 10, y_size: 10)

Cell.create(x: 2, y: 0, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 1, y: 1, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 1, y: 2, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 1, y: 3, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 2, y: 0, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 2, y: 1, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 2, y: 2, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 2, y: 3, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 2, y: 4, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 3, y: 0, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 3, y: 1, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 3, y: 3, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 3, y: 4, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 4, y: 0, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 4, y: 1, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 4, y: 3, puzzle_id: Puzzle.find_by_name('House'))
Cell.create(x: 4, y: 4, puzzle_id: Puzzle.find_by_name('House'))

