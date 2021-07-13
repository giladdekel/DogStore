import React from "react";

import "./about.styles.scss";
import ReactPlayer from "react-player";

const AboutPage = () => (
  <>
    <div className="about-page">
      <main role="main">
        {/* Marketing messaging and featurettes
================================================== */}
        {/* Wrap the rest of the page in another container to center all the content. */}
        <div className="container marketing">
          {/* Three columns of text below the carousel */}
          <div className="row">
            <div className="col-lg-4">
              <img
                className="rounded-circle"
                src="https://cdn.pixabay.com/photo/2019/11/18/00/38/dog-4633734_960_720.jpg"
                alt="Generic placeholder image"
                width={140}
                height={140}
              />
              <h2>Gilad Dekel</h2>
              <p>
                Donec sed odio dui. Etiam porta sem malesuada magna mollis
                euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna.
              </p>
              <p>
                <a className="btn btn-secondary" href="#" role="button">
                  View details »
                </a>
              </p>
            </div>
            {/* /.col-lg-4 */}
            <div className="col-lg-4">
              <img
                className="rounded-circle"
                src="https://cdn.pixabay.com/photo/2020/03/28/16/03/dog-4977599_960_720.jpg"
                alt="Generic placeholder image"
                width={140}
                height={140}
              />
              <h2>Nala</h2>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cras mattis consectetur purus
                sit amet fermentum. Fusce dapibus, tellus ac cursus commodo,
                tortor mauris condimentum nibh.
              </p>
              <p>
                <a className="btn btn-secondary" href="#" role="button">
                  View details »
                </a>
              </p>
            </div>
            {/* /.col-lg-4 */}
            <div className="col-lg-4">
              <img
                className="rounded-circle"
                src="https://cdn.pixabay.com/photo/2016/11/22/19/41/adorable-1850276_960_720.jpg"
                alt="Generic placeholder image"
                width={140}
                height={140}
              />
              <h2>Kimi</h2>
              <p>
                Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam. Vestibulum id ligula porta felis euismod
                semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
              <p>
                <a className="btn btn-secondary" href="#" role="button">
                  View details »
                </a>
              </p>
            </div>
            {/* /.col-lg-4 */}
          </div>
          {/* /.row */}
          {/* START THE FEATURETTES */}
          <hr className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                We Love Dogs.{" "}
                <span className="text-muted">It'll blow your mind.</span>
              </h2>
              <p className="lead">
                Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                id ligula porta felis euismod semper. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                ac cursus commodo.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="featurette-image img-fluid mx-auto"
                src="https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_960_720.jpg"
                alt="Generic placeholder image"
              />
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading">
                Oh yeah, it's that good.{" "}
                <span className="text-muted">See for yourself.</span>
              </h2>
              <p className="lead">
                Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                id ligula porta felis euismod semper. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                ac cursus commodo.
              </p>
            </div>
            <div className="col-md-5 order-md-1">
              <img
                className="featurette-image img-fluid mx-auto"
                src="https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_960_720.jpg"
                alt="Generic placeholder image"
              />
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                And lastly, this one.{" "}
                <span className="text-muted">Checkmate.</span>
              </h2>
              <p className="lead">
                Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                id ligula porta felis euismod semper. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                ac cursus commodo.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="featurette-image img-fluid mx-auto"
                src="https://cdn.pixabay.com/photo/2015/11/17/13/13/dogue-de-bordeaux-1047521_960_720.jpg"
                alt="Generic placeholder image"
              />
            </div>
          </div>
          <hr className="featurette-divider" />
          {/* /END THE FEATURETTES */}
        </div>
        {/* /.container */}
      </main>
      <div className="youtube-player">
        <ReactPlayer url="https://www.youtube.com/watch?v=euda727WBiA&ab_channel=ViralPress" />{" "}
      </div>{" "}
      <div className="our-team">
        <div>
          <div id="container">
            <div id="heading">
              <h1>OUR TEAM</h1>
            </div>
            <div className="item">
              <div className="front">
                {" "}
                <img
                  id="team1"
                  className="team"
                  src="https://cdn.pixabay.com/photo/2016/10/15/12/01/dog-1742295_960_720.jpg"
                />{" "}
              </div>
              <div className="back">
                <p className="title">Tom Crow</p>
                <p className="job">Interface Designer</p>{" "}
                <a href="#">
                  <i className="fab fa-facebook-square social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-linkedin social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-twitter-square social fa-2x" />
                </a>
              </div>
            </div>
            <div className="item">
              <div className="front">
                {" "}
                <img
                  id="team2"
                  className="team"
                  src="https://cdn.pixabay.com/photo/2017/10/02/21/56/dog-2810484_960_720.jpg"
                />{" "}
              </div>
              <div className="back">
                <p className="title">Tom Crow</p>
                <p className="job">Interface Designer</p>{" "}
                <a href="#">
                  <i className="fab fa-facebook-square social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-linkedin social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-twitter-square social fa-2x" />
                </a>
              </div>
            </div>
            <div className="item">
              <div className="front">
                {" "}
                <img
                  id="team3"
                  className="team"
                  src="https://cdn.pixabay.com/photo/2014/04/05/11/40/dog-316598_960_720.jpg"
                />{" "}
              </div>
              <div className="back">
                <p className="title">Tom Crow</p>
                <p className="job">Interface Designer</p>{" "}
                <a href="#">
                  <i className="fab fa-facebook-square social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-linkedin social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-twitter-square social fa-2x" />
                </a>
              </div>
            </div>
            <div className="item">
              <div className="front">
                {" "}
                <img
                  id="team4"
                  className="team"
                  src="https://cdn.pixabay.com/photo/2015/11/03/12/58/dalmatian-1020790_960_720.jpg"
                />{" "}
              </div>
              <div className="back">
                <p className="title">Tom Crow</p>
                <p className="job">Interface Designer</p>{" "}
                <a href="#">
                  <i className="fab fa-facebook-square social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-linkedin social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-twitter-square social fa-2x" />
                </a>
              </div>
            </div>
            <div className="item">
              <div className="front">
                {" "}
                <img
                  id="team5"
                  className="team"
                  src="https://cdn.pixabay.com/photo/2016/02/11/17/00/dog-1194087_960_720.jpg"
                />{" "}
              </div>
              <div className="back">
                <p className="title">Tom Crow</p>
                <p className="job">Interface Designer</p>{" "}
                <a href="#">
                  <i className="fab fa-facebook-square social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-linkedin social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-twitter-square social fa-2x" />
                </a>
              </div>
            </div>
            <div className="item">
              <div className="front">
                {" "}
                <img
                  id="team6"
                  className="team"
                  src="https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_960_720.jpg"
                />{" "}
              </div>
              <div className="back">
                <p className="title">Tom Crow</p>
                <p className="job">Interface Designer</p>{" "}
                <a href="#">
                  <i className="fab fa-facebook-square social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-linkedin social fa-2x" />
                </a>{" "}
                <a href="#">
                  <i className="fab fa-twitter-square social fa-2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AboutPage;
