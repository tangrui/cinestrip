import path from 'path'

import fs from 'fs-plus'
import isArray from 'lodash.isarray'

import config from '../config'
import logger from '../logger'
import Sketch from './sketch'

export default class SketchRepository extends Map {

  _parseSketches(modulePaths, isFromNpm) {
    modulePaths.forEach(modulePath => {
      const sketchJsonFilePath = path.join(modulePath, 'sketch.json')
      if (fs.existsSync(sketchJsonFilePath)) {
        const sketchConfig = require(sketchJsonFilePath)

        logger.info('loading sketch %s...', sketchConfig.name)

        const sketch = new Sketch(sketchConfig)
        sketch.isNpmSkech = isFromNpm
        this.set(sketch.name, sketch)
      }
    })
  }

  _loadSketches(sketchType) {
    const folderMapping = {
      npm: 'node_modules',
      local: 'sketches'
    }

    const sketchFolder = path.join(config.get('appPath'), folderMapping[sketchType])
    const sketchNames = config.get(`${sketchType}Sketches`)
    if (sketchNames === 'auto') {
      logger.info('Automatically load all sketches from %s.', folderMapping[sketchType])
      this._parseSketches(fs.listSync(sketchFolder), true)
    } else if (isArray(sketchNames)) {
      logger.info(
        'Load all sketches from %s according to "%sSketches" config.',
        folderMapping[sketchType],
        sketchType
      )
      this._parseSketches(
        sketchNames.map(name => path.join(sketchFolder, name)), true
      )
    } else {
      logger.warn('Missing or invalid "%sSketches" config, skip loading.', sketchType)
    }
  }

  init() {
    logger.info('Initializing sketch repository...')

    this._loadSketches('npm')
    this._loadSketches('local')
  }
}
