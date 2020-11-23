import {
	POST_PICTURE_SUCCEEDED,
	PUT_PICTURE_SUCCEEDED,
} from './constants'

const defaultState = {pictures: []}
export default (state=defaultState, {type, payload}) => {
	switch (type) {
		case POST_PICTURE_SUCCEEDED:
			let pictures = state.pictures
			const pictureData = {
				id: state.pictures.length + 1,
				src: payload,
				memeText: '',
				captionText: ''
			}
			const pictureExists = state.pictures.find(pic => pic.src === payload)
			pictures = pictureExists ? pictures : [...state.pictures, pictureData]

			return {
				...state,
				pictures
			}

		case PUT_PICTURE_SUCCEEDED:
			const pictureId = state.pictures.findIndex(pic => pic.id === payload.id)
			const updatedPictures = [...state.pictures]
			updatedPictures.splice(pictureId, 1, payload)

			return {
				...state,
				pictures: updatedPictures
			}

		default:
		// debugger
	      return state
  	}
}