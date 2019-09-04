//1

/**
 *   3,1,4,6,9,2,5,7
 * 
 *                        3
 *                1                4
 *                    2                 6-C
 *                                    5      9-N
 *                                         7
 *                                            
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
  //BST.remove(7);
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

//try to get working
// function height(tree, currHeight = 1){
//   let maxHeight = 0;
//   if(tree === undefined){
//     return 0;
//   }
//   if(tree.left === null && tree.right === null){
//     let height = currHeight;
//     if(height > maxHeight){
//       maxHeight = height;
//     }
//     debugger;
//   }
//   if(tree.right){
//     height(tree.right, currHeight + 1);
//   }
//   if(tree.left){
//     height(tree.left, currHeight + 1);
//   }
// }

function height(tree, leftVal = 1, rightVal = 1){
  if(tree.key === null && tree.parent === null){
    return 0;
  }
  if(tree.left === null && tree.right === null){
    if(leftVal >= rightVal){
      return leftVal;
    } else{
      return rightVal;
    }
  }
  if(tree.left && tree.right){
    leftVal++;
    rightVal++;
    return height(tree.left, leftVal, rightVal), height(tree.right, leftVal, rightVal);
  }
  if(tree.left){
    leftVal++;
    return height(tree.left, leftVal, rightVal);
  }
  if(tree.right){
    rightVal++;
    return height(tree.right, leftVal, rightVal);
  }
}

let shorttree = new BinarySearchTree();
shorttree.insert(1);
shorttree.insert(2);
shorttree.insert(4);
shorttree.insert(7);
shorttree.insert(9);

//console.log(height(shorttree));

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

//let arr = [3, 5, 7, 9, 11, 13, 15];


function isThisBinary(tree){
  if(tree === null){
    return 'Empty tree';
  }

  if(tree.left){
    if(tree.left > tree.key){
      return false;
    }
  }
  if(tree.right){
    if(tree.right < tree.key){
      return false;
    }
  }
  else {
    return isThisBinary(tree.left), isThisBinary(tree.right);
  }
  return true;
}

//console.log(isThisBinary(main()));

let notSearch = {key: 1, left: 5, right: 6};
//console.log(isThisBinary(notSearch));


function thirdLargest(tree){
  let currentNode = tree;
  let nextNode = currentNode.right;
  while(nextNode.right !== null){
    currentNode = nextNode;
    nextNode = nextNode.right;
  }
  if(nextNode.left !== null && nextNode.left.right !== null){
    return nextNode.left;
  }
  if(nextNode.left !== null && nextNode.left.left !== null){
    return 2, nextNode.left.left;
  }
  if(nextNode.left === null && currentNode.left !== null){
    return 3, currentNode.left;
  }
  if(nextNode.left === null && currentNode.left === null){
    return 4, currentNode.parent;
  }
  else {
    return currentNode;
  }
}

//console.log(thirdLargest(main()));


/**
largest has a left -> right  => left is 3rd
largest has a left -> left  => 2nd left is the 3rd
largest !left -> current -> left => left is 3rd
largest !left -> current !left => parent is 3rd 

 *                        3
 *                1                4
 *                    2                 6
 *                                    5      9
 *                                         7
 * 
 * 
 * 
 * 
 *                9
 *            5        13             <= Balanced
 *         3   7    11    15
 * 
 * 
 *                9
 *            5        13             <= Balanced
 *         3   7     11    15
 *          4 6               
 * 
 * 
 * 
 *                9
 *            5        13             <= UNBalanced
 *         3   7     11    15       b/c 4.5 is 2 apart from the shallowest
 *          4                       leaf nodes (7, 11, 15)
 *            4.5                  
 */ 


/**
  * check length of each branch 
  * check the lengths of each branch if there is a 
  * difference that is more than 2 then false
  * 
  * An empty tree is height-balanced. A non-empty binary tree T is balanced if:
1) Left subtree of T is balanced
2) Right subtree of T is balanced
3) The difference between heights of left subtree and right subtree is not more than 1. 
*/

function balanced(tree){
  if(tree.key === null && tree.parent === null){
    return true;
  }
  if(tree.left === null && tree.right === null){
    //return true;
  }

}


//simulate inserting into tree if results are the same => true

/**       arr1                  
 *     3 
 *     5 after3 
 *     4 after 3 before 5
 *     6 after 4 and after 5
 *     1 before 3
 *     0 before 1 
 *     2 after 0 and after 1
 *arr1 =>           3
                  1    5  
 *              0  2   4  6 



            3
            1 before 3  => left 
            5 after 3   => right
            2 after 1 before 3  
            4 after 3 before 5
            6 after 5
            0 before 1


 arr2 =>            3
 *                1    5
                0  2  4  6
 */

class _Node { 
  constructor(value, next){
    this.value = value; 
    this.next = next;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
  }

  insertFirst(item){
    this.head = new _Node(item, this.head);
  }

  insertLast(item){
    if(this.head === null){
      this.insertFirst(item);
    }
    else {
      //starts with the first node
      let tempNode = this.head;
      while(tempNode.next !== null){
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, beforeNode){
    if(this.head === null){
      this.insertFirst(item);
    }
    if(beforeNode === this.head){
      this.insertFirst(item);
    }
    let currNode = this.head;
    let prevNode = this.head;
  
    let targetNode = this.find(beforeNode);
    while(currNode !== targetNode){
      prevNode = currNode;
      currNode = currNode.next;
    }
    prevNode.next = new _Node(item, targetNode);
    // console.log(prevNode);
    // console.log(prevNode.next);
  }

  insertAfter(item, afterNode){
    if(this.head === null){
      this.insertFirst(item);
    }
    let currNode = this.head;
    let targetNode = this.find(afterNode);

    while(currNode !== targetNode){
      currNode = currNode.next;
    }
    currNode.next = new _Node(item, targetNode.next);
    // console.log(currNode);
    // console.log(currNode.next);
  }

  insertAt(item, location){
    if(this.head === null){
      this.insertFirst(item);
    }
    if(location === 0){
      this.insertFirst(item);
    }
    let currNode = this.head;
    let prevNode = this.head;
    for(let i=0; i<location; i++){
      prevNode = currNode;
      currNode = currNode.next;
    }
    prevNode.next = new _Node(item, currNode);
    console.log(prevNode);
    console.log(prevNode.next);
  }  

  find(item){
    //start at the head
    let currNode = this.head;
    //if the list is empty 
    if(!this.head){
      return null; 
    }
    //check for the item
    while(currNode.value !==item){
      //return ull if its the end of the list and 
      //the item is not on the list
      if(currNode.next === null){
        return null;
      }
      else{
        //otherwise keep looking
        currNode = currNode.next;
      }
    }
    //found it
    return currNode;
  }

  remove(item){
    //if the list is empty
    if(!this.head){
      return null;
    }
    //if node to remove is the head, make the next the new head
    if(this.head.value === item){
      this.head = this.head.next;
      return;
    }
    //start at the head
    let currNode = this.head;
    //previous node
    let previousNode = this.head;

    while((currNode !== null) && (currNode.value !== item)){
      //save the previous node
      previousNode = currNode; 
      currNode = currNode.next; 
    }
    if(currNode === null){
      console.log('Item not found');
      return;
    }
    //making new connection of next pointer
    previousNode.next = currNode.next;
  }
}

//the same exact tree!
function areTheyTheSame(arr1, arr2){
  if(arr1[0] !== arr2[0]){
    return false;
  }
  let linkedList1 = new LinkedList();
  //let linkedList2 = new LinkedList();

  linkedList1.insertFirst(arr1[0]);
  let currItem = linkedList1.head;
  for(let i = 0; i < arr1.length; i++){
    console.log('curr', currItem);
    //console.log(arr1[i]);
    if(arr1[i] < currItem){
      linkedList1.insertBefore(currItem);
      currItem=arr1[i];
      i++;
    }
    if(arr1[i] > currItem){
      linkedList1.insertAfter(currItem);
      currItem=arr1[i];
      i++;
    }
  }
  //console.log(linkedList1);

  //linkedList2.insertFirst(arr2[0]);
}

let arrUno = [3, 5, 4, 6, 1, 0, 2];
let arr2 = [3, 1, 5, 2, 4, 6, 0];

console.log(areTheyTheSame(arrUno, arr2)); //should be true



