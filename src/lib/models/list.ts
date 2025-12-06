export interface Product {
    id: number;
    name?: string;
    isBought: boolean;
    quantity: number;
  }
  
  export interface List {
    id: string;
    name?: string;
    creationTimeStamp: number;
    products: Product[];
  }