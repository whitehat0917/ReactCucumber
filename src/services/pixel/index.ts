import {useEffect} from "react";
import ReactPixel from "react-facebook-pixel";

export const usePixel = (pixelId, location) => {
    useEffect(() => {
        if (pixelId) {
            const options = {
                autoConfig: true, // set pixel's autoConfig
                debug: false, // enable logs
            };

            ReactPixel.init(pixelId, null, options);
        }
    }, [pixelId]);

    useEffect(() => {
        if (pixelId) {
            ReactPixel.pageView();
        }
    }, [pixelId, location]);
};
