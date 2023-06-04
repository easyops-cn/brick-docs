import React from 'react';
import LoadingRing from './LoadingRing';

export default function LoadingRingBox({ height }: { height: number }): JSX.Element {
  return (
    <div style={{height, position: "relative"}}>
      <LoadingRing />
    </div>
  );
}
