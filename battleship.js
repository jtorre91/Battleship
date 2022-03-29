const SHIP_PART = '#';

function solution(board) {
    try {
        validateBoard(board);
        const ships = new Ships();
        board.forEach(row => {
            for (const rowIndex in row) {
                if (row[rowIndex] === SHIP_PART) {
                    const piece = new ShipPiece(board.indexOf(row), rowIndex);
                    ships.craftShip(piece);
                }
            }
        });
        return ships.amounts();
    }
    catch (error) {
        throw new Error(error.message);
    }
};

function validateBoard(board) {
    if (!(board && board[0])) throw Error('The board is not well represented');
};

class Ships {

    constructor() {
        this.shipes = [];
        this.mapper = this.mapper();
    };

    craftShip(piece) {
        const ship = this.includes(piece);
        ship ? this.addPiece(ship, piece) : this.addShip(new Ship(piece));
    };

    includes(piece) {
        const surroundingPieces = piece.surroundingPieces();
        for (const shipIndex in this.shipes) {
            const ship = this.shipes[shipIndex];
            for (const spot in surroundingPieces) {
                if (ship.includes(surroundingPieces[spot]))
                    return ship;
            }
        }
        return null;
    };

    addShip(ship) {
        this.shipes.push(ship);
    };

    addPiece(ship, piece) {
        this.shipes.find(s => s === ship).addPiece(piece);
    };

    amounts() {
        let amountOfType = [];
        this.shipes.forEach(ship => {
            amountOfType[ship.size()] = (amountOfType[ship.size()] || 0) + 1;
        });
        return amountOfType.slice(1);
    };

    mapper() {
        const map = new Map();
        map.set(1, 'P');
        map.set(2, 'S');
        map.set(3, 'D');
        return map;
    };
};

class Ship {

    constructor(pieces) {
        this.pieces = [pieces];
    };

    addPiece(piece) {
        this.pieces.push(piece);
    };

    includes(otherPiece) {
        return this.pieces.find(piece => piece.equals(otherPiece));
    };

    size = () => this.pieces.length;
};

class ShipPiece {

    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
    };

    equals(piece) {
        return (this.x === piece.x && this.y === piece.y);
    };

    surroundingPieces() {
        const west = new ShipPiece(this.x, this.y - 1);
        const east = new ShipPiece(this.x, this.y + 1);
        const north = new ShipPiece(this.x - 1, this.y);
        const south = new ShipPiece(this.x + 1, this.y);
        return [west, east, north, south];
    };
};

module.exports = { solution };

solution([".##.#", "#.#..", "#...#", "#.##."]); // [2, 1, 2]

solution(["##...", "..#.#", "..##.", ".#..."]); // [2, 1, 1]
