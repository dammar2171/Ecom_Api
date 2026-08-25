import * as z from 'zod';
import { emailRegex,passwordRegex } from '../../constants/regex.js';

const addressSchema = z.object({
  city:z.string({error:"City is required."}).trim(),
  province:z.string().trim().optional(),
  tole:z.string().trim().optional()
})

const registerSchema = z.object({
  name:z.string({error:"Name is required."}).trim().check(z.minLength(3,{error:"Name too small."}),z.maxLength(50,{error:"Name too long"})),
  
  email:z.email({error:(email)=> email.input ? "Invalid emaiaddress" : "Email is required" }).trim().check(z.minLength(6),z.maxLength(100),z.regex(emailRegex)),

  password:z.string({error:"Password is required"}).trim().check(z.minLength(6),z.maxLength(100),z.regex(passwordRegex,{error:"Password must container upper,lower,special symbol anmust be greater than 6 character"})),

  phone:z.string({error:"Phone is required"}).trim().check(z.minLength(6),z.maxLength(15)),

  address:addressSchema
})

const loginSchema = z.object({
  email:z.email().trim().check(z.minLength(6),z.maxLength(100),z.regex(emailRegex)).optional(),

  phone:z.string().trim().check(z.minLength(6),z.maxLength(15)).optional(),

  password:z.string({error:"Password is required"}).trim().check(z.minLength(6),z.maxLength(100),z.regex(passwordRegex,{error:"Password must container upper,lower,special symbol anmust be greater than 6 character"})),
})

export {registerSchema,loginSchema};