// @flow
import React from 'react'
import styled, {keyframes} from 'styled-components'
import Dip from '../../src'
import ScrollToTop from './ScrollToTop'
import {withRouter} from 'react-router-dom'

const fadeIn = keyframes`
  from {
    opacity:0;
  }
`

const Container = styled.section`
  display: flex;
  align-items: left;
  flex-direction: column;
`

const Image = styled.img`
  width: 100vw;
  height: 70vh;
  object-fit: cover;
`

const Title = styled(Dip)`
  font-size: 4rem;
  font-weight: 100;
  margin: 1rem;
`

const Dl = styled.dl`
  margin: 1rem;
  animation: ${fadeIn} 0.2s both;
`

const Dd = styled.dd`
  margin: 0 0 0.5rem;
  font-weight: 500;
  color: hsl(0, 0%, 36%);
`

const Link = styled.a`
  color: white;
  margin: 0 1rem 0.5rem;
  background: black;
  animation: ${fadeIn} 0.2s both;

  &:hover {
    background: rgb(189, 16, 224);
  }
`

const Detail = ({index, images, history}) => {
  const image = images[index]
  return (
    <Container onClick={() => history.goBack()}>
      <Dip
        dipId={`image-${image.id}`}
        render={({ref, ...rest}) => (
          <Image innerRef={ref} {...rest} src={image.previewImage} />
        )}
      />
      <Title dipId={`title-${image.id}`} optInCssStyles={['color']}>
        {image.author}
      </Title>
      <Dl>
        <dt>format</dt>
        <Dd>{image.format}</Dd>
        <dt>size</dt>
        <Dd>
          {image.width}px x {image.height}px
        </Dd>
      </Dl>
      <Link href={image.author_url}>{image.author_url}</Link>
      <Link href={image.post_url}>{image.post_url}</Link>
    </Container>
  )
}

export default withRouter(Detail)
