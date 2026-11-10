import { ScreenHeader } from '../../components/ScreenHeader';
import { usePlanViewModel } from './usePlanViewModel';

export function PlanScreen() {
  const { state, dispatch } = usePlanViewModel();

  return (
    <section className="screen">
      <ScreenHeader title="이번 주 순종 정하기" />

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label className="field">
          <span className="field__label">
            말씀 위치 <span className="muted">(선택)</span>
          </span>
          <input
            className="input"
            placeholder="예: 마 5:44"
            value={state.verseRef}
            onChange={(e) => dispatch({ type: 'changeVerseRef', value: e.target.value })}
          />
        </label>

        <label className="field">
          <span className="field__label">언제</span>
          <input
            className="input"
            placeholder="상황"
            value={state.when}
            onChange={(e) => dispatch({ type: 'changeWhen', value: e.target.value })}
          />
        </label>

        <label className="field">
          <span className="field__label">무엇을</span>
          <input
            className="input"
            placeholder="행동 하나"
            value={state.what}
            onChange={(e) => dispatch({ type: 'changeWhat', value: e.target.value })}
          />
        </label>

        <button className="button button--primary" type="submit" disabled>
          정하기
        </button>
      </form>
    </section>
  );
}
