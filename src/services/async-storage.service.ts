type Entity = {
    _id?: string;
    [key: string]: any;
  }

export const storageService = {
    query,
    post
}

function query(entityType: string, delay: number = 200): Promise<Entity[]>{
    var entities: Entity[] = JSON.parse(localStorage.getItem(entityType) || '[]')
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function post(entityType: string, newEntity: Entity): Promise<Entity> {
    localStorage.clear()
    newEntity = { ...newEntity, _id: _makeId() }
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

// Private functions

function _save(entityType: string, entities: Entity[]): void {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length: number = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}