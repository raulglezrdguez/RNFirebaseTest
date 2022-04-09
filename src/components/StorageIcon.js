import React from 'react';
import Svg, {Path} from 'react-native-svg';

const StorageIcon = ({
  width = 100,
  height = 100,
  stroke = '#0ff',
  strokeWidth = '10',
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 512 512"
    {...props}>
    <Path
      stroke={stroke}
      strokeWidth={strokeWidth}
      d="M315.535 54.772v35.721c29.545 0 53.581 24.037 53.581 53.581h35.721c0-49.241-40.061-89.302-89.302-89.302zM35.721 346.493H0c0 49.241 40.061 89.302 89.302 89.302v-35.721c-29.544 0-53.581-24.036-53.581-53.581zm407.647-67.867c-3.156-65.538-57.468-117.881-123.775-117.881a122.932 122.932 0 0 0-33.825 4.75V123.04c0-23.646-14.756-45.101-41.549-60.411-23.645-13.512-54.699-20.954-87.442-20.954-32.743 0-63.798 7.442-87.444 20.953-26.793 15.31-41.549 36.765-41.549 60.411v158.759c0 23.646 14.756 45.101 41.549 60.411 11.79 6.737 25.425 11.963 40.19 15.512-.161 2.36-.269 4.733-.269 7.131 0 58.157 47.315 105.473 105.473 105.473H413.87c54.109 0 98.131-44.022 98.131-98.133-.001-43.06-28.587-80.845-68.633-93.566zM87.054 93.642c18.069-10.326 43.481-16.247 69.721-16.247 26.239 0 51.651 5.921 69.72 16.247 14.967 8.552 23.551 19.267 23.551 29.396 0 10.129-8.584 20.844-23.55 29.396-18.07 10.325-43.482 16.247-69.721 16.247-26.239 0-51.652-5.921-69.721-16.247-14.967-8.553-23.551-19.267-23.551-29.396s8.584-20.844 23.551-29.396zm-23.551 86.249a120.902 120.902 0 0 0 5.828 3.559c23.646 13.512 54.701 20.953 87.444 20.953s63.798-7.442 87.443-20.953a121.394 121.394 0 0 0 5.828-3.559v2.359c-21.029 14.329-37.5 34.955-46.572 59.224-14.176 4.267-30.276 6.588-46.699 6.588-26.239 0-51.652-5.921-69.721-16.247-14.967-8.553-23.551-19.268-23.551-29.397v-22.527zm54.492 143.087c-11.555-2.765-22.124-6.744-30.939-11.782-14.968-8.553-23.552-19.268-23.552-29.397v-22.527a120.902 120.902 0 0 0 5.828 3.559c21.458 12.261 49.019 19.501 78.401 20.741-12.772 10.558-23.032 24.05-29.738 39.406zm295.874 111.627H214.726c-38.462 0-69.752-31.29-69.752-69.752 0-38.054 30.957-69.339 69.009-69.74l16.494-.174 1.137-16.455c3.176-45.991 41.821-82.018 87.981-82.018 48.634 0 88.2 39.566 88.2 88.2 0 2.239-.086 4.509-.255 6.748l-1.253 16.628 16.503 2.39c30.494 4.415 53.49 30.969 53.49 61.765-.001 34.411-27.999 62.408-62.411 62.408z"
    />
  </Svg>
);

export default StorageIcon;
