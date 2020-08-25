import React, { Component } from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import arrayMove from 'array-move'

const SortableItem = SortableElement(({value, sortIndex}) => (
    <li>
      {value} - #{sortIndex}
    </li>
  ));
   
  const SortableList = SortableContainer(({items}) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            sortIndex={index}
            value={value}
          />
        ))}
      </ul>
    );
  });
  

// function Probe(props) {
//     const list = ['one', 'two', 'three', 'four']
//     const [state, setState] = useState(list)
//     const onSortEnd = ({oldIndex, newIndex}) => {
//         setState(({items}) => ({
//           items: arrayMove(items, oldIndex, newIndex),
//         }));
//       };

//     return (
//         <div>
//             <SortableList items={list} onSortEnd={onSortEnd}/>
//         </div>
//     )
// }

class Probe extends Component {
    state = {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({items}) => ({
        items: arrayMove(items, oldIndex, newIndex),
      }));
    };
    render() {
      return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
    }
  }

export default Probe