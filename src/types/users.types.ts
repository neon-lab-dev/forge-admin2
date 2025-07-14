export type TUser = {
  id: string;
  name: string;
  verticles: string[];
  category: string[];
  email: string;
  attributes : {
    verticle: string;
    category: string;
    role: string;
  }[];
  linkedInUrl?: string;
  writeUp?: string;
  station?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  photo?: {
    fileId: string;
    name: string;
    url: string;
    thumbnailUrl: string;
    userId: string;
  };
};
