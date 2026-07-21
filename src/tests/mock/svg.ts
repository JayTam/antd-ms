import React from 'react';

const SvgMock = ({ ...props }) =>
  React.createElement('svg', {
    ...props,
    dangerouslySetInnerHTML: { __html: '' },
  });

module.exports = SvgMock;
