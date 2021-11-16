import { RobeInfo, fetchRobes } from './api/robes'
import { format as ts } from 'timeago.js'

const blootGreen = '#01FF01'

export async function getStaticProps() {
  const data = await fetchRobes()
  return {
    props: {
      robes: data.robes,
      lastUpdate: data.lastUpdate,
    },
    revalidate: 300,
  }
}

interface Props {
  robes: RobeInfo[]
  lastUpdate: string
}

const Robe = ({ robe }: { robe: RobeInfo }) => {
  return (
    <a href={robe.url} target="_blank">
      <div
        className="m-auto pb-4 mb-8 flex flex-col justify-center items-center gap-2 p-4 md:m-4 border border-white transform hover:scale-105 transition-all w-full md:w-96"
        style={{
          backgroundColor: blootGreen
        }}
      >
        <img
          src={robe.svg}
          alt=""
          width="350"
          height="350"
        />
        <div className="text-center" style={{color: 'black'}}>
          <p className="text-lg">#{robe.id}</p>
          <p>{robe.price} ETH</p>
        </div>
      </div>
    </a>
  )
}

const IndexPage = ({ robes, lastUpdate }: Props) => {
  return (
    <div className="py-3 md:pb-0 font-mono flex flex-col justify-center items-center gap-4 pt-10 md:w-screen">
      <h1 className="text-lg md:text-3xl">Cock Rings</h1>
      <div className="text-center max-w-screen-md md:leading-loose">
        <p className="md:text-xl">
          There are {robes.length} bags for sale with Cock Rings. The floor
          price is {robes.length > 0 ? robes[0].price : "N/A"} ETH.
        </p>
        <p className="md:text-lg pt-2">
          Original <a target="_blank" href="https://robes.market" className="underline">robes.market</a> for Loot by{' '}
          <a
            target="_blank"
            href="https://twitter.com/worm_emoji"
            className="underline"
          >
            worm_emoji
          </a>
          . cockrings.market for Bloot by{' '}
          <a
            target="_blank"
            href="https://twitter.com/ShrimpPepe"
            className="underline"
          >
            shrimp pepe
          </a>
          .
        </p>
        <p className="text-sm mv-4">Last updated {ts(lastUpdate)}</p>
      </div>
      <div className="grid md:grid-cols-2 pt-5">
        {robes.map((robe) => {
          return <Robe robe={robe} key={robe.id} />
        })}
      </div>
    </div>
  )
}

export default IndexPage
