export default class FillBuffer {
    _buffer: string [] = [];
    _size = 0;
    _onFilled;
    constructor(size: number, onFilled: (buffer: string[]) => void) {
        this._size = size;
        this._onFilled = onFilled;
    }

    add(item: string) {
        this._buffer.push(item);
        if (this._buffer.length === this._size){
            this._onFilled(this._buffer);
            this._buffer = [];
        }
    }
};