const Block = require('./block');
const Blockchain = require('./index')

describe('Block',()=>{

    let bc,bc2;
    beforeEach(()=>{
        bc = new Blockchain();
        bc2 = new Blockchain();
    });


    it('start with genesis block',()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('add a new block',()=>{
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validate a valid chain',()=>{
        bc2.addBlock('foo');

        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidate a chain with corrupt genesis block',()=>{
        bc2.chain[0].data = 'Bad Data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidate a corrupt chain',()=>{
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Not Foo';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces the chain with valid chain',()=>{
        bc2.addBlock('coo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);

    });

    it('does not replace since chain is less than original one',()=>{
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    });

    


})