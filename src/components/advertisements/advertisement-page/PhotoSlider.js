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
        vertical: false,
        adaptiveHeight: false,
    };

    const uniquePhotos = photos.filter((photo, index, self) => index === self.findIndex((p) => p.photoUrl === photo.photoUrl));

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 600,
                mx: "auto",
                height: "400px",
                "& .slick-slider, & .slick-list, & .slick-track": {
                    height: "100%",
                },
                "& .slick-slide > div": {
                    height: "100%",
                },
            }}
        >
            <Slider {...settings}>
                {uniquePhotos.map((photo, index) => (
                    <AdPhoto key={`${photo.id}-${index}`} imageUrl={photo.photoUrl} title={title} />
                ))}
            </Slider>
        </Box>
    );
};

export default PhotoSlider;
