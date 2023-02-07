import { validate } from "class-validator";
import { Request } from "express";
import db from "../core/db";
import CustomJson from "../interfaces/json";
import bcrypt from "bcryptjs";
import IUser from "../interfaces/user";
import jwt from "../core/jwt";
import validation_message from "../core/validation_message";
import { LoginDto } from "../dto/loginDto";
import { RegisterDto } from "../dto/registerDto";

const register = async (props: any): Promise<CustomJson> => {
    const { name, email, password } = props.body;
    let dto = new RegisterDto();
    dto.name = name;
    dto.email = email;
    dto.password = password;
    let validation = await validate(dto);
    if (validation.length > 0) {
      return {
        success: false,
        data: null,
        errorMessage: validation_message(validation),
      };
    }
  
    let data = await db(
      `SELECT * FROM test.users WHERE email = $1
      ORDER BY id ASC`,
      [dto.email]
    );
    if (data[0]) {
      return {
        success: false,
        data: null,
        errorMessage: "Email already taken",
      };
    }
    dto.password = await bcrypt.hash(dto.password, 10);
    data = await db(
      `INSERT INTO test.users(name,email,password,created_at) VALUES($1,$2,$3,$4) RETURNING *`,
      [dto.name, dto.email, dto.password, new Date()]
    );
  
    return {
      success: true,
      data: data,
      errorMessage: null,
    };
  };
  const login = async (props: any): Promise<CustomJson> => {
    const { email, password } = props.body;
    let dto = new LoginDto();
    dto.email = (email as string).toLowerCase().trim();
  
    let validation = await validate(dto);
    if (validation.length > 0) {
      return {
        success: false,
        data: null,
        errorMessage: validation_message(validation),
      };
    }
  
    let data: any = await db(
      `SELECT * FROM test.users WHERE email = $1
        ORDER BY id ASC`,
      [dto.email]
    );
    data = data[0];
    if (!data) {
      return {
        success: false,
        data: null,
        errorMessage: "Wrong credentials",
      };
    }
    const match = await bcrypt.compare(password, data.password);
    let user: IUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      jwt: jwt(data.id),
    };
    if (match) {
      return {
        success: true,
        data: user,
        errorMessage: null,
      };
    }
    return {
      success: false,
      data: null,
      errorMessage: "Wrong credentials",
    };
  };
  export default {
    register,
    login
  }