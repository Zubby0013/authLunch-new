import { HTTP } from "./enums"


export interface iError{
    name: string
    message: string
    status: HTTP
    success: boolean
};

export interface iUser{
    token: string
    email: string
    password: string
    schoolName: string
    status: string
    schoolCode: string
    verify: boolean
}