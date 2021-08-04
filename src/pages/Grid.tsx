import { FunctionComponent } from "preact"
import { Nav } from "../components/Nav"
import { Tile } from "../components/Tile"
import _ from 'lodash';
import {useEffect} from "preact/hooks"
import { useDockets, fetchDockets } from '../state/docket';

function uxToHex(ux: string) {
  return `#${ux.slice(2).replaceAll('.', '').toUpperCase()}`;
}

export const Grid: FunctionComponent = () => {
  useEffect(() => {
    fetchDockets();
  }, []);

  const dockets = useDockets();
  
  return (
    <div className="flex flex-col">
      <header className={`w-full flex justify-center items-center h-24 sticky top-0 left-0 z-30`} style={{backgroundColor:'rgba(255,255,255,0.95)', backdropFilter: 'blur(50px)'}}>
        <Nav />
      </header>

      <main className='h-full w-full flex justify-center pt-24 pb-32 relative z-0'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-8 w-full max-w-6xl">
          {_.map(dockets, (docket, ref) => (
            <Tile color={uxToHex(docket.color)} title={docket.title} href={docket.base} href={`/apps/${ref}`} />
          ))}
        </div>
      </main>
    </div>
  )
}
