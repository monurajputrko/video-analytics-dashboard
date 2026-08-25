import { useCallback, useEffect, useState } from 'react';
import { BarChart3, ChevronLeft, ChevronRight, CircleAlert, RefreshCw } from 'lucide-react';
import AnalyticsTable from './components/AnalyticsTable/AnalyticsTable.jsx';
import TrafficSimulator from './components/TrafficSimulator/TrafficSimulator.jsx';
import { fetchVideoAnalytics, postEvent } from './services/api.js';
import styles from './App.module.css';

const limit = 5;
const eventTypes = ['view', 'click', 'add_to_cart'];

export default function App() {
  const [videos, setVideos] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalCount: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [simulationMessage, setSimulationMessage] = useState('');

  const loadAnalytics = useCallback(async (requestedPage) => {
    setLoading(true);
    try {
      const result = await fetchVideoAnalytics(requestedPage, limit);
      setVideos(result.data);
      setPagination(result.pagination);
      setPage(result.pagination.page);
      setError('');
    } catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadAnalytics(page); }, [page, loadAnalytics]);

  async function simulateTraffic() {
    if (!videos.length) return;
    const video = videos[Math.floor(Math.random() * videos.length)];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    setBusy(true);
    setSimulationMessage('');
    try {
      await postEvent(video.id, eventType);
      await loadAnalytics(page);
      setSimulationMessage(`Recorded ${eventType.replace('_', ' ')} on ${video.title}.`);
    } catch (requestError) { setError(requestError.message); }
    finally {
      setBusy(false);
    }
  }

  return <main className={styles.page}>
    <header className={styles.header}><div className={styles.brand}><span className={styles.brandMark}><BarChart3 size={20} /></span><span>reelmetric</span></div><span className={styles.status}><i /> Tracking active</span></header>
    <section className={styles.hero}><div><p className={styles.kicker}>Commerce intelligence / 01</p><h1>Make every frame<br /><em>count.</em></h1><p className={styles.intro}>A clear read on how your shoppable videos turn attention into action.</p></div><div className={styles.heroNote}><span>{String(pagination.totalCount).padStart(2, '0')}</span><small>active videos<br />in your library</small></div></section>
    <TrafficSimulator videos={videos} onSimulate={simulateTraffic} busy={busy} />
    {simulationMessage && <p className={styles.simulationMessage}>{simulationMessage}</p>}
    <section className={styles.analytics}><div className={styles.sectionHeading}><div><p className={styles.kicker}>Performance overview</p><h2>Video analytics</h2></div><button className={styles.refresh} onClick={() => loadAnalytics(page)} disabled={loading} title="Refresh analytics"><RefreshCw className={loading ? styles.spin : ''} size={17} /></button></div>
      {error && <div className={styles.error}><CircleAlert size={17} /> {error}</div>}
      <AnalyticsTable videos={videos} loading={loading} />
      <nav className={styles.pagination} aria-label="Pagination"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={pagination.page <= 1 || loading}><ChevronLeft size={16} /> Prev</button><div>{Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((number) => <button className={number === pagination.page ? styles.active : ''} key={number} onClick={() => setPage(number)} disabled={loading}>{number}</button>)}</div><button onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))} disabled={pagination.page >= pagination.totalPages || loading}>Next <ChevronRight size={16} /></button></nav>
    </section>
    <footer>Reelmetric dashboard <span>•</span> Updated in real time</footer>
  </main>;
}
