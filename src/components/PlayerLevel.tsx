import {Box, Typography} from "@mui/material";
import type {CSSProperties} from "react";

interface Props {
  level: number,
  width?: number,
  fontSize?: number,
  style?: CSSProperties,
  center?: boolean,
  centerVertical?: boolean,
  textStyle?: CSSProperties,
}

function PlayerLevel({level, width = 64, fontSize = 11, style, center, centerVertical, textStyle}: Props) {

  fontSize *= level > 999 ? 0.9 : 1
  const levelBorder = level < 20 ? 1 : (level >= 500 ? 500 : level - level % 20)
  const height = width * 128 / 304
  const boxWrapper: CSSProperties | undefined = center || centerVertical ? {
    ...style, transform: `translate(-${center ? (width / 2) : 0}px, -${height / 2}px)`
  } : style

  return (
    <Box style={{...boxWrapper, lineHeight: 0}}>
      <img src={`src/assets/level-borders/level${levelBorder}.png`} alt={`lvl-${level}`}
           style={{width, height: 'auto', aspectRatio: 304 / 128, alignSelf: 'center', objectFit: 'contain'}}
      />

      <Typography
        variant={'body2'}
        style={{
          position: 'absolute', width: '100%', left: 0, textAlign: 'center',
          fontSize, ...textStyle, top: height / 4
        }}
      >
        {level}
      </Typography>
    </Box>
  );
}

export default PlayerLevel;