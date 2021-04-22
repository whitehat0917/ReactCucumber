export const MIME_EXTENSIONS_MAP = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/tiff': 'tiff',
    'image/tif': 'tiff',
};

 // if (fileObject.source === 'dropbox' || fileObject.source === 'gdrive') {
//     const imageFile = yield call(downloadImage, fileObject.file.url, fileObject.file.name, fileObject);
//     fileObject = {
//         file: imageFile.file,
//         ...imageFile.metadata,
//     };
// }

const downloadImage = (url, name, id, fileMeta) => new Promise((resolve, reject) => {
    fetch(url, { method: 'GET' })
        .then((response) => {
            if (response.ok) {
                return response.blob();
            }
            const error = new Error(`${response.status} ${response.statusText}`);
            // error.response = response;
            throw error;
        })
        .then((blob) => {
            const ext = MIME_EXTENSIONS_MAP[blob.type];
            if (!ext) {
                reject(new Error(`Unsupported image type: ${blob.type}`));
            }
                const blobMeta = { type: blob.type };
                const file = new File([blob], name ? `${name}.${ext}` : `artwork-${id}.${ext}`, blobMeta);

            if (fileMeta && fileMeta.image_original_width) { // we already know dimensions
                resolve({
                    file,
                    metadata: {
                    ...blobMeta,
                    image_original_width: fileMeta.image_original_width,
                    image_original_height: fileMeta.image_original_height,
                    },
                });
            } if (blob.type === 'image/tiff') {
            // don't compute dimensions because it requires Tiff.js to be included which is too heavy
            resolve({ file, metadata: blobMeta });
            } else {

                // getImageDimensionsFromBlob(blob).then((dimensions) => {
                //     const metadata = {
                //     ...blobMeta,
                //     image_original_width: dimensions.width,
                //     image_original_height: dimensions.height,
                //     };
                //     resolve({ file, metadata });
                // });
            }
        })
        .catch((err) => { reject(err); });
});

function* watchUploadViaService () {

}

export default watchUploadViaService;