import React, {Component} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import PropTypes from 'prop-types'

import arrayMove from 'array-move'
import FavorItem from './FavorItem'
 
export const SortableItem = SortableElement(({value, settings}) => <li> <FavorItem item={value} settings={settings}/> </li>)
 
export const SortableList = SortableContainer(({items, settings}) => {
  return (  
    <ul>
      {items.map((value, index) => (
        <SortableItem key={value.stopNumber} index={index} value={value} settings={settings}/>
      ))}
    </ul>
  )
})

class SortableComponent extends Component {
    state = {
      items: this.props.items,
      settings: this.props.settings
    }
    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({items}) => ({
        items: arrayMove(items, oldIndex, newIndex),
      }))
      this.props.setSortedArray(this.state.items)
    }
    render() {
      return <SortableList items={this.state.items} settings={this.state.settings} onSortEnd={this.onSortEnd} />
    }
}

SortableComponent.propTypes = {
  items: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  setSortedArray: PropTypes.func.isRequired
}

export default SortableComponent

