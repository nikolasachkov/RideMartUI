import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdPhoto from "./AdPhoto";

const PhotoSlider = ({ photos, title }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
            <Slider {...settings}>
                {photos.map((photo, index) => (
                    <AdPhoto key={index} imageUrl={photo.photoUrl} title={title} />
                ))}
            </Slider>
        </Box>
    );
};

export default PhotoSlider;
