import { v4 } from 'uuid';

export const handleDrop = (onDrop, fileUploadRequest) => files => {
    // console.log('files -> ', files);

    fileUploadRequest({ files });

    // const filesList = files.map(file => {
    //     return {
    //         id: v4(),
    //         dataUrl: file.dataUrl,
    //         // url: URL.createObjectURL(file.file),
    //         name: file.file.name,
    //         size: file.file.size,
    //         type: file.file.type,
    //         image_original_width: file.image_original_width,
    //         image_original_height: file.image_original_height,
    //     };
    // });

    // const prepearedFiles = files.map(file => {
    //     return {
    //         ...file,
    //         file: URL.createObjectURL(file.file),
    //         id: v4()
    //     };
    // });

    // console.log('filesList -> ', filesList);

    // onDrop({ filesList })
}

export const handleRemove = onRemove => fileId => {
    onRemove({ fileId });
}

// export const handleSubmit = (uploadRequest) => e => {
//     e.preventDefault();

//     uploadRequest({});
// }
