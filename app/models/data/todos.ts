import { types } from 'mobx-state-tree'

export const Todo = types.model({
  task: types.string,
  completed: types.boolean
})

export const TodoListModel = types.model({
  list: types.array(Todo)
}).actions(self => ({
  add: (item) => {
    self.list.push(item)
  }
})).views(self => ({
  get completedCount() {
    return self.list.filter(todo => todo.completed).length
  }
}))
