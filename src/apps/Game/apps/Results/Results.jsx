import Button from 'shared/apps/Button'
import * as styles from './Results.module.css'

const Results = ({ results, startNew }) => (
  <div className={styles.root}>
    <h1>
      Results
    </h1>
    <Button onClick={startNew}>Start new game</Button>
    <ul className={styles.list}>
      {/*<li>*/}
      {/*  <span>*/}
      {/*    <span className={styles.place}>#</span>*/}
      {/*    <span className={styles.username}>Username</span>*/}
      {/*  </span>*/}
      {/*  <span className={styles.scores}>Scores</span>*/}
      {/*</li>*/}
      {results.map(({ username, scores }, index) => (
        <li key={index}>
          <span>
            <span className={styles.place}>#{index + 1}</span>
            <span className={styles.username}>{username ? username : '[NO_NAME]'}</span>
          </span>
          <span className={styles.scores}>{scores}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default Results
