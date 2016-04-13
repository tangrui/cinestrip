export default class Sketch {
  constructor({
    name,
    modelDirectory = 'lib/models',
    typeDirectory = 'lib/graphql/types',
    queryDirectory = 'lib/graphql/queries',
    mutationDirectory = 'lib/graphql/mutations'
  }) {
    this._name = name
    this._modelDirectory = modelDirectory
    this._typeDirectory = typeDirectory
    this._queryDirectory = queryDirectory
    this._mutationDirectory = mutationDirectory
  }

  get name() {
    return this._name
  }

  get modelDirectory() {
    return this._modelDirectory
  }

  get typeDirectory() {
    return this._typeDirectory
  }

  get queryDirectory() {
    return this._queryDirectory
  }

  get mutationDirectory() {
    return this._mutationDirectory
  }

  set isNpmSkech(_isNpmSketch) {
    this._isNpmSketch = _isNpmSketch
  }

  get isNpmSkech() {
    return this._isNpmSketch
  }
}
