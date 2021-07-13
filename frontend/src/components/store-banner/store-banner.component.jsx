import React from "react";
import { Link } from "react-router-dom";

import "./store-banner.styles.scss";

const StoreBanner = () => (
  <>
    <div className="container-fluid px-1 py-5 mx-auto row justify-content-center  store-banner">
      <div className="col-xl-9 col-lg-10 ">
        <div className="card1 pl-4 pl-md-5 pr-3">
          <div className="row">
            <div className="left-side col-md-6">
              <p className="pt-5 mb-0">Has just arrived!</p>
              <h3 className="mb-0">
                <strong>Dog Collection {new Date().getFullYear()}</strong>
              </h3>{" "}
              <small className>
                Clothing, Collars, Grooming, Training &amp; much more.
              </small>
              <br />{" "}
              <Link to="/store">
                <button className="btn btn-pink mb-5">
                  Shop Now &nbsp;&nbsp;
                  <div className="fa fa-angle-right" />
                </button>
              </Link>
            </div>
            <div className="right-side col-md-6 row justify-content-center">
              <div className="d-flex">
                {" "}
                <img
                  className="girl-img fit-image"
                  src="https://cdn.pixabay.com/photo/2015/11/04/17/14/partner-1022965_960_720.jpg"
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="card2 pl-4 pl-md-5 pr-3">
          <div className="row px-3">
            <div className="col-md-12">
              <div className="blocks row d-flex">
                <div className="d-flex flex-column">
                  {" "}
                  <Link to="/shop/clothing">
                    <img
                      className="fit-image img-block"
                      src="https://ae01.alicdn.com/kf/Hacbcbaa2c39642d0bb9d1838227a2208p/Pet-Products-Dog-Clothing-Coat-Jacket-Hoodie-Sweater-Clothes-For-Dogs-Cotton-Clothing-For-Dogs-Sports.jpg_220x220xz.jpg_.webp"
                    />
                  </Link>
                  <small className="text-center">Clothing</small>{" "}
                </div>
                <div className="d-flex flex-column">
                  <Link to="/shop/collars">
                    <img
                      className="fit-image img-block"
                      src="https://ae01.alicdn.com/kf/HTB1S5s6AN1YBuNjy1zcq6zNcXXaY/Dog-Harness-with-Leash-Summer-Pet-Adjustable-Reflective-Vest-Walking-Lead-for-Puppy-Polyester-Mesh-Harness.jpg_220x220xz.jpg_.webp"
                    />{" "}
                  </Link>
                  <small className="text-center">Collars</small>{" "}
                </div>
                <div className="d-flex flex-column">
                  {" "}
                  <Link to="/grooming">
                    <img
                      className="fit-image img-block"
                      src="https://ae01.alicdn.com/kf/Hd96e305483de454e9aeac6a8b914fb53G/Outdoor-portable-pet-dog-paw-cleaner-cup-360-soft-silicone-foot-washer-clean-dog-paws-one.jpg_220x220xz.jpg_.webp"
                    />{" "}
                  </Link>
                  <small className="text-center">Grooming</small>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default StoreBanner;
