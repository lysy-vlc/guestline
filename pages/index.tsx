import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Filter, Filters } from '../types/types'
import { Col, Container, Rate, Row } from 'rsuite'
import GHeader from '../components/GHeader'
import { FilterTypes } from '../types/enums'
import GFilter from '../components/GFilter'
import styles from '../styles/Home.module.scss'
import Offer from '../components/Offer'

const Home: NextPage = () => {
  const [ hotels, setHotels ] = useState<any[]>([])
  const [ hotelsFiltered, setHotelsFiltered ] = useState<any[]>([])

  const [ filters, setFilters ] = useState<Filters>({
    rate: 0,
    childrenCount: 0,
    adultsCount: 0
  })

  const fetchHotels = async (): Promise<any[]> => {
    try {
      const response = await fetch(process.env.apiBase + 'hotels?collection-id=OBMNG')
      const data: [] = await response.json()

      if (data) {
        setHotels(data)

        await fetchRooms(data)
        return data
      }

      return []
    } catch (e) {
      console.error(e)
      return []
    }
  }

  const fetchRooms = async (hotelsAsParam: any[]): Promise<void> => {
    try {
      const data = await Promise.all(hotelsAsParam.map(async h => {
        const resp = await fetch(process.env.apiBase + '/roomRates/OBMNG/' + h.id)
        return resp.json()
      }));

      if (data) {
        const hotelsWithRoomsPopulated = hotelsAsParam.map((h, i) => {
          return {
            ...h,
            rooms: data[i]?.rooms
          }
        })

        setHotels(hotelsWithRoomsPopulated)

        setHotelsFiltered(hotelsWithRoomsPopulated)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const applyFilters = (filter: Filter): void => {
    const updatedFilters = {
      ...filters,
      ...filter
    }

    let filtered = hotels.filter(h => Number(h.starRating) >= Number(updatedFilters.rate))

    filtered = filtered.filter(f => {
      return f.rooms.some((r: any) => {

        return Number(r.occupancy.maxAdults) >= Number(updatedFilters.adultsCount)
          && Number(r.occupancy.maxChildren) >= Number(updatedFilters.childrenCount)
      })
    })

    setHotelsFiltered(filtered)
  }

  const handleFilterChange = (filterType: FilterTypes, filterValue: number): void => {
    setFilters({
      ...filters,
      [filterType]: filterValue
    })

    applyFilters({ [filterType]: filterValue} )
  }

  useEffect(() => {
    fetchHotels().then(hotelsAsParam => {
      fetchRooms(hotelsAsParam).catch(e => console.log(e))
    }).catch(e => console.log(e))

  }, [])

  return (
    <Container>
      <GHeader
        imagePath="https://dummyimage.com/1500x300.jpg"
        height="300px"
        imageDescription="header description"
      />

      <div className={styles['filters-container']}>
        <div className={styles.filters}>
          <Rate
            max={5}
            value={filters.rate}
            onChange={(value) => handleFilterChange(FilterTypes.rate, value)}
            size="xs"
          />

          <div className={styles['middle-filter']}>
            <GFilter
              name="Adults"
              value={filters.adultsCount}
              onChange={(newValue) => handleFilterChange(FilterTypes.adultsCount, newValue)}
            />
          </div>

          <GFilter
            name="Children"
            value={filters.childrenCount}
            onChange={(newValue) => handleFilterChange(FilterTypes.childrenCount, newValue)}
          />
        </div>
      </div>

      <Row>
        <Col xsHidden lg={4}/>

        <Col xs={24} lg={16}>
          {
            hotelsFiltered.map(h => (
              <Offer
                key={h.id}
                name={h.name}
                images={h.images}
                address1={h.address1}
                address2={h.address2}
                rate={h.starRating}
                rooms={h.rooms}
              />
            ))
          }
        </Col>

        <Col xsHidden lg={4}/>
      </Row>
    </Container>
  )
}

export default Home
