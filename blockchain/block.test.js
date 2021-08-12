const { isTypedArray } = require('util/types');
const Block = require('./block');
const {DIFFICULTY} = require('../config');

describe('Block',()=>{

    let data,lastBlock, block;
    beforeEach(()=>{
         data = 'bar';
         lastBlock = Block.genesis();
         block = Block.mineBlock(lastBlock,data);
    });


    it('set the `data` to match input',()=>{
        expect(block.data).toEqual(data);
    });

    it('set the `lastHash` to match the hash of last block',()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generates a hash that the matches the difficulty',()=>{
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('lowers the difficulty for slowly mined blocks',()=>{
        expect(Block.adjustDifficulty(block,block.timestamp+360000)).
        toEqual(block.difficulty-1);
    })

    it('raises the difficulty for quickly mined blocks',()=>{
        expect(Block.adjustDifficulty(block,block.timestamp+1)).
        toEqual(block.difficulty+1);
    })
})