import React from 'react'
import FlexBetween from '../users/styledComponents/FlexBetween';
import WidgetWrapper from '../users/styledComponents/WidgetWrapper';
import InfoIcon from "@mui/icons-material/Info";
import { Typography, useTheme, IconButton } from "@mui/material";


const ad = {
    url: "https://i.pinimg.com/736x/d6/3d/5f/d63d5f27d6e46a6918a26f36a5f31c0f.jpg",
    name: "Nike",
    text: "From the field to the streets, we've got you covered.",
  };

function AdWidget() {
    const { palette } = useTheme();
  const { dark, main, medium } = palette;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <FlexBetween>
          <Typography color={medium}>Create Ad</Typography>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      <img
        width="100%"
        alt="advert"
        src={ad.url}
        style={{
          borderRadius: "0.75rem",
          margin: "0.75rem 0",
          height: "150px",
        }}
      />
      <FlexBetween>
        <Typography color={main}>{ad.name}</Typography>
        <Typography color={medium}>{ad.name}.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {ad.text}
      </Typography>
    </WidgetWrapper>
  )
}

export default AdWidget