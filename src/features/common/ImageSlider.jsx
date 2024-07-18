import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./ImageSlider.css";

const images = [
  {
    src: "https://th.bing.com/th/id/OIP.mEMRsnl2yCMyuM12hL2naAAAAA?rs=1&pid=ImgDetMain",
    alt: "Image 1",
  },
  {
    src: "https://th.bing.com/th/id/OIP.mEMRsnl2yCMyuM12hL2naAAAAA?rs=1&pid=ImgDetMain",
    alt: "Image 2",
  },
  {
    src: "https://th.bing.com/th/id/OIP.Bc-0YXaaoWODjNJNUmE_qwHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain",
    alt: "Image 3",
  },
  {
    src: "https://th.bing.com/th/id/OIP.mEMRsnl2yCMyuM12hL2naAAAAA?rs=1&pid=ImgDetMain",
    alt: "Image 4",
  },
  {
    src: "https://th.bing.com/th/id/OIP.mEMRsnl2yCMyuM12hL2naAAAAA?rs=1&pid=ImgDetMain",
    alt: "Image 5",
  },
  {
    src: "https://th.bing.com/th/id/OIP.Bc-0YXaaoWODjNJNUmE_qwHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain",
    alt: "Image 6",
  },
];

function CustomArrow(props) {
  const { className, style, onClick, direction } = props;
  return (
    <div
    className={`${className} custom-arrow`}

      onClick={onClick}
    >
      {direction === "next" ? <ArrowForwardIos /> : <ArrowBackIos />}
    </div>
  );
}

function CustomPaging() {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i].src} alt={`Thumbnail ${i + 1}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
