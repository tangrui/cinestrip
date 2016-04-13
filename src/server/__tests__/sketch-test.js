jest.dontMock('../sketch')

describe('sketch', () => {
  const Sketch = require('../sketch').default

  it('should take default option values', () => {
    const s = new Sketch({
      name: 'test-sketch'
    })
    s.isNpmSkech = false

    expect(s.name).toBe('test-sketch')
    expect(s.modelDirectory).toBe('lib/models')
    expect(s.typeDirectory).toBe('lib/graphql/types')
    expect(s.queryDirectory).toBe('lib/graphql/queries')
    expect(s.mutationDirectory).toBe('lib/graphql/mutations')
    expect(s.isNpmSkech).toBe(false)
  })

  it('should take input option values', () => {
    const s = new Sketch({
      name: 'test-sketch',
      modelDirectory: 'path/to/models',
      typeDirectory: 'path/to/types',
      queryDirectory: 'path/to/queries',
      mutationDirectory: 'path/to/mutations'
    })
    s.isNpmSkech = true

    expect(s.name).toBe('test-sketch')
    expect(s.modelDirectory).toBe('path/to/models')
    expect(s.typeDirectory).toBe('path/to/types')
    expect(s.queryDirectory).toBe('path/to/queries')
    expect(s.mutationDirectory).toBe('path/to/mutations')
    expect(s.isNpmSkech).toBe(true)
  })
})
