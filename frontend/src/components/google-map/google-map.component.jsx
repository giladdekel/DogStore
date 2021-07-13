import React from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
  FaAnchor,
} from "react-google-maps";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./google-map.styles.scss";
const MyGoogleMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 32.8068173, lng: 35.0017155 }}
    >
      <Marker
        onClick={props.onToggleOpen}
        position={{ lat: 32.8057713, lng: 34.9886692 }}
      >
        {props.isOpen && (
          <InfoWindow onClick={props.onToggleOpen}>
            <div>
              {/* <FaAnchor /> */}
              <h1>Dog Best Friends</h1>
              <h5>The best dogs products</h5>
              <img
                src="https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_960_720.jpg"
                height="400px"
                width="600px "
              />
              <div
                className="col-md-6 mt-3 contact-widget-section2 wow animated fadeInLeft"
                data-wow-delay=".2s"
              >
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using Content.
                </p>
                <div className="find-widget">
                  Company: <a href="">Dog best friends</a>
                </div>
                <div className="find-widget">
                  Address: <a href="#"> Moskovich 19,Rehovot </a>
                </div>
                <div className="find-widget">
                  Phone: <a href="#"> 08-111-1111</a>
                </div>
                <div className="find-widget">
                  Website: <a href="https://uny.ro">www.dogFrienfs.com</a>
                </div>
                <div className="find-widget">
                  Program: <a href="#">Sun to Sat: 09:30 AM - 10.30 PM</a>
                </div>
              </div>

              <Link to="/">
                <button type="button" class="btn btn-info visit-us-google-map">
                  Visit Us
                </button>
              </Link>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ))
);

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onToggleOpen = () => {
    let isOpen = this.state.isOpen;
    isOpen = !isOpen;
    this.setState({ isOpen });
  };
  render() {
    return (
      <div>
        <MyGoogleMap
          loadingElement={<div>Loading....</div>}
          containerElement={
            <div style={{ height: "80%" }} className="map"></div>
          }
          mapElement={
            <div style={{ height: "800px" }} className="inner-map"></div>
          }
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB0AEdl1PA2XZYKX2g0vHd99yDpoc1PAAk&v=3.exp&libraries=geometry,drawing,places"
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          onToggleOpen={this.onToggleOpen}
          isOpen={this.state.isOpen}
          // isMarkerShown
          withScriptjs
          // isMarkerShown={false}
        />
      </div>
    );
  }
}
