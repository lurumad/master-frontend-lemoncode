class TreeNode<T> {
    data: T
    left?: TreeNode<T>
    right?: TreeNode<T>

    constructor(data: T) {
        this.data = data
    }
}

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)

const inOrder = <T>(node: TreeNode<T>) => {
    if (node.left) {
        inOrder(node.left)
    }
    console.log(node.data)
    if (node.right) {
        inOrder(node.right)
    }
}

inOrder(root) // 4 2 5 1 3

