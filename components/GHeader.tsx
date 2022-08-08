import { FunctionComponent } from 'react'
import styles from '../styles/GHeader.module.scss'

type Props = {
  imagePath: string,
  height: string,
  imageDescription: string
}

const GHeader: FunctionComponent<Props> = ({ imagePath, height, imageDescription }) => (
  <div
    style={{ height }}
    className={styles['header-container']}
  >
    <img
      src={imagePath}
      alt={imageDescription}
    />
  </div>
)

export default GHeader