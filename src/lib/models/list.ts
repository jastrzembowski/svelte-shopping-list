export interface ShoppingItem {
    id: number;
    name: string;
    done: boolean;
  }
  
  export interface ShoppingList {
    id: number;
    name: string;
    items: ShoppingItem[];
  }