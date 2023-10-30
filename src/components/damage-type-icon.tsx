import React, { memo } from 'react';

const DamageTypeIcon = ({
  damageTypeIcon,
  className,
}: {
  damageTypeIcon: string | undefined;
  className: string;
}) => {
  if (typeof damageTypeIcon === 'undefined') {
    return null;
  }

  return (
    <img
      className={className}
      src={`${process.env.CLIENT_API_URL}${damageTypeIcon}`}
    />
  );
};

export default memo(DamageTypeIcon);
