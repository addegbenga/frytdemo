import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.block}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>
    </div>
  );
};

export default Loader;
