import { useEffect, useState } from "react";
import BeerList from "../components/beer/List";
import BeerForm from "../components/beer/Form";
import ErrorDisplay from "../components/beer/Error";
import { Beer } from "../components/beer/types";

const myBeers: Array<Beer> = [];

export default function RootPage() {
  const [activeTabName, setActiveTabName] = useState("all-beers");
  const [page, setPage] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [myBeersList, setMyBeersList] = useState(myBeers);
  const [allBeers, setAllBeers] = useState(myBeers);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSave = (beer: Beer) =>
    setMyBeersList(
      (myBeersList) => [...myBeersList, { ...beer, id: myBeersList.length }],
    );

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    async function fetchBeers() {
      const res = await fetch(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`,
      );
      setLoading(false);
      if (!res.ok) {
        setError("Error loading new page");
        // throw new Error("Error loading new page");
        return;
      }
      const json = await res.json();

      if (!ignore) {
        setAllBeers((allBeers) => [...allBeers, ...json]);
      }
    }
    fetchBeers();
    return () => {
      ignore = true;
    };
  }, [page]);

  const isActive = (tabName: string) => tabName === activeTabName;
  const loadMore = () => setPage(page + 1);
  const isActiveBeers = isActive("all-beers");
  const isActiveMyBeers = isActive("my-beers");
  const setActiveAllBeers = () => setActiveTabName("all-beers");
  const setActiveMyBeers = () => setActiveTabName("my-beers");

  return (
    <div className="mx-auto container p-3 py-5">
      <header className="m-3 flex flex-wrap text-md lg:text-xl">
        <div className="flex flex-col justify-center w-1/2">
          <div className="flex justify-start space-x-2 xl:space-x-4 py-2">
            <div className={`${isActiveBeers ? "font-bold" : ""}`}>
              <button onClick={setActiveAllBeers}>
                All Beers
              </button>
            </div>
            <div className={`${isActiveMyBeers ? "font-bold" : ""}`}>
              <button onClick={setActiveMyBeers}>
                My Beers
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          {isActiveMyBeers && (
            <div className="float-right">
              <button
                className="bg-blue-800 text-white rounded-md border-r border-gray-100 py-2 hover:bg-blue-700 hover:text-white px-3"
                onClick={() => setDialogOpen(true)}
              >
                Add a new beer
              </button>
            </div>
          )}
        </div>
      </header>
      <ErrorDisplay error={error} />
      {isActiveMyBeers && (
        <>
          <BeerList
            beers={myBeersList}
            addNewBeerButton={() => setDialogOpen(true)}
          />
          <BeerForm
            isOpen={isDialogOpen}
            setOpen={setDialogOpen}
            onSave={onSave}
          />
        </>
      )}

      {isActiveBeers && (
        <>
          <BeerList beers={allBeers} />
          <div className="flex justify-center text-blue-500 font-bold p-5">
            <button onClick={loadMore}>
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
