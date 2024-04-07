export interface IBook {
    id: string;
    ISBN?: string;
    title?: string;
    description?: string;
    content?: string;
    author?: string;
    genre?: string;
    imageUrl?: string;
    accessFrequency: number;
    quantity?: number;
    shelf?: number;
  }

  export interface ListNode {
    book: IBook;
    prev: ListNode | null;
    next: ListNode | null;
}

class Node implements ListNode {
    book: IBook;
    frequencyAccess: number;
    next: Node | null;
    prev: Node | null;

    constructor(book:IBook){
        this.book = book;
        this.frequencyAccess = book.accessFrequency;
        this.next = null;
        this.prev = null;
    }
}

export default Node;