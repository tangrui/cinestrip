jest.dontMock('../logger')

describe('logger', () => {
  it('should write to stdout and stderr streams in test mode', () => {
    const bunyan = require('bunyan')
    const config = require('../config').default

    const loggerName = 'Cinestrip [TEST]'
    const loggerLevel = 'info'

    config.set('name', loggerName)
    config.set('log:level', loggerLevel)
    config.set('environment', 'test')

    require('../logger')

    expect(config.get.mock.calls.length).toBe(3)
    expect(config.get.mock.calls[0]).toEqual(['name'])
    expect(config.get.mock.calls[1]).toEqual(['environment'])
    expect(config.get.mock.calls[2]).toEqual(['log:level'])

    expect(bunyan.createLogger).toBeCalled()
    const options = bunyan.createLogger.mock.calls[0/* first call */][0/* first argument */]
    expect(options.src).toBe(false)
    expect(options.name).toBe(loggerName)
    expect(options.level).toBe(loggerLevel)
    expect(options.streams[0].level).toBe('info')
    expect(options.streams[1].level).toBe('error')
  })
})
