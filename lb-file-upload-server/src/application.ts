import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {diskStorage, Options} from 'multer';
import { RequestHandler } from 'express-serve-static-core';

// import { FILE_UPLOAD_SERVICE } from './controllers/file-upload.controller';

export type FileUploadHandler = RequestHandler;

export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
  'services.FileUpload'
);

export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');

export {ApplicationConfig};

export class LbFileUploadServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

    this.component(RestExplorerComponent);

    // Configure file upload with multer options
    this.configureFileUpload(options.fileStorageDirectory);
    

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  protected configureFileUpload(destination?: string) {
    // Upload files to `dist/.sandbox` by default
  
    destination = destination ?? path.join(__dirname, '../.temp');
    this.bind(STORAGE_DIRECTORY).to(destination);
    const multerOptions: Options = {
      storage: diskStorage({
        destination,
        // Use the original file name as is
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    };
    // Configure the file upload service with multer options
    this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
    // const handler = new RequestHandler(multerOptions);
    // this.bind(FILE_UPLOAD_SERVICE).to();
  }
}
