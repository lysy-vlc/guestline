import { FunctionComponent } from 'react'
import styles from '../styles/Room.module.scss'
import { Col, Panel, Row } from 'rsuite'

type Props = {
  name: string,
  adultsCount: number,
  childrenCount: number,
  description: string
}
const Room: FunctionComponent<Props> = ({
  name,
  adultsCount,
  childrenCount,
  description
}) => (
  <Panel className={styles.room}>
    <Row>
      <Col xs={24} sm={24} md={24} lg={5}>
        <h1>{ name }</h1>
        <h4>Adults: { adultsCount }</h4>
        <h4>Children: { childrenCount }</h4>
      </Col>

      <Col xs={24} sm={24} md={24} lg={19}>
        { description }
      </Col>
    </Row>
  </Panel>
)

export default Room