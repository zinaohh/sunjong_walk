import { Link } from 'react-router';
import { ScreenHeader } from '../../components/ScreenHeader';
import { PATHS } from '../../app/paths';
import { useHomeViewModel } from './useHomeViewModel';

export function HomeScreen() {
  const { state } = useHomeViewModel();

  return (
    <section className="screen">
      <ScreenHeader caption={`${state.weekStart} 주`} title="이번 주" />

      {state.status === 'loading' && <p className="muted">불러오는 중</p>}
      {state.status === 'error' && <p className="muted">기록을 불러오지 못했어요</p>}

      {state.status === 'ready' && !state.obedience && (
        <div className="card card--empty">
          <p>이번 주 순종을 아직 정하지 않았어요.</p>
          <Link className="button button--primary" to={PATHS.plan}>
            정하러 가기
          </Link>
        </div>
      )}

      {state.status === 'ready' && state.obedience && (
        <div className="card">
          {state.obedience.verseRef && <p className="muted">{state.obedience.verseRef}</p>}
          <p>{state.obedience.when}</p>
          <p className="strong">{state.obedience.what}</p>
        </div>
      )}
    </section>
  );
}
