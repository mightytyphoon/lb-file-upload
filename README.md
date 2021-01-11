# LB File Upload

https://github.com/strongloop/loopback-next/blob/master/examples/file-transfer/src/application.ts

il faudrait utiliser multer en mode memorystorage au lieu du mode disque : https://stackoverflow.com/questions/49099744/nodejs-multer-diskstorage-to-delete-file-after-saving-to-disk

puis récupérer le buffer et le convertir en webpm puis l'écrire dans storage/slides/image.webp ou storage/collections/01/image.webp par exemple
https://www.npmjs.com/package/cwebp


https://github.com/dokku/dokku/blob/master/docs/advanced-usage/persistent-storage.md
PENSER A METTRE EN PLACE STORAGE COTE SERVEUR => LINKER LE DOSSIER DOKKU YPERLAB STORAGE A UN STORAGE PHYSIQUE
AJOUTER UN DISQUE AVEC DOKKU OU FAIRE UN LINK DU DOSSIER STORAGE DANS DOKKU YPERLAB SOUS UNIX
