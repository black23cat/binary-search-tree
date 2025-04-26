# binary-search-tree

### Tree method list

- insert(value)

  - Inserting value to tree

- deleteItem(value)

  - Remove value from the tree

- find(value)

  - Return node containing value or null if value not exist in tree

- levelOrder(callback)

  - Traverse tree in BFS-order.
    Call the callback on each node it's traverse, passing whole node as arguments

- inOrder(callback), preOrder(callback), postOrder(callback)

  - Traverse tree in DFO-order.
    Call the callback on each node it's traverse, passing whole node as arguments

- height(value)

  - Return longest path from node to leaf nodes

- depth(value)

  - Return the number of edges in the path from that node to the root node.

- isBalance()

  - Check every node on tree for height difference.
    Height difference > 1 in tree node is considered unbalance.
  - Return true if tree is balance, false if tree is not balance

- rebalance()
  - Rebalance an unbalance tree
