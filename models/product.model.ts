import mongoose, { Schema, Model, Document } from 'mongoose';

type ProductDocument = Document & {
  userID:string;
  productID:string;
  image:Array<Object>;
  name: string;
  price:number;
  description:string;
  category:string;
  createdAt:Date;
};

type ProductInput = {
  userID:ProductDocument['userID']
  productID : ProductDocument['productID'];
  image : ProductDocument['image'];
  name: ProductDocument['name'];
  price:ProductDocument['price']
  description: ProductDocument['description']
  category: ProductDocument['category']
  createdAt:ProductDocument['createdAt']
};

const productsSchema = new Schema(
  {
    userID:{
      type:Schema.Types.String,
      required:true,
    },
        productID:{
          type:Schema.Types.String,
          required:true,
          unique:true,      
        },
        image:{
          type:Schema.Types.Array,
          required:true,
        },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    price:{
      type:Schema.Types.String,
      required:true
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: Schema.Types.String,
      required: true,
    },
    createdAt:{
      type:Schema.Types.Date,
      required:true,
      default:new Date()
    }
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productsSchema);
  
export { Product, ProductInput, ProductDocument };
