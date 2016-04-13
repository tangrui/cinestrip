jest.dontMock('../sketch')

describe('sketch', () => {
  const Sketch = require('../sketch').default

  it('should take default option values', () => {
    const s = new Sketch('test-sketch')
    s.sketchType = Sketch.TYPE_LOCAL

    expect(s.name).toBe('test-sketch')
    expect(s.sketchType).toBe(Sketch.TYPE_LOCAL)
  })
})
