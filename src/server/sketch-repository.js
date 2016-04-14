import path from 'path'

import fs from 'fs-plus'
import isArray from 'lodash.isarray'

import config from '../config'
import logger from '../logger'
import Sketch from './sketch'

export default class SketchRepository extends Map {

  _parseSketches(modulePaths, sketchType) {
    modulePaths.forEach(modulePath => {
      const sketchJsonFilePath = path.join(modulePath, 'sketch.json')
      if (fs.existsSync(sketchJsonFilePath)) {
        const sketchConfig = require(sketchJsonFilePath)

        logger.info('loading sketch %s...', sketchConfig.name)

        const sketch = new Sketch(sketchConfig)
        sketch.sketchType = sketchType
        this.set(sketch.name, sketch)
      }
    })
  }

  _loadSketches(sketchType) {
    const folderMapping = {
      [Sketch.TYPE_NPM]: 'node_modules',
      [Sketch.TYPE_LOCAL]: 'sketches'
    }

    const configMapping = {
      [Sketch.TYPE_NPM]: 'npmSketches',
      [Sketch.TYPE_LOCAL]: 'localSketches'
    }

    const sketchFolder = path.join(config.get('appPath'), folderMapping[sketchType])
    const sketchNames = config.get(configMapping[sketchType])
    if (sketchNames === 'auto') {
      logger.info('Automatically load all sketches from %s.', sketchFolder)
      this._parseSketches(fs.listSync(sketchFolder), sketchType)
    } else if (isArray(sketchNames)) {
      logger.info(
        'Load all sketches from %s according to "%sSketches" config.',
        folderMapping[sketchType],
        sketchType
      )
      this._parseSketches(
        sketchNames.map(name => path.join(sketchFolder, name)), sketchType
      )
    } else {
      logger.warn('Missing or invalid "%s" config, skip loading.', configMapping[sketchType])
    }
  }

  init() {
    logger.info('Initializing sketch repository...')

    this._loadSketches(Sketch.TYPE_NPM)
    this._loadSketches(Sketch.TYPE_LOCAL)
  }
}
