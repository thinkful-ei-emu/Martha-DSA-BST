//1

/**
 *   3,1,4,6,9,2,5,7
 * 
 *                        3
 *                1                4
 *                    2                 6
 *                                    5      9
 *                                         7
 * 
 * EASYQUESTION
 * 
 *                        E
 *                A                   S
 *                              Q            Y
 *                            I            U
 *                              O        T
 *                            N
 * 
 * 
 */

//2

/**
  *                     2
  *               1           4
  *                                 6
  *                              5       9
  *                                     7 
  * 
  * 
  * 
  *                       E
 *                A                   S
 *                              I            Y
 *                                O        U    Q
 *                              N        T
 * 
  * 
  *                        
  */

//O(log(n)) run time complexity (eliminating sub trees along the way)
class BinarySearchTree{
  constructor(key = null, value = null, parent = null){
    this.key = key;
    this.value = value; 
    this.parent = parent; 
    this.left = null; 
    this.right = null;
  }

  insert(key, value){
    //if empty
    if(this.key === null){
      this.key = key; 
      this.value = value;
    }
    //if it already exists (check left)
    else if(key < this.key){
      //if left is open 
      if(this.left === null){
        this.left = new BinarySearchTree(key, value, this);
      }
      else{
        this.left.insert(key, value);
      }
    }
    //if already exists (check right)
    else{
      if(this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      }
      else{
        this.right.insert(key, value);
      }
    }
  }

  find(key){
    if(this.key === key){
      return this.value;
    }
    //go left if there are more to the left recursive 
    else if(key < this.key && this.left){
      return this.left.find(key);
    }
    //go right if there are more to the right recursive 
    else if(key > this.key && this.right){
      return this.right.find(key);
    }
    //never found it
    else{
      throw new Error('Key Error');
    }
  }

  remove(key){
    if(this.key === key){
      //if you have both children
      if(this.left && this.right){
        //findMin is a helper method
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left){
        this._replaceWith(this.left);
      }
      else if(this.right){
        this._replaceWith(this.right);
      }
      else{
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left){
      this.left.remove(key);
    }
    else if(key > this.key && this.right){
      this.right.remove(key);
    }
    else{
      throw new Error('Key Error');
    }
  }

  _replaceWith(node){
    if(this.parent){
      if(this === this.parent.left){
        this.parent.left = node;
      }
      else if (this === this.parent.right){
        this.parent.right = node;
      }
      if(node){
        node.parent = this.parent;
      }
    }
    else{
      if(node){
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else{
        this.key = null;
        this.value = null;
        this.left = null; 
        this.right = null;
      }
    }
  }

  _findMin(){
    if(!this.left){
      return this;
    }
    return this.left._findMin();
  }
}



function main(){
  let BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);
  return BST;

  // let bst = new BinarySearchTree();
  // bst.insert('E');
  // bst.insert('A');
  // bst.insert('S');
  // bst.insert('Y');
  // bst.insert('Q');
  // bst.insert('U');
  // bst.insert('E');
  // bst.insert('S');
  // bst.insert('T');
  // bst.insert('I');
  // bst.insert('O');
  // bst.insert('N');
  
  //console.log(bst.remove('Y'));

  //console.log('bst', bst);
}

//console.log(main());


function tree(t){
  if(!t){
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

/**
 * What does this program do?
 * passing in a tree ?? -> if there is no tree return 0 
 * else return 
 * 
 * recursive function using the left node 
 *        + current value  
 *        + recursive function using right node
 * 
 * example:
 * 
 *                3
 *            2       4 
 *                      6
 *                    5   7
 * 
 *        skips first if b/c t exists has a root
 *   do whole thing again with 2 + 3 + do whole thing again with 4
 *   0 + 2 + 3 + 0 + 4 + 0 + 5 + 6 + 0 + 7 
 * 
 * Sums the entire tree (given tree of numbers)
 * arranges in order with zeros inbetween marking the ends of the left 
 * or right branch (given tree of letters)
 * 
 * run time complexity is O(n) because it is looping through the whole 
 * tree once
 * 
 */


function height(tree, currHeight = 1){
  let maxHeight = 0;
  if(tree === undefined){
    return 'Height of 0';
  }
  if(tree.left === null && tree.right === null){
    console.log(currHeight);
    if(currHeight > maxHeight){
      maxHeight = currHeight;
    }
  }
  if(tree.right){
    height(tree.right, currHeight + 1);
  }
  if(tree.left){
    height(tree.left, currHeight + 1);
  }
  console.log('max', maxHeight);
}

console.log(height(main()));

//need to check each branch and see which goes the furthest down 
//start by checking going down the left all the way 


/**
 * group review interview question
 * given a sorted array, create a binary search tree from the elements of the sorted array
 * height balanced 
 * runtime O(n)
 * 
 * insert 
 * remove 
 * find 
 * 
 * input : [3, 5, 7, 9, 11, 13, 15]
 * output: 
 * 
 *                9
 *            5        13
 *         3   7     11    15
 *                          
 * 
 * 
 * start with middle 
 * then do middle of the halves...
 * 
 */

// function arraytoBST(arr, index = Math.floor(arr.length/2)){
//   let tree = new BinarySearchTree(arr[index]);
//   tree.left = arraytoBST(arr, Math.floor(index/2));
//   tree.right = arraytoBST(arr, Math.ceil(index*1.5));

// }

function arrayBSt(arr, start = 0, end = arr.length-1){
  if(start > end){
    return;
  }
  let middle = Math.floor(start+end/2); //3
  let tree = new BinarySearchTree(arr[middle]); //9
  tree.left = arrayBSt(arr, start, middle - 1);
  tree.right = arrayBSt(arr, middle + 1, end);
  return tree;
}

let arr = [3, 5, 7, 9, 11, 13, 15];


