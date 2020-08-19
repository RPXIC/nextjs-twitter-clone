import styles from '../../styles/Home.module.css'

const AppLayout = ({ children }) => {
    return (
        <>
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}
export default AppLayout