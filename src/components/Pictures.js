import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { postPicture, putPicture } from '../store/Picture/actions'
import { get } from 'lodash'

import {Container, Button, Grid, Header, Image, Input,  Modal} from 'semantic-ui-react'

const Pictures = ({pictures, postPicture, putPicture}) => {
	const [open, setOpen] = useState(false)
	const [currentModalImage, setCurrentModalImage] = useState(null)
	const [currentImageIdx, setCurrentImageIdx] = useState(null)
	const [memeText, setMemeText] = useState(null)
	const [captionText, setCaptionText] = useState(null)

	useEffect(() => {
		for (var i = 1; i < 20; i++) {
			const num = i.toString().length < 2 ? `0${i}` : i
			postPicture(`https://torchimages-dev.imgix.net/handson-images/${num}.jpg`)
		}
	},[postPicture])

	const onThumbnailClick = (pic, idx) => {
		setOpen(true)
		setModalView(pic, idx)
	}

	const onChangeImageClick = (next=false) => {
		if (next) {
			const idx = currentImageIdx + 1
			setModalView(pictures[idx].src, idx)
		} else {
			const idx = currentImageIdx - 1
			setModalView(pictures[idx].src, idx)
		}
	}

	const onTextChange = (e, meme=false) => {
		const text = e.target.value
		if (meme) {
			setMemeText(text)
		} else {
			setCaptionText(text)
		}
	}

	const setModalView = (pic, idx) => {
		const image = pictures[idx]

		setCurrentModalImage(pic)
		setCurrentImageIdx(idx)
		setMemeText(image.memeText)
		setCaptionText(image.captionText)
	}

	const onSaveClick = () => {
		const picture = pictures[currentImageIdx]
		picture.memeText = memeText
		picture.captionText = captionText
		putPicture(picture)
	}
	
	return (
		<Container>
			<Header as='h1'>Nick Cage MemeMaker</Header>
			<Header textAlign='center' as='h3'>click a nick</Header>
			<Grid columns={4}>
				{pictures.map((pic, idx) => <Grid.Column mobile={8} computer={4} key={idx}>
					<Image centered rounded bordered onClick={() => onThumbnailClick(pic.src, idx)} src={pic.src+'?h=50&fit=crop'}/>
					</Grid.Column>)}
			</Grid>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
			>
				<Modal.Content image>
					<Image centered src={currentModalImage + '?h=500&fit=crop'}/>
					<div className='meme-text'>{memeText}</div>
					
				</Modal.Content>
				<Modal.Content><p>{captionText}</p></Modal.Content>
				<Modal.Content>
					<Input onChange={(e) => onTextChange(e, true)} placeholder='Add meme text here!' value={memeText}/>
					<br />
					<br />
					<Input onChange={(e) => onTextChange(e)} placeholder='Add caption text here!' value={captionText}/>
					<Button primary floated="right" onClick={onSaveClick}>
			          Save Changes
			        </Button>
				</Modal.Content>
				<Modal.Actions>
			        <Button floated="left" color='black' onClick={() => onChangeImageClick()} disabled={currentImageIdx === 0}>
			          BackNick
			        </Button>
			        <Button color='black' onClick={() => onChangeImageClick(true)} disabled={currentImageIdx === pictures.length - 1}>
			          NextNick
			        </Button>  
				</Modal.Actions>
			</Modal>
		</Container>
	)
}

const mapStateToProps = (state) => {
	const pictures = get(state, 'picture.pictures', [])

	return {
		pictures
	}
}

const mapDispatchToProps = dispatch => ({
	postPicture: (num) => dispatch(postPicture(num)),
	putPicture: (picture) => dispatch(putPicture(picture))
})

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)