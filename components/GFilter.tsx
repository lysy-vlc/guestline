import { FunctionComponent } from 'react'
import { IconButton } from 'rsuite'
import styles from '../styles/GFilter.module.scss'
import { Plus, Minus } from '@rsuite/icons'

type Props = {
  name: string,
  value: number,
  onChange: (newValue: number) =>  any
}

const GFilter: FunctionComponent<Props> = ({ name, value, onChange }) => {
  const subtractValue = (): void => {
    if (value) {
      onChange(value - 1)
    }
  }


  return (
    <div className={styles['filter-container']}>
      <strong>
        { name }:
      </strong>

      <IconButton
        circle
        size="xs"
        appearance="subtle"
        icon={<Minus/>}
        onClick={subtractValue}
      />

      <strong className={styles.value}>
        { value }
      </strong>

      <IconButton
        circle
        size="xs"
        appearance="subtle"
        icon={<Plus/>}
        onClick={() => onChange(value + 1)}
      />
    </div>
  )
}

export default GFilter