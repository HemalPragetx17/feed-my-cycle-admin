export interface Blog {
  _id?: string;
  title: string;
  content: string;
  image: string;
  isPublished?: boolean;
  isDraft?: boolean;
  _createdAt?: string;
};

export interface BlogValidateData {
  title: boolean;
  content: boolean;
  image: boolean;
};