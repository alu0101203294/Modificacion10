import 'mocha';
import {expect} from 'chai';
import {add} from "../src/mod.js";

describe('Example', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).to.equal(3)
  })
})