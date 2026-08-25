import * as z from "zod"

const productSchema = z.object({
  name:z.string({error: "Product name is required."}).check(z.minLength(3,{error:"Name too small"}),z.maxLength(50,{error:"Name too long"})).trim(),

  brand:z.string({error:"Brand is required."}).trim(),

  category:z.string({error:"Category is required."}).trim(),

  discription:z.string().trim().optional(),

  price:z.string({error:(data)=> !data.input ? "Price is required." : "Price must be in number.",}).min(1,{error: "Price must be greater than 0."}).max(99999999),

  stock:z.number().optional(),

  imageUrl:z.array(z.string().trim()).optional(),
})

export {productSchema};