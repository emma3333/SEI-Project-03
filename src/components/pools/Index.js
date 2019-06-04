import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import qs from 'query-string'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import regions from '../../lib/regions'

const mapboxToken = process.env.MAPBOX_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapboxToken
})

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.props.match.query = qs.parse(this.props.location.search)
    this.handleChange = this.handleChange.bind(this)
    this.state={
      pools: [],
      list: '',
      searchText: '',
      region: this.props.match.query.region || ''
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  getData(){
    axios.get('/api/pools', {
      params: this.props.match.query
    })
      .then(res => this.setState({ pools: res.data }))
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getData()
    }
  }

  searchPool() {
    const search = new RegExp(this.state.searchText, 'i')
    const region = new RegExp(this.state.region, 'i')
    return this.state.pools.filter(pool => {
      return (search.test(pool.name) || search.test(pool.address || search.test(pool.region) || search.test(pool.description))) || search.test(pool.region)
    })
  }

  render() {
    if(!this.state.pools) return null
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="columns is-multiline">

          {/* MAP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          <Map
            style="mapbox://styles/mapbox/streets-v10"
            zoom={[10]}
            center={{
              lat: 51.527714,
              lng: -0.095843
            }}
            containerStyle={{
              height: '40vh',
              width: '100vw'
            }}>
            {this.state.pools.map(pool =>
              <Marker key={pool.id}
                coordinates={[pool.lng, pool.lat]}
                anchor="bottom">
                <img src={'../../assets/marker.png'}/>
              </Marker>
            )}
          </Map>
        </div>

        <div className="section">
          <div className="container columns is-right">

            {/* SEARCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}

            <div className="control column index-control">
            
              <input
                className="input"
                type="text"
                placeholder="Search..."
                name="searchText"
                onChange={this.handleChange}
              />
            </div>

          </div>

          <div className="columns is-multiline">
            {this.searchPool().map(pool =>
              <div key={pool.id} className="column is-one-quarter-desktop is-one-third-tablet">
                <Link to={`/pools/${pool.id}`}>
                  <Card {...pool} />
                </Link>
              </div>
            )}
          </div>

        </div>

      </section>

    )
  }
}

export default Index
