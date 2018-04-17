//@flow
import styled from 'styled-components'

export default styled.div`
  border-radius: 3px;
  margin: 0.25rem;
  box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  height: 300px;
  position: relative;
  overflow: hidden;
`
export const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
`
export const CardTitle = styled.h3`
  margin: 1rem;
  color: white;
  font-size: 2rem;
  position: absolute;
  bottom: 0px;
  right: 0px;
  text-shadow: 0 0 9px rgba(0, 0, 0, 0.5);
  font-weight: 200;
`
