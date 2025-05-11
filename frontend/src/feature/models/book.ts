export interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
    description?: string;
    publishDate: string; // ISO date string
  }
  
  export interface BookFormValues {
    title: string;
    author: string;
    year: number;
    description?: string;
    publishDate: Date;
  }