// Uncomment these imports to begin using these cool features!

import { BindingKey, inject } from "@loopback/core";
import { executeExpressRequestHandler, post, Request, requestBody, RestBindings } from "@loopback/rest";
import {RequestHandler , Response} from 'express-serve-static-core';
import { IncomingForm } from 'formidable';
import { readdirSync, readFile, write, writeFile, writeFileSync } from "fs";
import path from 'path';
// import * as webp from 'webp-converter';


// import {inject} from '@loopback/core';

import {FileUploadHandler, FILE_UPLOAD_SERVICE} from '../application';

// 1. get the files
// 2. put them on a 


export class FileUploadController {
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler
  ) {}
  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file() request: any,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    ): Promise<object> {
/*       return new Promise<object>((resolve, reject) => {
      var form = new IncomingForm();
      form.parse(request);
      form.on('file' , async (name: string, file: File) => {
        console.log(name);
        console.log(file.name);
        console.log(file.type);
        const dest = './' + file.name;
        writeFileSync(dest , Buffer.from(await file.arrayBuffer()));
/*         writeFile(dest , Buffer.from(file) , (err) => {
          if(err) {
            console.log(err);
          }
          console.log('file success')
        }) 
      }); 
      }); */


    return new Promise<object>((resolve, reject) => {
      // console.log(Object.keys(request))
      this.handler(request , response , (err: unknown) => {
        if(err) reject(err)
        else {
          // console.log(readdirSync(path.join(__dirname, '../.temp') , {}));
          const response = FileUploadController.getFilesAndFields(request)
          resolve(response);
          setTimeout(() => {
            for(const file of <any[]>response.files) {
              readFile(path.join(__dirname, '../.temp/' + file.originalname) , (err , data) => {
                if(err) {
                  console.log(err);
                } else {
                  console.log('success')

                }
              })
            }
          } , 5000);

          
          // console.log(Object.keys(request.files));
        }
      })
      // executeExpressRequestHandler()
      //console.log(request);
    });
  }

  private static getFilesAndFields(request: any) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return {files, fields: request.body};
  }
}
