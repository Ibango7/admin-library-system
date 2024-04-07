import Node from "./Node";

const RearrangeNodes = (head:Node | null, node:Node) =>{
    if(!node.prev){
        // if node doesn't have previous it is already in the front
        return node;
    }

    // move node closer to the front of the shelf
    const temp = node.prev;
    node.prev = temp.prev;
    temp.prev = node;
    temp.next = node.next;
    node.next = temp;

    if(temp.next) {
        temp.next.prev = temp;
    }
    if(node.prev){
        node.prev.next = node;
    }

    // return teh new head if the rearranged node becomes the new head
    if (!node.prev){
        return node;
    } else {
        return head;
    }
}

export default RearrangeNodes;