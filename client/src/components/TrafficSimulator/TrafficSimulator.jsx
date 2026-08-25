import { Activity, LoaderCircle, Zap } from 'lucide-react';
import styles from './TrafficSimulator.module.css';

export default function TrafficSimulator({ videos, onSimulate, busy }) {
  return (
    <section className={styles.panel}>
      <div className={styles.icon}><Activity size={22} /></div>
      <div className={styles.copy}><p className={styles.eyebrow}>Live testing</p><h2>Put your storefront in motion</h2><p>Send a sample shopper event into the stream and watch the numbers respond.</p></div>
      <button className={styles.button} onClick={onSimulate} disabled={busy || !videos.length}>
        {busy ? <LoaderCircle className={styles.spin} size={18} /> : <Zap size={18} />}
        {busy ? 'Sending...' : 'Simulate Traffic'}
      </button>
    </section>
  );
}
