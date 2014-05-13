HTML 5 Picross
========

###### Picross, also known as Nonograms, are picture logic puzzles in which cells in a grid must be filled or left blank according to numbers at the side of the grid to reveal a hidden picture. In this puzzle type, the numbers measures how many unbroken lines of filled-in squares there are in any given row or column. For example, a clue of "4 8 3" would mean there are sets of four, eight, and three filled squares, in that order, with at least one blank square between successive groups.


#### Rules
* The numbers on the top and left of the game board give clues about the columns and rows respectively.
* The numbers indicate groups of filled cells in a row or column.
* Each grouping will be separated by at least one empty cell.
* Groupings will appear in the order they are displayed.
* You can hold the ctrl key while clicking to flag cells you are unsure about.
* Making an incorrect guess will cause the loss of one life.
* A fully solved puzzle will reveal a picture.


###Technologies
* Ruby on Rails
* JavaScript
* AJAX/JSON


####Planned Features and Updates
* Better display on the puzzle index.
* Add game instructions.
* Add game timer.
* Add a puzzle creator so that new puzzles can be added by drawing them in the grid.
* Use SASS to implement theming.
* Move board building logic from Ruby to JavaScript.
* Convert the gameboard to being drawn in SVG using D3.js, or Canvas possibly using Kinetic.js.
