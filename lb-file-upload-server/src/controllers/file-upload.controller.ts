// Uncomment these imports to begin using these cool features!

import { BindingKey, inject } from "@loopback/core";
import { executeExpressRequestHandler, post, Request, requestBody, RestBindings } from "@loopback/rest";
import {RequestHandler , Response} from 'express-serve-static-core';

export const FILE_UPLOAD_SERVICE = BindingKey.create<RequestHandler>(
  'services.FileUpload',
);

// import {inject} from '@loopback/core';


export class FileUploadController {
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: RequestHandler
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
    return new Promise<object>((resolve, reject) => {
      this.handler(request , response , () => {
        console.log(Object.keys(request));
      })
      // executeExpressRequestHandler()
      //console.log(request);
    });
  }
}
