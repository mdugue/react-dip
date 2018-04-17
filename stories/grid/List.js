//@flow
import React from 'react'
import Dip from '../../src'
import Card, {CardImage, CardTitle} from './Card'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const List = ({images}) => (
  <ListContainer>
    {images &&
      images.map((image, index) => (
        <Link to={`/contact/${index}`} key={image.previewImage}>
          <Card>
            <Dip
              dipId={`image-${image.id}`}
              render={({ref, ...rest}) => (
                <CardImage
                  innerRef={ref}
                  {...rest}
                  alt={image.author}
                  src={image.previewImage}
                />
              )}
            />

            <Dip
              dipId={`title-${image.id}`}
              optInCssStyles={['color']}
              render={({ref, ...rest}) => (
                <CardTitle innerRef={ref} {...rest}>
                  {image.author}
                </CardTitle>
              )}
            />
          </Card>
        </Link>
      ))}
  </ListContainer>
)

export default List
