import { ExternalLink, Film } from 'lucide-react';
import styles from './AnalyticsTable.module.css';

function conversionRate(views, addToCart) {
  return views > 0 ? `${((addToCart / views) * 100).toFixed(2)}%` : '0.00%';
}

export default function AnalyticsTable({ videos, loading }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr><th>Video</th><th>Views</th><th>Clicks</th><th>Add to cart</th><th>Conversion</th><th aria-label="Open video" /></tr>
        </thead>
        <tbody>
          {loading && !videos.length ? <tr><td colSpan="6" className={styles.empty}>Loading your video library...</td></tr> : null}
          {!loading && !videos.length ? <tr><td colSpan="6" className={styles.empty}>No videos found.</td></tr> : null}
          {videos.map((video) => (
            <tr key={video.id}>
              <td>
                <div className={styles.videoCell}>
                  <div className={styles.thumbnail}><video src={video.videoUrl} muted preload="metadata" aria-label={`${video.title} preview`}><Film size={18} /></video></div>
                  <div><strong>{video.title}</strong><span>{video.id}</span></div>
                </div>
              </td>
              <td className={styles.number}>{video.totalViews.toLocaleString()}</td>
              <td className={styles.number}>{video.totalClicks.toLocaleString()}</td>
              <td className={styles.number}>{video.totalAddToCart.toLocaleString()}</td>
              <td><span className={styles.rate}>{conversionRate(video.totalViews, video.totalAddToCart)}</span></td>
              <td><a className={styles.link} href={video.videoUrl} target="_blank" rel="noreferrer" aria-label={`Open ${video.title}`}><ExternalLink size={16} /></a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
