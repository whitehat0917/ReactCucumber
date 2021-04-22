import { v4 } from 'uuid';
import { AnyAction } from 'redux';

const HANDLE_CLOSE = 'HANDLE_CLOSE';
const HANDLE_DROP = 'HANDLE_DROP';
const HANDLE_REMOVE = 'HANDLE_REMOVE';
const HANDLE_SUBMIT = 'HANDLE_SUBMIT';
const UPLOAD_VIA = 'UPLOAD_VIA';

interface IArtworkFile extends File {
    id: string
};

export type TInitialState = {
    files: IArtworkFile[],
    modalIsOpen: boolean,
};

export const reducer = (state: TInitialState, action: AnyAction) => {
    switch(action.type) {
        case HANDLE_CLOSE:
            return {
                ...state,
                modalIsOpen: action.payload.isOpen
            };
        case HANDLE_DROP:
            return {
                ...state,
                files: [
                    ...state.files,
                    ...action.payload.files
                ],
            };
        case HANDLE_REMOVE:
            return {
                ...state,
                files: state.files.filter(file => file.id !== action.payload.fileId),
            };
        default:
            return state;
    }
}

export const uploaderActions = {
    onClose(history, isOpen) {
        history.goBack();
    
        return {
            type: HANDLE_CLOSE,
            payload: {
                isOpen
            }
        };
    },
    onDrop(files) {
        const updatedFiles = files.map(file => ({
            ...file,
            id: v4(),
        }));
    
        return {
            type: HANDLE_DROP,
            payload: {
                files: updatedFiles
            }
        };
    },
    onRemove(fileId) {
        return {
            type: HANDLE_REMOVE,
            payload: {
                fileId
            }
        };
    },
    onSubmit(event) {
        event.preventDefault();

        return {
            type: HANDLE_SUBMIT,
            payload: {
                event
            }
        };
    },
    uploadVia(source) {
        return {
            type: UPLOAD_VIA,
            payload: { source }
        };
    },
}; 