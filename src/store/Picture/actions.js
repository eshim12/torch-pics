import {
	POST_PICTURE_REQUESTED,
	POST_PICTURE_SUCCEEDED,
	POST_PICTURE_FAILED,
	PUT_PICTURE_REQUESTED,
	PUT_PICTURE_SUCCEEDED,
	PUT_PICTURE_FAILED
} from './constants'

export const postPictureRequested = () => ({
	type: POST_PICTURE_REQUESTED
})

export const postPictureSucceeded = (payload) => ({
	type: POST_PICTURE_SUCCEEDED,
	payload
})

export const postPictureFailed = () => ({
	type: POST_PICTURE_FAILED
})

export const putPictureRequested = () => ({
	type: PUT_PICTURE_REQUESTED
})

export const putPictureSucceeded = (payload) => ({
	type: PUT_PICTURE_SUCCEEDED,
	payload
})

export const putPictureFailed = () => ({
	type: PUT_PICTURE_FAILED
})

export const postPicture = (img) => dispatch => {
	dispatch(postPictureRequested())
	dispatch(postPictureSucceeded(img))
}

export const putPicture = (picture) => dispatch => {
	dispatch(putPictureRequested())
	dispatch(putPictureSucceeded(picture))
}