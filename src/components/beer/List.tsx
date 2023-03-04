import Card from "./Card";
import { Beer } from "./types";

interface Props {
  beers: Array<Beer>;
  addNewBeerButton?: () => void;
}

function EmptyPlaceholder({ beers, addNewBeerButton }: Props) {
  if (beers.length !== 0 || !addNewBeerButton) {
    return <></>;
  }

  return (
    <div className="flex justify-center items-center h-96 w-full flex-col leading-7">
      <div>
        Nothing to see yet. <br />
      </div>
      <div>
        <button onClick={addNewBeerButton} className="text-blue-500 px-1">
          Click here
        </button>
        to add your first beer!
      </div>
    </div>
  );
}

export default function List({ beers, addNewBeerButton }: Props) {
  return (
    <div className="flex w-full flex-wrap">
      <EmptyPlaceholder beers={beers} addNewBeerButton={addNewBeerButton} />
      {beers.map((beer) => {
        return <Card beer={beer} key={beer.id}></Card>;
      })}
    </div>
  );
}
