import { Carousel, Col, FlexboxGrid, Panel, Rate, Row } from 'rsuite'
import { FunctionComponent } from 'react'
import styles from '../styles/Offer.module.scss'
import Room from './Room'

type Props = {
  name: string,
  images: Image[],
  address1: string,
  address2: string,
  rate: number,
  rooms: any[]
}

type Image = {
  url: string
}

const Offer: FunctionComponent<Props> = ({
  name,
  images ,
  address1,
  address2,
  rate,
  rooms
}) => {
  return (
    <Panel bordered classPrefix="offer" className="rs-panel-bordered">
      <Row className={styles['hotel-container']}>
        <Col xs={24} sm={24} md={24} lg={5}>
          <Carousel autoplay className="custom-slider">
            {
              images.map((image: Image, i: number) => (
                <img
                  key={i}
                  src={image.url}
                  height="200"
                  alt={name}
                />
              ))
            }
          </Carousel>
        </Col>

        <Col xs={24} sm={24} md={24} lg={15}>
          <div className={styles.addresses}>
            <h1>{name}</h1>
            <h4>{address1}</h4>
            <h4>{address2}</h4>
          </div>
        </Col>

        <Col lg={4}>
          <FlexboxGrid justify="end">
            <Rate
              max={5}
              value={rate}
              size="xs"
            />
          </FlexboxGrid>
        </Col>
      </Row>

      {
        rooms.map(r => (
          <Room
            key={r.name}
            name={r.name}
            adultsCount={r.occupancy.maxAdults}
            childrenCount={r.occupancy.maxChildren}
            description={r.longDescription}
          />
        ))
      }
    </Panel>
  )
}

export default Offer
