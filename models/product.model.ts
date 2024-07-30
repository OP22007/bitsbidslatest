import mongoose, { Schema, Model, Document } from 'mongoose';
type Bids = {
  bidID:string;
  bidderID:string;
  price:number;
  time:Date;
}
const bidsSchema = new Schema({
  bidID:{
    type:Schema.Types.String,
    required:true,
  },
  bidderID:{
    type:Schema.Types.String,
    required:true
  },
  price:{
    type:Schema.Types.Number,
    required:true
  },
  time:{
    type:Schema.Types.Date,
    default:new Date(),
    required:true
  }
})

type ProductDocument = Document & {
  userID:string;
  productID:string;
  image:Array<Object>;
  name: string;
  initialPrice:number;
  price:number;
  description:string;
  category:string;
  createdAt:Date;
  bids:Bids[];
};

type ProductInput = {
  userID:ProductDocument['userID']
  productID : ProductDocument['productID'];
  image : ProductDocument['image'];
  name: ProductDocument['name'];
  initialPrice:ProductDocument['initialPrice']
  price:ProductDocument['price']
  description: ProductDocument['description']
  category: ProductDocument['category']
  createdAt:ProductDocument['createdAt']
  bids:ProductDocument['bids']
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
    initialPrice:{
      type:Schema.Types.Number,
      required:true
    },
    price:{
      type:Schema.Types.Number,
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
    },
    bids:[bidsSchema],
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productsSchema);
  
export { Product, type ProductInput, type ProductDocument };
  