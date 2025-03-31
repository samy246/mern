
// second
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Box, useTheme, Button, Typography } from '@mui/material';
import { useState } from 'react';
import './ProductBanner.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const ProductBanner = ({ banners }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = banners.length;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className="banner-container">
            <AutoPlaySwipeableViews
                className="banner-slider"
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                interval={5000}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {banners?.map((banner, index) => (
                    <div key={index} className={`banner-slide ${activeStep === index ? 'active' : ''}`}>
                        <Box
                            component="img"
                            className="banner-image"
                            src={banner.image}
                            alt={`Banner ${index + 1}`}
                        />
                        <div className={`banner-content ${activeStep === index ? 'active' : ''}`}>
                            <Typography variant="h4" className="banner-title">
                                {banner.text}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                className="banner-button"
                                href={banner.link}
                            >
                                {banner.buttonText}
                            </Button>
                        </div>
                    </div>
                ))}
            </AutoPlaySwipeableViews>

            <div className="banner-dots">
                {banners.map((_, index) => (
                    <div
                        key={index}
                        className={`banner-dot ${activeStep === index ? 'active' : ''}`}
                        onClick={() => handleStepChange(index)}
                    />
                ))}
            </div>
        </div>
    );
};