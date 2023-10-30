import React, { memo, ReactNode, useMemo } from 'react';

import { AmmoType } from '../types.js';

const AmmoTypeIcon = ({
  ammoType,
  className,
}: {
  ammoType: AmmoType | undefined;
  className: string;
}) => {
  const ammoTypeMap = useMemo(
    () =>
      ({
        [AmmoType.None]: null,
        [AmmoType.Primary]: (
          <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1434 1024"
          >
            <path
              fill="white"
              d="M716.8 243.2c38.4 0 89.6 128 89.6 179.2H627.2c0-51.2 51.2-179.2 89.6-179.2zM627.2 473.6h179.2V768H627.2V473.6z"
            />
            <path
              fill="white"
              d="M179.2 1024 0 844.8V179.2L179.2 0h1075.2l179.2 179.2v665.6L1254.4 1024zm51.2-128h972.8l102.4-102.4V230.4L1203.2 128H230.4L128 230.4v563.2z"
            />
          </svg>
        ),
        [AmmoType.Special]: (
          <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1434 1024"
          >
            <path
              fill="#7af48b"
              d="M588.8 243.2c38.4 0 89.6 128 89.6 179.2H499.2c0-51.2 51.2-179.2 89.6-179.2zM499.2 473.6h179.2V768H499.2V473.6zM844.8 243.2c38.4 0 89.6 128 89.6 179.2H755.2c0-51.2 51.2-179.2 89.6-179.2zM755.2 473.6h179.2V768H755.2V473.6z"
            />
            <path
              fill="#7af48b"
              d="M179.2 1024 0 844.8V179.2L179.2 0h1075.2l179.2 179.2v665.6L1254.4 1024zm51.2-128h972.8l102.4-102.4V230.4L1203.2 128H230.4L128 230.4v563.2z"
            />
          </svg>
        ),
        [AmmoType.Heavy]: (
          <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1434 1024"
          >
            <path
              fill="#b286ff"
              d="M460.8 243.2c38.4 0 89.6 128 89.6 179.2H371.2c0-51.2 51.2-179.2 89.6-179.2zM716.8 243.2c38.4 0 89.6 128 89.6 179.2H627.2c0-51.2 51.2-179.2 89.6-179.2zM972.8 243.2c38.4 0 89.6 128 89.6 179.2H883.2c0-51.2 51.2-179.2 89.6-179.2zM371.2 473.6h179.2V768H371.2V473.6zM627.2 473.6h179.2V768H627.2V473.6zM883.2 473.6h179.2V768H883.2V473.6z"
            />
            <path
              fill="#b286ff"
              d="M179.2 1024 0 844.8V179.2L179.2 0h1075.2l179.2 179.2v665.6L1254.4 1024zm51.2-128h972.8l102.4-102.4V230.4L1203.2 128H230.4L128 230.4v563.2z"
            />
          </svg>
        ),
      }) satisfies Record<AmmoType, ReactNode>,
    [className]
  );

  if (typeof ammoType === 'undefined' || !(ammoType in ammoTypeMap)) {
    return null;
  }

  return ammoTypeMap[ammoType];
};

export default memo(AmmoTypeIcon);
