import styles from "./Result.module.css";
import Status from "./Status";

const ResultList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="padding-rule">
        <div className={styles["result-card"]}>
          <h2 className="expenses-list__fallback">Found no posts</h2>
        </div>
      </div>
    );
  }

  return (
    <ul className={`${styles["no-bullets"]} ${styles.appear}`}>
      {props.items.map((res) => {
        return (
          <li className={`padding-rule ${styles["result-card"]}`} key={res.id}>
            <section>
              <span className={styles.sentense}>{res.content}</span>
              <br />
              <small className={styles.timestamp}>{res.date}</small>
              <Status labels={res.labels} />
            </section>
          </li>
        );
      })}
    </ul>
  );
};

export default ResultList;
