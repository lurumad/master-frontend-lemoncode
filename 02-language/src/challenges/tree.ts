interface TreeNode<T> {
    id: string;
    data: T,
    children?: Array<TreeNode<T>>;
}

const tree: TreeNode<number> = {
    id: 'parent-1',
    data: 1,
    children: [
        {
            id: 'son-1',
            data: 2,
            children: [
                {
                    id: 'grandson-1',
                    data: 3
                },
                {
                    id: 'grandson-2',
                    data: 4
                }
            ]
        },
        {
            id: 'son-2',
            data: 5,
        }
    ]
}

const traverseTree = <T>(node: TreeNode<T>) => {
    console.log(node.data);
    node.children?.forEach(node => traverseTree(node))
}

traverseTree(tree)