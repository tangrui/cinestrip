// import ModelRepository from './model-repository'

export default class Sketch {
  static TYPE_NPM = Symbol('npm')
  static TYPE_LOCAL = Symbol('local')

  static directories = {
    models: 'lib/models',
    types: 'lib/graphql/types',
    queries: 'lib/graphql/queries',
    mutations: 'lib/graphql/mutations'
  }

  constructor(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set sketchType(sketchType) {
    this._sketchType = sketchType
  }

  get sketchType() {
    return this._sketchType
  }
}
