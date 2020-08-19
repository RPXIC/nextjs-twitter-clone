import Link from 'next/link'
import AppLayout from '../../components/AppLayout/AppLayout'

const Timeline = ({ userName }) => {
    return (
        <>
            <AppLayout>
                <h1>This is the timeline of {userName}</h1>
                <Link href='/'><a>Go home</a></Link>
            </AppLayout>
        </>
    )
}

Timeline.getInitialProps = async() => {
    const res = await fetch('http://localhost:3000/api/hello')
    return res.json()
}

export default Timeline