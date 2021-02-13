import _ from 'lodash';
beforeAll(() => {
    global._ = _
});

const add = (a, b) => {
    return a + b
}

describe('First test with jest: ', () => {
    it('add fn', () => {
        expect(add(4,3)).toEqual(7)
    })
})
