
import Base from './Base';
// we can use any name instead of Base because we are using default export
// Only one entity can be exported as default

var ProductConfig = [];

class Product extends Base{
    constructor (name, qty) {
        super();
        this.name = name,
            this.qty = qty
    }
}

// There exists module loaders -> web packs
// Web pack will take all the files in the directory and bundle them into one file


export { Product };
// named export

