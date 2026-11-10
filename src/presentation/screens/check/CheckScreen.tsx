import { CHECK_RESULT_LABEL, CHECK_RESULTS } from '@/domain/model/obedience';
import { toLocalDate } from '@/domain/model/week';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useCheckViewModel } from './useCheckViewModel';

export function CheckScreen() {
  const { state, dispatch } = useCheckViewModel();

  return (
    <section className="screen">
      <ScreenHeader caption={toLocalDate(new Date())} title="오늘 체크" />

      <div className="choices" role="radiogroup" aria-label="오늘의 순종">
        {CHECK_RESULTS.map((result) => (
          <button
            key={result}
            type="button"
            role="radio"
            aria-checked={state.result === result}
            className={`choice${state.result === result ? ' is-selected' : ''}`}
            onClick={() => dispatch({ type: 'selectResult', result })}
          >
            {CHECK_RESULT_LABEL[result]}
          </button>
        ))}
      </div>

      <label className="field">
        <span className="field__label">한 줄 메모</span>
        <input
          className="input"
          maxLength={100}
          value={state.memo}
          onChange={(e) => dispatch({ type: 'changeMemo', value: e.target.value })}
        />
      </label>

      <button className="button button--primary" type="button" disabled>
        기록하기
      </button>
    </section>
  );
}
