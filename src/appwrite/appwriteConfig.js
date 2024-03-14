import {Client, Account, Databases} from 'appwrite'

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("65f047207740b7a7ed80")

export const account = new Account(client)

//Database

export const databases = new Databases(client, "65f0478778933fe8a0ab")