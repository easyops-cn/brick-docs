import React from 'react';
import styles from './styles.module.css';

export default function LoadingRing() {
  return (
    <div className={styles.ringContainer}>
      <div className={styles.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}