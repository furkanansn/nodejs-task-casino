import { Response } from "express";
import CustomJson from "./json";

type Send<T = Response> = (body?: CustomJson) => T;

interface IResponse extends Response {
  json: Send<this>;
}
export default IResponse;
