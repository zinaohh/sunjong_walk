import { ScreenHeader } from '../../components/ScreenHeader';
import { useReviewViewModel } from './useReviewViewModel';

const WEEKDAY = ['월', '화', '수', '목', '금', '토', '일'];

export function ReviewScreen() {
  const { state } = useReviewViewModel();
  const recorded = new Set(state.checks.map((c) => c.date));

  return (
    <section className="screen">
      <ScreenHeader caption={`${state.weekStart} 주`} title="주간 돌아보기" />

      {/* 기록한 날만 표시한다. 점수·연속 기록 숫자는 보여주지 않는다. */}
      <ol className="week">
        {state.days.map((day, i) => (
          <li key={day} className={`week__day${recorded.has(day) ? ' is-recorded' : ''}`}>
            <span className="week__dot" aria-hidden />
            <span className="week__label">{WEEKDAY[i]}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
