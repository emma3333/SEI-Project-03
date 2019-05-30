import React from 'react'
import axios from 'axios'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Promise from 'bluebird'
import Card from './Card'
import { Link } from 'react-router-dom'

const mapboxToken = process.env.MAPBOX_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapboxToken
})

class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pool: null,
      pools: []
    }
  }

  getPools() {
    Promise.props({
      pool: axios.get(`/api/pools/${this.props.match.params.id}`).then(res => res.data),
      pools: axios.get('/api/pools').then(res => res.data)
    })
      .then(data => this.setState(data))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  componentDidMount() {
    this.getPools()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getPools()
    }
  }

  render() {
    if(!this.state.pool) return null

    const { name, description, type, address, lng, lat, region, heated, country, user, image, comments } = this.state.pool

    const nearby = this.state.pools.filter(pool => pool.region === this.state.pool.region && pool.name !== this.state.pool.name)

    console.log(comments)

    return (

      <section className="is-fullheight-with-navbar">

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
          <Marker
            coordinates={[lng, lat]}
            anchor="bottom">
            <img src={'../../assets/marker.png'}/>
          </Marker>
        </Map>

        {/* POOL INFO ===================================================*/}
        <div className="section">
          <div className="columns is-multiline">

            <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
              <figure className="image">
                <img src={image} alt={name} />
              </figure>


              {/* COMMENTS ==================================================*/}
              <div className="comment-heading">
                <h2 className="subtitle is-6">Comments</h2>
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img src="https://candobristol.co.uk/img/profile-pic.svg" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="field">
                      <p className="control">
                        <textarea className="textarea" name="content" placeholder="Add a comment..." onChange= {this.handleChange}></textarea>
                      </p>
                    </div>
                    <nav className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <a className="button is-dark is-small" onClick={this.handleComment}>Submit</a>
                        </div>
                      </div>
                    </nav>
                  </div>
                </article>
                <div>user comment:
                  {comments.map(comment =>
                    <p key={comment.id}>{comment.content}</p>

                  )}
                </div>



              </div>


            </div>


            <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
              <h2 className="subtitle is-6 pool-heading">{name}</h2>
              <p>Description: {description}</p>
              <p>Type: {type}</p>
              <p>Heated: {heated}</p>
              <p>Address: {address}</p>
              <p>Region: {region}</p>
              <p>Country: {country}</p>
            </div>

            {/* POOLS NEARBY ================================================*/}

            <div className="column is-one-fifth-desktop is-half-tablet is-full-mobile">
              <div className="nearby-pools">

                <h2 className="subtitle is-6">Nearby pools</h2>

                <div>
                  {nearby.map(pool =>
                    <div className="nearby-pools" key={pool.id}>
                      <Link to={`/pools/${pool.id}`}>
                        <Card {...pool} />
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>


      </section>
    )

  }

}

export default Show
